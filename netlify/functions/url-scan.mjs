import { load } from "cheerio";
import net from "node:net";

const FETCH_TIMEOUT_MS = 5000;
const MAX_BODY_BYTES = 1024 * 1024;
const CACHE_TTL_MS = 30 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const USER_AGENT =
  "EcomMeasureBot/1.0 (+https://ecommeasure.nl/ai-inspector; contact@ecommeasure.nl)";

const HTML_MIME_PATTERN = /text\/html|application\/xhtml\+xml/i;

const cache = new Map();
const rateLimit = new Map();

const featureFlags = {
  renderedScan: false,
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, {
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Only POST requests are supported.",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, {
      success: false,
      error: "INVALID_JSON",
      message: "Request body must be valid JSON.",
    });
  }

  const { url: rawUrl, locale } = payload || {};

  if (!rawUrl || typeof rawUrl !== "string") {
    return jsonResponse(400, {
      success: false,
      error: "INVALID_URL",
      message: "Please provide a URL to scan.",
    });
  }

  let normalizedUrl;
  let parsedUrl;
  try {
    parsedUrl = normalizeUrl(rawUrl);
    normalizedUrl = `${parsedUrl.origin}${parsedUrl.pathname || "/"}`;
  } catch (error) {
    return jsonResponse(400, {
      success: false,
      error: error.code === "UNSUPPORTED_SCHEME" ? error.code : "INVALID_URL",
      message:
        error.code === "UNSUPPORTED_SCHEME"
          ? "Only HTTP and HTTPS URLs are supported."
          : "The provided URL could not be parsed.",
    });
  }

  if (isPrivateHostname(parsedUrl.hostname)) {
    return jsonResponse(400, {
      success: false,
      error: "PRIVATE_ADDRESS",
      message: "Private or loopback addresses cannot be scanned.",
    });
  }

  const cacheEntry = cache.get(normalizedUrl);
  const now = Date.now();
  if (cacheEntry && now - cacheEntry.timestamp < CACHE_TTL_MS) {
    return jsonResponse(200, {
      success: true,
      fromCache: true,
      data: {
        ...cacheEntry.data,
        requestedUrl: rawUrl,
        normalizedUrl,
        locale: normalizeLocale(locale),
        featureFlags,
      },
    });
  }

  const clientIp = getClientIp(event.headers || {});
  if (!allowRateLimit(clientIp, now)) {
    return jsonResponse(429, {
      success: false,
      error: "RATE_LIMITED",
      message: "Rate limit exceeded for this IP address.",
    });
  }

  const robotsInfo = await fetchRobots(parsedUrl).catch(() => null);
  if (robotsInfo && !robotsInfo.allowed) {
    return jsonResponse(403, {
      success: false,
      error: "ROBOTS_DISALLOW",
      message: "Robots.txt disallows crawling this path for user-agent *.",
      robots: robotsInfo,
    });
  }

  let fetchResult;
  try {
    fetchResult = await fetchHtml(parsedUrl);
  } catch (error) {
    if (error.name === "AbortError" || error.code === "FETCH_TIMEOUT") {
      return jsonResponse(504, {
        success: false,
        error: "TIMEOUT",
        message: "Timed out while fetching the requested URL.",
      });
    }

    if (error.code === "BODY_TOO_LARGE") {
      return jsonResponse(413, {
        success: false,
        error: "BODY_TOO_LARGE",
        message: "The HTML response exceeded the 1MB limit.",
      });
    }

    if (error.code === "UNSUPPORTED_CONTENT_TYPE") {
      return jsonResponse(415, {
        success: false,
        error: "UNSUPPORTED_CONTENT_TYPE",
        message: "The target did not return HTML content.",
      });
    }

    return jsonResponse(502, {
      success: false,
      error: "FETCH_FAILED",
      message: "Unable to fetch the requested URL.",
    });
  }

  let analysis;
  try {
    analysis = analyzeHtml(fetchResult.html, fetchResult.finalUrl, robotsInfo);
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      error: "ANALYSIS_ERROR",
      message: "Failed to analyse the HTML response.",
    });
  }

  const payload = {
    requestedUrl: rawUrl,
    normalizedUrl,
    locale: normalizeLocale(locale),
    scannedAt: new Date().toISOString(),
    finalUrl: fetchResult.finalUrl,
    metrics: analysis.metrics,
    insights: analysis.insights,
    totals: analysis.totals,
    warnings: [...analysis.warnings, ...(fetchResult.warnings || [])],
    robots: robotsInfo,
    featureFlags,
  };

  cache.set(normalizedUrl, {
    timestamp: now,
    data: payload,
  });

  return jsonResponse(200, {
    success: true,
    fromCache: false,
    data: payload,
  });
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
    body: JSON.stringify(body),
  };
}

