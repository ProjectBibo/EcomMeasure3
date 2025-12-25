import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const shimmerAnimation = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

export default function AiInsightDemo() {
  const { language } = useLanguage();
  const copy = translations[language].aiDemo;
  const [inputValue, setInputValue] = useState("");
  const [selectedInsights, setSelectedInsights] = useState([]);
  const [subject, setSubject] = useState("");
  const resultsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const insightPool = useMemo(() => copy.insights, [copy.insights]);

  useEffect(() => {
    if (selectedInsights.length > 0 && resultsRef.current) {
      resultsRef.current.focus({ preventScroll: true });
    }
  }, [selectedInsights]);

  const deriveSubject = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) {
      return copy.defaultSubject;
    }

    const normalized = trimmed.replace(/^https?:\/\//i, "");

    try {
      const parsed = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
      return parsed.hostname.replace(/^www\./, "");
    } catch (error) {
      return normalized.split("/")[0] || copy.defaultSubject;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    const derivedSubject = deriveSubject(inputValue);
    setSubject(derivedSubject);

    const pool = [...insightPool];
    const desiredCount = pool.length < 2 ? pool.length : Math.min(pool.length, Math.floor(Math.random() * 2) + 2);

    const selections = [];
    while (selections.length < desiredCount && pool.length > 0) {
      const index = Math.floor(Math.random() * pool.length);
      selections.push(pool.splice(index, 1)[0]);
    }

    const mappedInsights = selections.map((insight) => ({
      id: insight.id,
      text: insight.text.replaceAll("{{subject}}", derivedSubject || copy.defaultSubject),
    }));

    setSelectedInsights(mappedInsights);
  };

  return (
    <section className="relative w-full section-block px-4">
      <div className="section-surface relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden p-8 md:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal/60 via-brand-blue to-brand-yellow dark:via-brand-blue/90" aria-hidden="true" />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">{copy.title}</h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">{copy.description}</p>
          </div>
        </div>
        <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
          <div className="flex-1">
            <label htmlFor="ai-demo-url" className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {copy.label}
            </label>
            <input
              id="ai-demo-url"
              name="ai-demo-url"
              type="text"
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
              className="btn-primary w-full justify-center text-base"
            >
              {copy.button}
            </button>
          </div>
        </form>
        <div
          className="mt-10"
          role="status"
          aria-live="polite"
        >
          {selectedInsights.length > 0 && (
            <div
              ref={resultsRef}
              tabIndex={-1}
              className="card-surface outline-none"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue dark:text-brand-yellow">
                {copy.resultLabel}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                {copy.resultTitle.replace("{{subject}}", subject || copy.defaultSubject)}
              </h3>
              <ul className="mt-6 space-y-4">
                {selectedInsights.map((insight, index) => {
                  const transition = shouldReduceMotion
                    ? undefined
                    : { delay: 0.12 * index, duration: 0.4, ease: "easeOut" };

                  return (
                    <motion.li
                      key={insight.id}
                      className="relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 px-5 py-4 text-base text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200"
                      {...(shouldReduceMotion ? { initial: false } : shimmerAnimation)}
                      transition={transition}
                    >
                      <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-brand-yellow shadow shadow-brand-yellow/40" aria-hidden="true" />
                      {insight.text}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
