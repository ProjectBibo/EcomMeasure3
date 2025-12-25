import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function CaseHighlight() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].case;

  return (
    <section id="case" data-snap-section className="relative overflow-hidden bg-surface-light/60">
      <div className="absolute inset-0 bg-surface-soft" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          data-tilt-card
          className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-neutral-100/70 dark:border-white/5" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-800 dark:text-white">
            {t.badge}
          </span>
          <h3 className="mt-4 text-3xl font-semibold text-neutral-900 dark:text-white">{t.title}</h3>
          <p className="mt-4 text-base text-neutral-600 dark:text-gray-300">{t.description}</p>
          <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-gray-300">
            {t.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            data-magnetic
            data-variant="primary"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            {t.cta}
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          data-tilt-card
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-200 shadow-sm transition-transform duration-300 hover:-translate-y-1"
        >
          <img
            src="/case-after.jpg"
            alt="Case resultaat"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/70">{t.overlay.label}</p>
              <p className="text-lg font-semibold">{t.overlay.highlight}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.2em]">
              {t.overlay.stats.map((stat) => (
                <div key={stat} className="rounded-xl border border-white/30 bg-black/30 p-3 text-center backdrop-blur">
                  {stat.split(" ")[0]} <span className="block text-[10px]">{stat.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