function normalizeUrl(input) {
  const trimmed = input.trim();
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  const parsed = new URL(candidate);
  if (!/^https?:$/i.test(parsed.protocol)) {
    const error = new Error("Only HTTP(S) URLs are allowed.");
    error.code = "UNSUPPORTED_SCHEME";
    throw error;
  }

  parsed.hash = "";
  if (!parsed.pathname) {
    parsed.pathname = "/";
  }

  return parsed;
}

function normalizeLocale(input) {
  return input === "en" ? "en" : "nl";
}

function getClientIp(headers) {
  const headerEntries = [
    headers["x-nf-client-connection-ip"],
    headers["x-forwarded-for"],
    headers["client-ip"],
    headers["remote-addr"],
  ];

  for (const entry of headerEntries) {
    if (!entry) continue;
    const value = Array.isArray(entry) ? entry[0] : entry;
    const first = value.split(",")[0].trim();
    if (first) return first;
  }

  return "anonymous";
}

function allowRateLimit(ip, now) {
  if (!ip || ip === "anonymous") {
    return true;
  }

  const entries = rateLimit.get(ip) || [];
  const filtered = entries.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (filtered.length >= RATE_LIMIT_MAX) {
    rateLimit.set(ip, filtered);
    return false;
  }

  filtered.push(now);
  rateLimit.set(ip, filtered);
  return true;
}

function isPrivateHostname(hostname) {
  const value = hostname.toLowerCase();
  if (
    value === "localhost" ||
    value === "127.0.0.1" ||
    value === "::1" ||
    value.endsWith(".local") ||
    value.startsWith("localhost")
  ) {
    return true;
  }

  if (value === "0.0.0.0") {
    return true;
  }

  const ipType = net.isIP(value);
  if (ipType) {
    if (value.startsWith("10.")) return true;
    if (value.startsWith("192.168.")) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(value)) return true;
    if (value.startsWith("127.")) return true;
    if (value.startsWith("169.254.")) return true;
    if (value === "::1" || value.startsWith("fc") || value.startsWith("fd")) return true;
  }

  return false;
}

async function fetchRobots(url) {
  const robotsUrl = `${url.origin}/robots.txt`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(robotsUrl, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/plain",
      },
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      return { allowed: true, source: robotsUrl, status: response.status };
    }

    let text = "";
    for await (const chunk of response.body) {
      text += chunk.toString("utf8");
      if (text.length > 200000) {
        break;
      }
    }

    const parsed = parseRobots(text, url.pathname || "/");
    return { ...parsed, source: robotsUrl };
  } finally {
    clearTimeout(timeout);
  }
}

function parseRobots(text, path) {
  const lines = text.split(/\r?\n/);
  const disallowRules = [];
  const allowRules = [];
  const sitemaps = [];

  let appliesToAll = false;

  for (const rawLine of lines) {
    const line = rawLine.split("#")[0].trim();
    if (!line) continue;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const directive = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();

    if (directive === "user-agent") {
      appliesToAll = value === "*";
      continue;
    }

    if (!appliesToAll) {
      if (directive === "sitemap" && value) {
        sitemaps.push(value);
      }
      continue;
    }

    if (directive === "disallow") {
      if (value) disallowRules.push(value);
    } else if (directive === "allow") {
      if (value) allowRules.push(value);
    } else if (directive === "sitemap" && value) {
      sitemaps.push(value);
    }
  }

  const allowed = isPathAllowed(path, allowRules, disallowRules);
  return { allowed, allowRules, disallowRules, sitemaps };
}

