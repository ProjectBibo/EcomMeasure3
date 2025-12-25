import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Insights() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].insights;

  return (
    <section data-snap-section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/80 dark:from-surface-dark/90 dark:via-surface-dark/70 dark:to-surface-dark/90" aria-hidden />
      <div className="section-shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.5 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="vt-heading text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            {t.heading}
          </motion.h2>
          <p className="max-w-lg text-sm text-neutral-600 dark:text-gray-300">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {t.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? undefined : { delay: index * 0.1, duration: 0.6 }}
              data-tilt-card
              className="surface-card group relative flex h-full flex-col gap-5 p-7"
            >
              <span className="pill-badge text-neutral-800 dark:text-white dark:bg-white/10 dark:border-white/15">
                {item.tag}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.text}</p>
              <div className="mt-8 flex items-end gap-4">
                <span className="text-5xl font-black text-brand-blue dark:text-brand-teal">{item.stat}</span>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-gray-400">{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
