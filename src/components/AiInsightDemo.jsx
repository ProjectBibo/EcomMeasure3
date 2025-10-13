
export default function AiInsightDemo() {
  const { language } = useLanguage();
  const copy = translations[language].aiDemo;
  const [inputValue, setInputValue] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [reportNotice, setReportNotice] = useState(null);
  const resultRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const locale = language === "nl" ? "nl-NL" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  useEffect(() => {
    if (analysis && resultRef.current) {
      resultRef.current.focus({ preventScroll: true });
    }
  }, [analysis]);

  const runScan = async (targetUrl) => {
    if (!targetUrl || !targetUrl.trim()) {
      setError(copy.errors.INVALID_URL);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setReportNotice(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl.trim(), locale: language }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        const code = payload?.error || "GENERIC";
        setError(copy.errors[code] || copy.errors.GENERIC);
        setStatus("error");
        return;
      }

      setAnalysis({ ...payload.data, fromCache: payload.fromCache ?? false });
      setStatus(payload.fromCache ? "cached" : "success");
    } catch (fetchError) {
      setError(copy.errors.NETWORK || copy.errors.GENERIC);
      setStatus("error");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runScan(inputValue);
  };

  const handleRescan = () => {
    const target =
      analysis?.finalUrl || analysis?.normalizedUrl || analysis?.requestedUrl || inputValue;
    if (target) {
      runScan(target);
    }
  };

  const handleClear = () => {
    setAnalysis(null);
    setError(null);
    setStatus("idle");
    setReportNotice(null);
  };

  const handleSaveReport = async () => {
    if (!analysis) return;

    const subjectLabel = deriveSubject(
      analysis.finalUrl || analysis.normalizedUrl || analysis.requestedUrl,
      copy.defaultSubject
    );
    const timestampLabel = formatTimestamp(analysis.scannedAt, language);
    const lines = [
      `${copy.saveReport.summaryLabel}: ${analysis.finalUrl || analysis.normalizedUrl}`,
      `${copy.saveReport.subjectLabel}: ${subjectLabel}`,
      `${copy.saveReport.timestampLabel}: ${timestampLabel}`,
    ];

    if (analysis.insights?.length) {
      lines.push("", copy.saveReport.insightsHeading);
      analysis.insights.forEach((insight, index) => {
        const localized = copy.insights.library[insight.id] || {};
        const evidence =
          formatInsightString(localized.evidence, insight.details) || insight.evidence;
        const recommendation =
          formatInsightString(localized.recommendation, insight.details) ||
          insight.recommendation;
        lines.push(`${index + 1}. ${evidence} — ${recommendation}`);
      });
    }

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setReportNotice(copy.actions.reportCopied);
    } catch (copyError) {
      setReportNotice(copy.actions.reportFailed);
    }
  };

  const subject = useMemo(() => {
    if (!analysis) return copy.defaultSubject;
    return deriveSubject(
      analysis.finalUrl || analysis.normalizedUrl || analysis.requestedUrl,
      copy.defaultSubject
    );
  }, [analysis, copy.defaultSubject]);

  const metricsSections = useMemo(() => {
    if (!analysis?.metrics) return [];

    const resolveItem = (item) => (typeof item === "string" ? { label: item } : item || {});

    const metrics = analysis.metrics;
    const sections = [];

    const seoCopy = copy.metrics.sections.seo;
    sections.push({
      id: "seo",
      title: seoCopy.title,
      items: [
        {
          id: "titleLength",
          copy: resolveItem(seoCopy.items.titleLength),
          type: "number",
          value: metrics.seo.titleLength,
          unit: copy.metrics.units.characters,
        },
        {
          id: "metaDescription",
          copy: resolveItem(seoCopy.items.metaDescription),
          type: "boolean",
          value: metrics.seo.hasMetaDescription,
        },
        {
          id: "h1Count",
          copy: resolveItem(seoCopy.items.h1Count),
          type: "number",
          value: metrics.seo.h1Count,
        },
        {
          id: "canonical",
          copy: resolveItem(seoCopy.items.canonical),
          type: "boolean",
          value: Boolean(metrics.seo.canonicalHref),
        },
        {
          id: "robots",
          copy: resolveItem(seoCopy.items.robotsMeta),
          type: "text",
          value: metrics.seo.robotsMeta || copy.metrics.values.none,
        },
        {
          id: "hreflang",
          copy: resolveItem(seoCopy.items.hreflang),
          type: "number",
          value: metrics.seo.hreflangCount,
        },
        {
          id: "openGraph",
          copy: resolveItem(seoCopy.items.openGraph),
          type: "ratio",
          value: [
            metrics.seo.ogTitle ? 1 : 0,
            metrics.seo.ogDescription ? 1 : 0,
            metrics.seo.ogImage ? 1 : 0,
          ].reduce((sum, part) => sum + part, 0),
          secondary: 3,
        },
        {
          id: "sitemap",
          copy: resolveItem(seoCopy.items.sitemap),
          type: "boolean",
          value: Array.isArray(metrics.seo.sitemapHints) && metrics.seo.sitemapHints.length > 0,
        },
      ],
    });

    const accessibilityCopy = copy.metrics.sections.accessibility;
    sections.push({
      id: "accessibility",
      title: accessibilityCopy.title,
      items: [
        {
          id: "altRatio",
          copy: resolveItem(accessibilityCopy.items.altRatio),
          type: "percent",
          value: Math.round((metrics.accessibility.altRatio || 0) * 100),
          sparkline: [0.35, 0.55, 0.62, metrics.accessibility.altRatio || 0],
        },
        {
          id: "missingAlt",
          copy: resolveItem(accessibilityCopy.items.missingAlt),
          type: "number",
          value: metrics.accessibility.imagesMissingAlt,
        },
        {
          id: "mainLandmark",
          copy: resolveItem(accessibilityCopy.items.mainLandmark),
          type: "boolean",
          value: metrics.accessibility.hasMainLandmark,
        },
        {
          id: "formLabels",
          copy: resolveItem(accessibilityCopy.items.formLabels),
          type: "pair",
          value: metrics.accessibility.labeledControls,
          secondary: metrics.accessibility.formControlCount,
        },
        {
          id: "shortLinks",
          copy: resolveItem(accessibilityCopy.items.shortLinks),
          type: "number",
          value: metrics.accessibility.shortLinkCount,
        },
      ],
    });

    const performanceCopy = copy.metrics.sections.performance;
    sections.push({
      id: "performance",
      title: performanceCopy.title,
      items: [
        {
          id: "scriptCount",
          copy: resolveItem(performanceCopy.items.scriptCount),
          type: "number",
          value: metrics.performance.scriptCount,
        },
        {
          id: "inlineScript",
          copy: resolveItem(performanceCopy.items.inlineScript),
          type: "number",
          value: metrics.performance.inlineScriptLength,
        },
        {
          id: "stylesheets",
          copy: resolveItem(performanceCopy.items.stylesheets),
          type: "number",
          value: metrics.performance.stylesheetCount,
        },
        {
          id: "inlineStyles",
          copy: resolveItem(performanceCopy.items.inlineStyles),
          type: "number",
          value: metrics.performance.inlineStyleAttributeCount,
        },
        {
          id: "resourceHints",
          copy: resolveItem(performanceCopy.items.resourceHints),
          type: "pair",
          value: metrics.performance.preloadCount,
          secondary: metrics.performance.preconnectCount,
        },
        {
          id: "largestImageSrc",
          copy: resolveItem(performanceCopy.items.largestImageSrc),
          type: "number",
          value: metrics.performance.largestImageSrcLength,
        },
      ],
    });

    const analyticsCopy = copy.metrics.sections.analytics;
    sections.push({
      id: "analytics",
      title: analyticsCopy.title,
      items: [
        {
          id: "ga",
          copy: resolveItem(analyticsCopy.items.ga),
          type: "boolean",
          value: metrics.analyticsConsent.hasGA,
        },
        {
          id: "dataLayer",
          copy: resolveItem(analyticsCopy.items.dataLayer),
          type: "boolean",
          value: metrics.analyticsConsent.hasDataLayer,
        },
        {
          id: "cmpMarkers",
          copy: resolveItem(analyticsCopy.items.cmpMarkers),
          type: "number",
          value: metrics.analyticsConsent.cmpMarkerCount,
        },
        {
          id: "cookieLinks",
          copy: resolveItem(analyticsCopy.items.cookieLinks),
          type: "number",
          value: metrics.analyticsConsent.cookieLinkCount,
        },
      ],
    });

    const croCopy = copy.metrics.sections.cro;
    sections.push({
      id: "cro",
      title: croCopy.title,
      items: [
        {
          id: "ctaDensity",
          copy: resolveItem(croCopy.items.ctaDensity),
          type: "number",
          value: metrics.croUx.ctaAboveFold,
        },
        {
          id: "heroUnique",
          copy: resolveItem(croCopy.items.heroUnique),
          type: "boolean",
          value: !metrics.croUx.repeatedHeading,
        },
        {
          id: "modalMarkup",
          copy: resolveItem(croCopy.items.modalMarkup),
          type: "number",
          value: metrics.croUx.modalMarkupCount,
        },
      ],
    });

    return sections;
  }, [analysis, copy.metrics.sections]);

  const severityOrder = { high: 0, medium: 1, low: 2 };

  const localizedInsights = useMemo(() => {
    if (!analysis?.insights) return [];

    return analysis.insights
      .map((insight) => {
        const localized = copy.insights.library[insight.id] || {};
        const evidence =
          formatInsightString(localized.evidence, insight.details) || insight.evidence;
        const recommendation =
          formatInsightString(localized.recommendation, insight.details) ||
          insight.recommendation;
        const impact = localized.impact || insight.impact || "low";
        return {
          ...insight,
          impact,
          evidence,
          recommendation,
        };
      })
      .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }, [analysis, copy.insights.library]);

  const statusLabel =
    status === "loading"
      ? copy.status.scanning
      : status === "cached"
      ? copy.status.cached
      : status === "error"
      ? copy.status.error
      : "";

  const renderMetricValue = (item) => {
    if (item.type === "boolean") {
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            item.value
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300"
              : "bg-rose-500/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-300"
          }`}
        >
          {item.value ? copy.metrics.values.present : copy.metrics.values.missing}
        </span>
      );
    }

    if (item.type === "text") {
      return <span className="text-sm text-slate-600 dark:text-slate-300">{item.value}</span>;
    }

    if (item.type === "percent") {
      const safeValue = Number.isFinite(item.value) ? Math.max(0, item.value) : 0;
      return (
        <AnimatedCounter
          value={safeValue}
          disabled={shouldReduceMotion}
          format={(display) => `${Math.round(display)}${copy.metrics.units.percent}`}
        />
      );
    }

    if (item.type === "pair") {
      const primary = Number.isFinite(item.value) ? Math.max(0, item.value) : 0;
      const secondary = Number.isFinite(item.secondary) ? Math.max(0, item.secondary) : 0;
      return (
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          <AnimatedCounter
            value={primary}
            disabled={shouldReduceMotion}
            format={(display) => numberFormatter.format(Math.round(display))}
          />
          <span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">
            / {numberFormatter.format(secondary)}
          </span>
        </span>
      );
    }

    if (item.type === "ratio") {
      const primary = Number.isFinite(item.value) ? Math.max(0, item.value) : 0;
      const secondary = Number.isFinite(item.secondary) ? Math.max(1, item.secondary) : 1;
      return (
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {primary}/{secondary}
        </span>
      );
    }

    const numericValue = Number.isFinite(item.value) ? item.value : 0;
    return (
      <AnimatedCounter
        value={numericValue}
        disabled={shouldReduceMotion}
        format={(display) =>
          `${numberFormatter.format(Math.round(display))}${item.unit ? ` ${item.unit}` : ""}`
        }
      />
    );
  };

  return (
    <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70 md:p-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal/70 via-brand-blue to-brand-yellow dark:via-brand-blue/90"
          aria-hidden="true"
        />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue dark:border-brand-blue/30 dark:bg-brand-blue/15 dark:text-brand-yellow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              {copy.description}
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit} noValidate>
          <div className="flex-1">
            <label htmlFor="ai-demo-url" className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {copy.label}
            </label>
            <input
              id="ai-demo-url"
              name="ai-demo-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder={copy.placeholder}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300/60 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-brand-blue/70 dark:focus:ring-brand-blue/50"
              aria-describedby="ai-demo-helper"
            />
            <p id="ai-demo-helper" className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {copy.helper}
            </p>
          </div>
          <div className="md:self-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-blue/25 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue hover:bg-brand-teal hover:shadow-brand-teal/30 disabled:cursor-not-allowed disabled:opacity-80 dark:bg-brand-teal dark:hover:bg-brand-blue"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {copy.status.scanning}
                </>
              ) : (
                copy.button
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{copy.featureFlag.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{copy.featureFlag.helper}</p>
            </div>
            <button
              type="button"
              disabled
              aria-pressed="false"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-slate-200/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-400"
            >
              {copy.featureFlag.offLabel}
            </button>
          </div>
        </div>

        <div className="mt-10" aria-live="polite" role="status">
          <AnimatePresence>
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/95 p-6 text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-200"
              >
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{copy.status.scanning}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{copy.status.progress}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && status === "error" && (
              <motion.div
                key="error"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/90 p-6 text-rose-800 shadow-sm dark:border-rose-600/60 dark:bg-rose-950/60 dark:text-rose-100"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{copy.status.error}</p>
                  <p className="mt-1 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {analysis && (
              <motion.div
                key="results"
                ref={resultRef}
                tabIndex={-1}
                role="region"
                aria-label={copy.summary.heading}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                className="mt-6 min-h-[260px] rounded-2xl border border-slate-200/70 bg-white/95 p-6 shadow-lg outline-none dark:border-slate-700/70 dark:bg-slate-900/80"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue dark:text-brand-yellow">
                      {copy.resultLabel}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {copy.summary.subject.replace("{{subject}}", subject)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {copy.summary.scannedAt.replace(
                        "{{time}}",
                        formatTimestamp(analysis.scannedAt, language)
                      )}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        {analysis.finalUrl || analysis.normalizedUrl}
                      </span>
                      {status === "cached" || analysis.fromCache ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-yellow/20 px-2 py-1 font-medium text-brand-yellow-dark dark:bg-brand-yellow/30 dark:text-brand-yellow">
                          {copy.insights.cached}
                        </span>
                      ) : null}
                      {analysis.robots ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                          {analysis.robots.allowed
                            ? copy.summary.robotsAllowed
                            : copy.summary.robotsUnknown}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {statusLabel && (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-200/70 px-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                      {statusLabel}
                    </span>
                  )}
                </div>

                {analysis.warnings?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {analysis.warnings.map((warning) => (
                      <span
                        key={warning}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
                      >
                        {copy.warnings[warning] || warning}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {copy.metrics.heading}
                  </h4>
                  {metricsSections.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {copy.metrics.notAvailable}
                    </p>
                  ) : (
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      {metricsSections.map((section, sectionIndex) => (
                        <motion.div
                          key={section.id}
                          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.4,
                            delay: shouldReduceMotion ? 0 : sectionIndex * 0.05,
                          }}
                          className="rounded-2xl border border-slate-200/70 bg-surface-light/70 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70"
                        >
                          <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {section.title}
                          </h5>
                          <div className="mt-3 grid gap-3">
                            {section.items.map((item, itemIndex) => (
                              <motion.div
                                key={item.id}
                                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                                transition={{
                                  duration: shouldReduceMotion ? 0 : 0.35,
                                  delay: shouldReduceMotion ? 0 : itemIndex * 0.06,
                                }}
                                className="rounded-xl bg-white/90 p-3 shadow-inner dark:bg-slate-900/80"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                      {item.copy.label}
                                    </p>
                                    <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                      {renderMetricValue(item)}
                                    </div>
                                    {item.copy.helper ? (
                                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        {item.copy.helper}
                                      </p>
                                    ) : null}
                                  </div>
                                  {item.sparkline ? (
                                    <Sparkline
                                      points={item.sparkline}
                                      color="#1F6FEB"
                                      disabled={shouldReduceMotion}
                                    />
                                  ) : null}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {copy.insights.heading}
                  </h4>
                  {localizedInsights.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {copy.insights.empty}
                    </p>
                  ) : (
                    <ul className="mt-4 space-y-4">
                      {localizedInsights.map((insight, index) => {
                        const severityStyle = severityStyles[insight.severity] || severityStyles.medium;
                        return (
                          <motion.li
                            key={insight.id}
                            className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-surface-light/80 px-5 py-4 text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200"
                            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.4,
                              delay: shouldReduceMotion ? 0 : index * 0.05,
                            }}
                          >
                            <motion.span
                              className={`absolute left-0 top-0 h-1 w-full ${severityStyle.bar}`}
                              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
                              animate={shouldReduceMotion ? undefined : { scaleX: 1 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                              style={{ transformOrigin: "left center" }}
                              aria-hidden="true"
                            />
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                <span aria-hidden="true">
                                  {categoryIcons[insight.category] || "•"}
                                </span>
                                <span>{copy.categories[insight.category] || insight.category}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className={`${severityStyle.text} font-semibold uppercase`}>
                                  {copy.severity[insight.severity] || insight.severity}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                  {copy.insights.impactLabel}: {copy.impact[insight.impact] || insight.impact}
                                </span>
                              </div>
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-100">
                              {insight.evidence}
                            </p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              {insight.recommendation}
                            </p>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRescan}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition hover:bg-brand-blue/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue dark:border-brand-blue/40 dark:bg-slate-900/70 dark:text-brand-yellow"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    {copy.actions.rescan}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    {copy.actions.clear}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReport}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/60 bg-brand-yellow px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark dark:border-brand-yellow/80 dark:text-slate-900"
                  >
                    <Clipboard className="h-4 w-4" aria-hidden="true" />
                    {copy.actions.saveReport}
                  </button>
                  {reportNotice && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">{reportNotice}</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