function isPathAllowed(path, allowRules, disallowRules) {
  if (!disallowRules.length) return true;

  const normalizedPath = path || "/";
  let longestDisallow = 0;
  let longestAllow = 0;

  for (const rule of disallowRules) {
    if (rule === "/") {
      longestDisallow = Math.max(longestDisallow, 1);
      continue;
    }

    if (normalizedPath.startsWith(rule)) {
      longestDisallow = Math.max(longestDisallow, rule.length);
    }
  }

  for (const rule of allowRules) {
    if (normalizedPath.startsWith(rule)) {
      longestAllow = Math.max(longestAllow, rule.length);
    }
  }

  return longestAllow >= longestDisallow;
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    let currentUrl = url;
    let redirects = 0;

    while (redirects <= 1) {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          "User-Agent": USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        },
        signal: controller.signal,
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (location && redirects === 0) {
          currentUrl = new URL(location, currentUrl).toString();
          redirects += 1;
          continue;
        }
      }

      if (!response.ok) {
        const error = new Error("Failed to fetch target URL");
        error.code = "FETCH_FAILED";
        throw error;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!HTML_MIME_PATTERN.test(contentType)) {
        const error = new Error("Unsupported content type");
        error.code = "UNSUPPORTED_CONTENT_TYPE";
        throw error;
      }

      const chunks = [];
      let totalBytes = 0;
      if (!response.body) {
        const text = await response.text();
        if (text.length > MAX_BODY_BYTES) {
          const error = new Error("Body exceeded limit");
          error.code = "BODY_TOO_LARGE";
          throw error;
        }
        return { html: text, finalUrl: currentUrl, warnings: [] };
      }

      for await (const chunk of response.body) {
        totalBytes += chunk.length;
        if (totalBytes > MAX_BODY_BYTES) {
          const error = new Error("Body exceeded limit");
          error.code = "BODY_TOO_LARGE";
          throw error;
        }
        chunks.push(Buffer.from(chunk));
      }

      const html = Buffer.concat(chunks).toString("utf8");
      return { html, finalUrl: currentUrl, warnings: [] };
    }

    const error = new Error("Too many redirects");
    error.code = "FETCH_FAILED";
    throw error;
  } catch (error) {
    if (error.name === "AbortError") {
      error.code = "FETCH_TIMEOUT";
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function escapeCssIdentifier(value) {
  return value.replace(/[\u0000-\u001F\u007F]|^-?\d|[^\w-]/g, (char) => {
    const hex = char.codePointAt(0).toString(16).toUpperCase().padStart(2, "0");
    return `\\${hex} `;
  });
}

function analyzeHtml(html, finalUrl, robotsInfo) {
  const $ = load(html);

  const metrics = {
    seo: collectSeoMetrics($, robotsInfo),
    accessibility: collectAccessibilityMetrics($),
    performance: collectPerformanceMetrics($),
    analyticsConsent: collectAnalyticsMetrics($, html),
    croUx: collectCroMetrics($),
  };

  const insights = deriveInsights(metrics);

  const totals = {
    images: metrics.accessibility.imageCount,
    imagesMissingAlt: metrics.accessibility.imagesMissingAlt,
    unlabeledInputs: metrics.accessibility.unlabeledControls,
    scriptCount: metrics.performance.scriptCount,
    inlineScriptLength: metrics.performance.inlineScriptLength,
    ctaAboveFold: metrics.croUx.ctaAboveFold,
  };

  const warnings = [];
  if (metrics.performance.inlineScriptLength > 50000) {
    warnings.push("INLINE_SCRIPT_HEAVY");
  }

  return { metrics, insights, totals, warnings };
}

function collectSeoMetrics($, robotsInfo) {
  const titleText = ($("title").first().text() || "").trim();
  const metaDescription = $("meta[name='description']").attr("content") || "";
  const canonicalHref = $("link[rel='canonical']").attr("href") || null;
  const robotsMeta = ($("meta[name='robots']").attr("content") || "").toLowerCase();

  const hreflangs = $("link[rel='alternate'][hreflang]");
  const ogTitle = $("meta[property='og:title']").attr("content") || "";
  const ogDescription = $("meta[property='og:description']").attr("content") || "";
  const ogImage = $("meta[property='og:image']").attr("content") || "";

  const sitemapHints = new Set();
  if (robotsInfo && Array.isArray(robotsInfo.sitemaps)) {
    robotsInfo.sitemaps.forEach((item) => sitemapHints.add(item));
  }

  $("link[rel='sitemap']").each((_, element) => {
    const href = $(element).attr("href");
    if (href) sitemapHints.add(href);
  });

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href") || "";
    if (/sitemap\.xml/i.test(href)) {
      sitemapHints.add(href);
    }
  });

  const h1Count = $("h1").length;

  return {
    titleText,
    titleLength: titleText.length,
    hasMetaDescription: Boolean(metaDescription.trim()),
    metaDescriptionLength: metaDescription.trim().length,
    h1Count,
    canonicalHref,
    robotsMeta,
    robotsHasNoindex: /noindex/.test(robotsMeta),
    robotsHasNofollow: /nofollow/.test(robotsMeta),
    hreflangCount: hreflangs.length,
    ogTitle,
    ogDescription,
    ogImage,
    sitemapHints: Array.from(sitemapHints),
  };
}

