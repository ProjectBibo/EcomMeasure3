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
    <section id="reviews" data-snap-section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/12 via-transparent to-brand-teal/12 dark:from-brand-blue/18 dark:via-transparent dark:to-brand-teal/15" aria-hidden />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          data-tilt-card
          className="surface-card group relative overflow-hidden p-8"
        >
          <span className="pill-badge">{t.badge}</span>
          <motion.blockquote
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.6 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
            className="mt-6 space-y-4 text-neutral-700 dark:text-gray-200"
          >
            <Quote className="text-brand-blue" size={28} />
            <p className="text-lg leading-relaxed">{t.quote}</p>
            <footer className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-gray-400">{t.author}</footer>
          </motion.blockquote>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs uppercase tracking-[0.2em] text-neutral-600 dark:text-gray-400">
            {t.metrics.map((metric) => (
              <div
                key={metric.label}
                className="surface-card p-4 text-center shadow-none"
              >
                {metric.value} <span className="block text-[10px]">{metric.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.1 }}
          data-tilt-card
          className="surface-card relative aspect-video overflow-hidden p-0"
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
