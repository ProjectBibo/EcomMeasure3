import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Testimonial() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].testimonial;

  return (
    <section id="reviews" data-snap-section className="section-shell relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/12 via-transparent to-brand-teal/12 dark:from-brand-blue/18 dark:via-transparent dark:to-brand-teal/15" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[22px_34px_85px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-[26px_42px_110px_rgba(15,23,42,0.26)] dark:border-white/10 dark:bg-white/10 dark:shadow-[22px_34px_100px_rgba(2,6,23,0.6)]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 8px rgba(255,255,255,0.5), inset -12px -20px 30px rgba(148,163,184,0.18)" }} />
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900">
            {t.badge}
          </span>
          <motion.blockquote
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.6 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
            className="mt-6 space-y-4 text-neutral-700 dark:text-gray-200"
          >
            <Quote className="text-brand-blue" size={28} strokeWidth={1.6} />
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-gray-200">{t.quote}</p>
            <footer className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-gray-400">{t.author}</footer>
          </motion.blockquote>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs uppercase tracking-[0.2em] text-neutral-600 dark:text-gray-400">
            {t.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/70 bg-white/70 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_45px_rgba(2,6,23,0.45)]"
              >
                <span className="block text-lg font-semibold tabular-nums text-neutral-800 dark:text-white">{metric.value}</span>
                <span className="mt-1 block text-[10px] tracking-[0.24em] text-neutral-500 dark:text-gray-400">{metric.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          className="relative aspect-video overflow-hidden rounded-3xl border border-white/50 shadow-[28px_38px_95px_rgba(15,23,42,0.25)] backdrop-blur-xl"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Klantvideo"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-neutral-800 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
            {t.videoCta}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