function collectAccessibilityMetrics($) {
  const images = $("img");
  let imagesWithAlt = 0;
  let imagesMissingAlt = 0;

  images.each((_, element) => {
    const alt = ($(element).attr("alt") || "").trim();
    if (alt.length > 0) {
      imagesWithAlt += 1;
    } else {
      imagesMissingAlt += 1;
    }
  });

  const mainLandmark = $("main").length > 0 || $("[role='main']").length > 0;

  const controls = $("form input, form textarea, form select");
  let labeledControls = 0;
  let unlabeledControls = 0;

  controls.each((_, element) => {
    const id = $(element).attr("id");
    const hasLabel =
      (id && $(`label[for='${escapeCssIdentifier(id)}']`).length > 0) ||
      $(element).parents("label").length > 0 ||
      Boolean($(element).attr("aria-label")) ||
      Boolean($(element).attr("aria-labelledby"));

    if (hasLabel) {
      labeledControls += 1;
    } else {
      unlabeledControls += 1;
    }
  });

  let shortLinks = 0;
  $("a").each((_, element) => {
    const text = $(element).text().replace(/\s+/g, " ").trim();
    const ariaLabel = $(element).attr("aria-label") || "";
    if (text.length > 0 && text.length <= 2 && ariaLabel.trim().length === 0) {
      shortLinks += 1;
    }
  });

  const imageCount = images.length;
  const altRatio = imageCount === 0 ? 1 : imagesWithAlt / imageCount;

  return {
    imageCount,
    imagesWithAlt,
    imagesMissingAlt,
    altRatio,
    hasMainLandmark: mainLandmark,
    formControlCount: controls.length,
    labeledControls,
    unlabeledControls,
    shortLinkCount: shortLinks,
  };
}

function collectPerformanceMetrics($) {
  const scripts = $("script");
  let inlineScriptLength = 0;

  scripts.each((_, element) => {
    const src = $(element).attr("src");
    if (!src) {
      inlineScriptLength += ($(element).html() || "").length;
    }
  });

  const stylesheetLinks = $("link[rel='stylesheet']");
  const inlineStyleTags = $("style").length;
  const inlineStyleAttributes = $("[style]").length;

  const images = $("img");
  let largestSrcLength = 0;
  images.each((_, element) => {
    const src = ($(element).attr("src") || "").trim();
    if (src.length > largestSrcLength) {
      largestSrcLength = src.length;
    }
  });

  const preloadHints = $("link[rel='preload']").length;
  const preconnectHints = $("link[rel='preconnect']").length;

  return {
    scriptCount: scripts.length,
    inlineScriptLength,
    stylesheetCount: stylesheetLinks.length,
    inlineStyleTagCount: inlineStyleTags,
    inlineStyleAttributeCount: inlineStyleAttributes,
    imageCount: images.length,
    largestImageSrcLength: largestSrcLength,
    preloadCount: preloadHints,
    preconnectCount: preconnectHints,
  };
}

