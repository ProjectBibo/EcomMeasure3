import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const blockedDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];

export default function QuickScanRequest() {
  const { language } = useLanguage();
  const copy = translations[language].aiDemo;
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail] = useState(true);
  const [status] = useState("idle");
  const [errors] = useState({});
  const [pagePath, setPagePath] = useState("/");
  const [redirectUrl, setRedirectUrl] = useState("/confirmation");
  const emailRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPagePath(window.location.pathname || "/");
      setRedirectUrl(`${window.location.origin}/confirmation`);
    }
  }, []);

  useEffect(() => {
    if (showEmail && emailRef.current) {
      emailRef.current.focus();
    }
  }, [showEmail]);

  const validateUrl = (value) => {
    try {
      const parsed = new URL(value);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch (error) {
      return false;
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;
    if (!emailPattern.test(value)) {
      return copy.errors.emailInvalid;
    }

    const domain = value.split("@")[1]?.toLowerCase() || "";
    if (blockedDomains.includes(domain)) {
      return copy.errors.freeEmail;
    }

    return "";
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-xl backdrop-blur md:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal/70 via-brand-blue to-brand-yellow" aria-hidden="true" />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{copy.title}</h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">{copy.description}</p>
          </div>
        </div>

        <form
          name="quickscan"
          action="https://formspree.io/f/xpqwdpag"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="form-name" value="quickscan" />
          <input type="hidden" name="source" value="quickscan" />
          <input type="hidden" name="page_path" value={pagePath} />
          <input type="hidden" name="_redirect" value={redirectUrl} />
          <p className="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" onChange={() => {}} />
            </label>
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label htmlFor="quickscan-url" className="text-sm font-medium text-slate-800">
                {copy.urlLabel}
              </label>
              <input
                id="quickscan-url"
                name="url"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder={copy.urlPlaceholder}
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                disabled={isDisabled}
                className="mt-2 w-full rounded-xl border border-slate-300/70 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60 disabled:cursor-not-allowed disabled:bg-slate-50"
                aria-describedby="quickscan-url-helper quickscan-url-error"
              />
              <div className="mt-2 flex flex-col gap-1 text-sm">
                {errors.url ? (
                  <p id="quickscan-url-error" className="text-rose-600">
                    {errors.url}
                  </p>
                ) : null}
                <p id="quickscan-url-helper" className="text-slate-500">
                  {copy.helper}
                </p>
              </div>
            </div>

            {!showEmail && (
              <div className="md:self-end">
                <button type="submit" className="button-primary w-full justify-center" disabled={isDisabled}>
                  {copy.primaryCta}
                </button>
              </div>
            )}
          </div>

          <AnimatePresence initial={false}>
            {showEmail && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: -6 }}
                animate={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 1, height: "auto", y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -6 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200/80 bg-surface-light/70 px-4 py-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                  <div className="flex-1">
                    <label htmlFor="quickscan-email" className="text-sm font-medium text-slate-800">
                      {copy.emailLabel}
                    </label>
                    <input
                      ref={emailRef}
                      id="quickscan-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={copy.emailPlaceholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={isDisabled}
                      className="mt-2 w-full rounded-xl border border-slate-300/70 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60 disabled:cursor-not-allowed disabled:bg-slate-50"
                      aria-describedby="quickscan-email-error"
                    />
                    {errors.email ? (
                      <p id="quickscan-email-error" className="mt-2 text-sm text-rose-600">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="md:self-end">
                    <button
                      type="submit"
                      className="button-primary w-full justify-center"
                      disabled={isDisabled}
                    >
                      {status === "loading" ? copy.loadingText : copy.submitCta}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8" role="status" aria-live="polite">
          {status === "success" && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 text-slate-800">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{copy.successTitle}</p>
              <p className="mt-2 text-base text-slate-700">{copy.successBody}</p>
            </div>
          )}
          {status === "error" && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-slate-800">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">{copy.errorTitle}</p>
              <p className="mt-2 text-base text-slate-700">{copy.errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
