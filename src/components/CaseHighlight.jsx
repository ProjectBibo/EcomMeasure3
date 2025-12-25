import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function CaseHighlight() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].case;

  return (
    <section id="case" data-snap-section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-teal/12   " aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          data-tilt-card
          className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[24px_36px_90px_rgba(15,23,42,0.2)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 hover:shadow-[28px_44px_110px_rgba(15,23,42,0.26)] focus-visible:shadow-[28px_44px_110px_rgba(15,23,42,0.26)]   "
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 8px rgba(255,255,255,0.55), inset -14px -20px 34px rgba(148,163,184,0.22)" }} />
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
            {t.badge}
          </span>
          <h3 className="mt-4 text-3xl font-semibold text-neutral-900 ">{t.title}</h3>
          <p className="mt-4 text-base text-neutral-600 ">{t.description}</p>
          <ul className="mt-6 space-y-4 text-sm text-neutral-600 ">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-900 shadow-[0_24px_55px_rgba(255,204,2,0.35)] transition-colors duration-200"
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
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/50 shadow-[28px_40px_95px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 hover:shadow-[32px_44px_110px_rgba(15,23,42,0.3)] focus-visible:shadow-[32px_44px_110px_rgba(15,23,42,0.3)]"
        >
          <img
            src="/case-after.jpg"
            alt="Case resultaat"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/70">{t.overlay.label}</p>
              <p className="text-lg font-semibold">{t.overlay.highlight}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.2em]">
              {t.overlay.stats.map((stat) => (
                <div key={stat} className="rounded-xl border border-white/30 bg-white/10 p-3 text-center shadow-[0_20px_45px_rgba(15,23,42,0.35)] backdrop-blur">
                  {stat.split(" ")[0]} <span className="block text-[10px]">{stat.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-blue/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 8px rgba(255,255,255,0.4), inset -16px -24px 36px rgba(30,64,175,0.3)" }} />
        </motion.div>
      </div>
    </section>
  );
}
