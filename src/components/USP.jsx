import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gauge, ShieldCheck, Search, Rocket } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const icons = [Gauge, ShieldCheck, Search, Rocket];

export default function USP() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].usp;

  return (
    <section id="diensten" data-snap-section className="section-shell relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)] items-start">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
            className="relative rounded-3xl border border-neutral-200/70 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-blue">
              {t.badge}
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.12] text-neutral-900 dark:text-white sm:text-[2.5rem]">
              {t.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-gray-300">{t.description}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
              {t.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.cards.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.article
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
                  transition={shouldReduceMotion ? undefined : { delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur transition dark:border-white/10 dark:bg-white/5"
                >
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-blue/10 blur-3xl transition group-hover:scale-125" aria-hidden />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{item.text}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-gray-400">{item.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
