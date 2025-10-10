// src/components/LookerDashboard.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function LookerDashboard() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].dashboard;

  return (
    <section
      id="dashboard"
      data-snap-section
      className="relative overflow-hidden bg-neutral-950 py-24 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="flex max-w-2xl flex-col gap-4"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-yellow">
              {t.badge}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.heading}</h2>
            <p className="text-sm text-neutral-200 sm:text-base">{t.description}</p>
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <motion.ul
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {t.highlights.map((item) => (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.35)] backdrop-blur"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-200">{item.text}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-blue/40 via-brand-teal/30 to-transparent blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_32px_80px_rgba(15,23,42,0.55)]">
              <iframe
                title={t.embedTitle}
                src={t.embedSource}
                className="h-[420px] w-full md:h-[500px]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-xs text-neutral-300">{t.footnote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
