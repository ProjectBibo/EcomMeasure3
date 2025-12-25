import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Insights() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].insights;

  return (
    <section data-snap-section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/80 " aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.5 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="vt-heading text-3xl sm:text-4xl font-bold text-neutral-900 "
          >
            {t.heading}
          </motion.h2>
          <p className="max-w-lg text-sm text-neutral-600 ">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {t.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? undefined : { delay: index * 0.1, duration: 0.6 }}
              data-tilt-card
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[18px_28px_75px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 hover:shadow-[24px_36px_95px_rgba(15,23,42,0.22)] focus-visible:shadow-[24px_36px_95px_rgba(15,23,42,0.22)] "
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2.3rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.55), inset -12px -18px 32px rgba(148,163,184,0.2)" }} />
              <div className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-white/60 via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 " aria-hidden />
              <span className="inline-flex items-center rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900 ">
                {item.tag}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-neutral-900 ">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 ">{item.text}</p>
              <div className="mt-8 flex items-end gap-4">
                <span className="text-5xl font-black text-brand-blue ">{item.stat}</span>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 ">{item.detail}</p>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
