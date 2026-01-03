import { useEffect } from "react";

const DIFFUSE_COOKIE_NOTICE_SRC = "https://static.diffuse.tools/cookie-notice.js";
const DIFFUSE_COOKIE_NOTICE_KEY = "sUcbNsbGA45mthkclcW7";

function appendDiffuseScript() {
  const firstScript = document.getElementsByTagName("script")[0];
  const script = document.createElement("script");

  script.async = true;
  script.src = DIFFUSE_COOKIE_NOTICE_SRC;
  script.setAttribute("data-diffuse-cookie-notice", "true");

  (firstScript?.parentNode ?? document.body).insertBefore(script, firstScript ?? null);
}

export default function CookieNoticeLoader() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return undefined;
    if (window.__diffuseCookieNoticeInitialized) return undefined;

    window.__diffuseCookieNoticeInitialized = true;
    window.diffuseCookieNotice = { apiKey: DIFFUSE_COOKIE_NOTICE_KEY };

    const hasExistingScript = document.querySelector(
      "script[data-diffuse-cookie-notice='true'], script[src*='static.diffuse.tools/cookie-notice.js']"
    );
    if (!hasExistingScript) {
      appendDiffuseScript();
    }

    return undefined;
  }, []);

  return null;
}
