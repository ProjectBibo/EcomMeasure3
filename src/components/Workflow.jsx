import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Workflow() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].workflow;

  return (
    <section id="workflow" data-snap-section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/8 via-brand-teal/6 to-brand-teal/4 " aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-700 shadow-sm backdrop-blur ">
            {t.badge}
          </span>
          <h2 className="mt-4 vt-heading text-3xl sm:text-4xl font-bold text-neutral-900 ">{t.heading}</h2>
          <p className="mt-4 text-base text-neutral-600 ">{t.description}</p>
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
                className="group relative grid gap-5 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[18px_30px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 hover:shadow-[24px_40px_95px_rgba(15,23,42,0.25)] focus-visible:shadow-[24px_40px_95px_rgba(15,23,42,0.25)] md:grid-cols-[auto_1fr]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.5), inset -10px -18px 28px rgba(148,163,184,0.25)" }} />
                <div className="relative flex h-full items-start justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute left-1/2 top-12 hidden h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-brand-blue/20 md:block" aria-hidden />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 ">{step.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600 ">{step.text}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue shadow-[0_12px_28px_rgba(59,130,246,0.2)]">
                    {step.deliverable}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
