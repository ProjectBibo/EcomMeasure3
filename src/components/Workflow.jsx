import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Workflow() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].workflow;

  return (
    <section
      id="workflow"
      data-snap-section
      className="relative overflow-hidden bg-surface-soft section-padding dark:bg-surface-dark"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-blue/6 via-transparent to-brand-teal/8 dark:from-brand-blue/14 dark:via-transparent dark:to-brand-teal/12"
        aria-hidden
      />
      <div className="section-shell relative">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="pill-badge">{t.badge}</span>
          <h2 className="mt-4 vt-heading text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">{t.heading}</h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-gray-300">{t.description}</p>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute left-[22px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-brand-blue to-brand-teal md:block" aria-hidden />
          <div className="space-y-12">
            {t.steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? undefined : { delay: index * 0.08, duration: 0.6 }}
              data-tilt-card
              className="surface-card group relative grid gap-5 p-7 md:grid-cols-[auto_1fr]"
            >
              <div className="relative flex h-full items-start justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="absolute left-1/2 top-12 hidden h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-brand-blue/20 md:block" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{step.text}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue shadow-[0_12px_28px_rgba(59,130,246,0.2)]">{step.deliverable}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