function collectAnalyticsMetrics($, html) {
  const htmlLower = html.toLowerCase();
  const gaPattern = /gtag\(|googletagmanager\.com\/gtag\/js|google-analytics\.com\//i;
  const dataLayerPattern = /datalayer\s*=\s*\[/i;
  const cmpPattern = /(consent|cookie|cmp)/i;

  const hasGA = gaPattern.test(htmlLower);
  const hasDataLayer = dataLayerPattern.test(htmlLower);

  const cmpMarkers = new Set();
  $("[id],[class]").each((_, element) => {
    const id = ($(element).attr("id") || "").toLowerCase();
    const className = ($(element).attr("class") || "").toLowerCase();
    if (cmpPattern.test(id) || cmpPattern.test(className)) {
      cmpMarkers.add(id || className);
    }
  });

  const cookieLinks = [];
  $("a[href]").each((_, element) => {
    const href = ($(element).attr("href") || "").toLowerCase();
    const text = $(element).text().trim().toLowerCase();
    if (href.includes("cookie") || text.includes("cookie")) {
      cookieLinks.push(href || text);
    }
  });

  return {
    hasGA,
    hasDataLayer,
    cmpMarkerCount: cmpMarkers.size,
    cookieLinkCount: cookieLinks.length,
  };
}

function collectCroMetrics($) {
  const buttonsAndLinks = $("a, button");
  const ctaKeywords = [
    "buy",
    "shop",
    "add to cart",
    "add to basket",
    "start",
    "book",
    "contact",
    "plan",
    "aanmelden",
    "bestel",
    "koop",
    "bekijk",
    "download",
    "probeer",
    "subscribe",
  ];

  let ctaAboveFold = 0;
  buttonsAndLinks.each((index, element) => {
    if (index > 40) return false;
    const text = $(element).text().replace(/\s+/g, " ").trim().toLowerCase();
    const className = ($(element).attr("class") || "").toLowerCase();
    const role = ($(element).attr("role") || "").toLowerCase();

    const matchesKeyword = ctaKeywords.some((keyword) => text.includes(keyword));
    const looksLikeCta =
      matchesKeyword ||
      className.includes("cta") ||
      className.includes("button") ||
      role === "button";

    if (looksLikeCta && text.length > 0) {
      ctaAboveFold += 1;
    }
  });

  const headingTexts = [];
  $("h1, h2").each((index, element) => {
    if (index > 6) return false;
    headingTexts.push($(element).text().replace(/\s+/g, " ").trim().toLowerCase());
  });

  const uniqueHeadings = new Set(headingTexts.filter(Boolean));
  const repeatedHeading = uniqueHeadings.size < headingTexts.length;

  let modalMarkupCount = 0;
  $("[class], [role]").each((_, element) => {
    const className = ($(element).attr("class") || "").toLowerCase();
    const role = ($(element).attr("role") || "").toLowerCase();
    if (
      className.includes("modal") ||
      className.includes("backdrop") ||
      className.includes("overlay") ||
      role === "dialog" ||
      role === "alertdialog"
    ) {
      modalMarkupCount += 1;
    }
  });

  return {
    ctaAboveFold,
    headingSampleSize: headingTexts.length,
    repeatedHeading,
    modalMarkupCount,
  };
}

function deriveInsights(metrics) {
  const insights = [];

  if (!metrics.seo.hasMetaDescription) {
    insights.push({
      id: "missing_meta_description",
      category: "seo",
      severity: "high",
      impact: "medium",
      evidence: "Meta description is missing.",
      recommendation: "Add a unique meta description between 110–150 characters.",
    });
  }

  if (metrics.seo.titleLength > 65) {
    insights.push({
      id: "long_title",
      category: "seo",
      severity: "medium",
      impact: "medium",
      evidence: `Title length is ${metrics.seo.titleLength} characters.`,
      recommendation: "Shorten the page title to improve SERP visibility.",
      details: { value: metrics.seo.titleLength },
    });
  }

  if (metrics.seo.h1Count === 0) {
    insights.push({
      id: "missing_h1",
      category: "seo",
      severity: "high",
      impact: "high",
      evidence: "No H1 heading found.",
      recommendation: "Add a single descriptive H1 to clarify the page topic.",
    });
  } else if (metrics.seo.h1Count > 1) {
    insights.push({
      id: "multiple_h1",
      category: "seo",
      severity: "medium",
      impact: "medium",
      evidence: `${metrics.seo.h1Count} H1 headings detected.`,
      recommendation: "Limit the page to one semantic H1 and adjust others to H2/H3.",
      details: { value: metrics.seo.h1Count },
    });
  }

  if (!metrics.seo.canonicalHref) {
    insights.push({
      id: "missing_canonical",
      category: "seo",
      severity: "medium",
      impact: "medium",
      evidence: "Canonical link tag not found.",
      recommendation: "Define a canonical URL to avoid duplicate content issues.",
    });
  }

  if (metrics.seo.robotsHasNoindex || metrics.seo.robotsHasNofollow) {
    insights.push({
      id: "robots_meta_warning",
      category: "seo",
      severity: "high",
      impact: "high",
      evidence: `Robots meta contains: ${metrics.seo.robotsMeta}`,
      recommendation: "Remove noindex/nofollow unless the page should stay hidden.",
      details: { value: metrics.seo.robotsMeta },
    });
  }

  if (!metrics.seo.ogTitle || !metrics.seo.ogDescription || !metrics.seo.ogImage) {
    insights.push({
      id: "incomplete_open_graph",
      category: "seo",
      severity: "low",
      impact: "medium",
      evidence: "Open Graph metadata is incomplete.",
      recommendation: "Provide OG title, description and image for richer sharing.",
    });
  }

  if (!metrics.seo.sitemapHints.length) {
    insights.push({
      id: "missing_sitemap",
      category: "seo",
      severity: "low",
      impact: "medium",
      evidence: "No sitemap reference detected in HTML or robots.txt.",
      recommendation: "Link a sitemap.xml to help search engines discover pages.",
    });
  }

  if (metrics.accessibility.imageCount > 0 && metrics.accessibility.altRatio < 0.7) {
    insights.push({
      id: "low_alt_ratio",
      category: "accessibility",
      severity: "high",
      impact: "high",
      evidence: `${metrics.accessibility.imagesMissingAlt} images without alt text.`,
      recommendation: "Provide descriptive alt text for key visuals and product imagery.",
      details: { value: metrics.accessibility.imagesMissingAlt },
    });
  }

  if (!metrics.accessibility.hasMainLandmark) {
    insights.push({
      id: "missing_main_landmark",
      category: "accessibility",
      severity: "medium",
      impact: "medium",
      evidence: "No <main> landmark detected.",
      recommendation: "Wrap primary content in a <main> region for screen readers.",
    });
  }

  if (metrics.accessibility.unlabeledControls > 0) {
    insights.push({
      id: "unlabeled_form_controls",
      category: "accessibility",
      severity: "high",
      impact: "high",
      evidence: `${metrics.accessibility.unlabeledControls} form fields missing labels.`,
      recommendation: "Associate inputs with labels or aria attributes to aid navigation.",
      details: { value: metrics.accessibility.unlabeledControls },
    });
  }

  if (metrics.accessibility.shortLinkCount > 4) {
    insights.push({
      id: "short_link_text",
      category: "accessibility",
      severity: "low",
      impact: "low",
      evidence: `${metrics.accessibility.shortLinkCount} links with very short text.`,
      recommendation: "Expand link copy or add aria-labels for clarity.",
      details: { value: metrics.accessibility.shortLinkCount },
    });
  }

  if (metrics.performance.scriptCount > 20) {
    insights.push({
      id: "many_script_tags",
      category: "performance",
      severity: "medium",
      impact: "medium",
      evidence: `${metrics.performance.scriptCount} script tags in source.`,
      recommendation: "Audit third-party scripts and defer non-critical resources.",
      details: { value: metrics.performance.scriptCount },
    });
  }

  if (metrics.performance.inlineScriptLength > 40000) {
    insights.push({
      id: "heavy_inline_scripts",
      category: "performance",
      severity: "medium",
      impact: "medium",
      evidence: `Inline script footprint around ${metrics.performance.inlineScriptLength} characters.`,
      recommendation: "Move logic into external bundles and trim inlined tracking snippets.",
      details: { value: metrics.performance.inlineScriptLength },
    });
  }

  if (metrics.performance.stylesheetCount > 10 || metrics.performance.inlineStyleAttributeCount > 50) {
    insights.push({
      id: "style_organisation",
      category: "performance",
      severity: "low",
      impact: "medium",
      evidence: "High number of stylesheets or inline styles detected.",
      recommendation: "Combine stylesheets and reduce inline style attributes to cut render work.",
    });
  }

  if (metrics.performance.preloadCount === 0 && metrics.performance.preconnectCount === 0) {
    insights.push({
      id: "no_preload_hints",
      category: "performance",
      severity: "low",
      impact: "low",
      evidence: "No preload or preconnect hints found.",
      recommendation: "Add resource hints for hero images, fonts or critical third-parties.",
    });
  }

  if (!metrics.analyticsConsent.hasGA && !metrics.analyticsConsent.hasDataLayer) {
    insights.push({
      id: "missing_analytics",
      category: "analytics",
      severity: "medium",
      impact: "high",
      evidence: "No GA4 or dataLayer markers detected.",
      recommendation: "Verify GA4/gtag implementation or server-side tracking setup.",
    });
  }

  if (metrics.analyticsConsent.cmpMarkerCount === 0) {
    insights.push({
      id: "missing_cmp",
      category: "analytics",
      severity: "medium",
      impact: "medium",
      evidence: "No consent banner markup spotted.",
      recommendation: "Ensure a GDPR-compliant consent banner renders on first paint.",
    });
  }

  if (metrics.analyticsConsent.cookieLinkCount === 0) {
    insights.push({
      id: "missing_cookie_link",
      category: "analytics",
      severity: "low",
      impact: "medium",
      evidence: "No cookie or privacy link found.",
      recommendation: "Link to a cookie or privacy page from the footer or consent UI.",
    });
  }

  if (metrics.croUx.ctaAboveFold < 2) {
    insights.push({
      id: "low_cta_density",
      category: "cro",
      severity: "medium",
      impact: "high",
      evidence: "Few clear CTAs detected near the top of the markup.",
      recommendation: "Elevate a primary CTA within the hero to guide visitors immediately.",
    });
  }

  if (metrics.croUx.repeatedHeading) {
    insights.push({
      id: "repeated_headings",
      category: "cro",
      severity: "low",
      impact: "low",
      evidence: "Hero headings repeat similar copy.",
      recommendation: "Differentiate hero headlines to reinforce unique value per section.",
    });
  }

  if (metrics.croUx.modalMarkupCount > 5) {
    insights.push({
      id: "modal_backdrop_loaded",
      category: "cro",
      severity: "low",
      impact: "medium",
      evidence: "Modal or overlay markup present on initial load.",
      recommendation: "Lazy-load modal markup to reduce initial clutter and cumulative layout shift.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: "solid_basics",
      category: "seo",
      severity: "low",
      impact: "medium",
      evidence: "No critical HTML issues detected.",
      recommendation: "Focus on experimentation and messaging tests for further gains.",
    });
  }

  return insights;
}
