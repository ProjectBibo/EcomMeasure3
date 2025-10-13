import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { useExperience } from "../context/ExperienceContext";

const baseOptions = [
  {
    icon: Mail,
    href: "mailto:info@ecommeasure.com?subject=Kennismaken%20met%20EcomMeasure",
  },
  {
    icon: CalendarDays,
    href: "https://cal.com/",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/31612345678",
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].contact;
  const { celebrate } = useExperience();

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden py-24 sm:py-28 bg-gradient-to-br from-brand-blue/10 via-brand-teal/8 to-brand-teal/5 dark:from-surface-dark dark:via-surface-dark/95 dark:to-surface-dark"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={shouldReduceMotion ? { opacity: 0.2 } : { opacity: 0.25, scale: 1 }}
          transition={shouldReduceMotion ? undefined : { duration: 1.2, ease: "easeOut" }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          className="mx-auto mt-10 h-[420px] w-[420px] rounded-full bg-brand-blue/30 blur-3xl"
        />
      </div>
      <div className="absolute inset-0 opacity-50">
        <div className="grain-overlay" aria-hidden />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 text-sm font-medium text-brand-blue shadow-sm"
          >
            {t.badge}
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }}
            className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.3, duration: 0.7 }}
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-gray-400"
          >
            {t.intro}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {baseOptions.map(({ icon: Icon, href }, index) => {
            const content = t.options[index];
            const isExternal = href.startsWith("http");
            const linkProps = isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <motion.article
                key={content.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.15 * index, duration: 0.5 }}
                className="group relative h-full rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[16px_26px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-[22px_34px_95px_rgba(15,23,42,0.22)] dark:border-white/10 dark:bg-surface-dark/80 dark:shadow-[16px_28px_80px_rgba(2,6,23,0.55)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden style={{ boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.5), inset -12px -16px 28px rgba(148,163,184,0.18)" }} />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-neutral-900 dark:text-white">{content.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-400">{content.description}</p>
                <a
                  href={href}
                  {...linkProps}
                  onClick={(event) => {
                    if (href.includes("cal.com")) {
                      celebrate({ id: "scheduler", source: event.currentTarget });
                    }
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition group-hover:translate-x-0.5"
                >
                  {content.actionLabel}
                  <span aria-hidden="true">→</span>
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.6 }}
          className="mt-16 rounded-3xl bg-neutral-900 px-6 py-10 text-white shadow-[28px_40px_110px_rgba(15,23,42,0.45)] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[32px_48px_130px_rgba(15,23,42,0.55)] dark:bg-neutral-800 dark:shadow-[28px_44px_120px_rgba(2,6,23,0.65)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">{t.fast.title}</h3>
              <p className="mt-2 text-sm text-neutral-300 lg:max-w-xl">{t.fast.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@ecommeasure.com"
                className="magnetic-cta inline-flex items-center justify-center rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-neutral-900 shadow-[0_20px_44px_rgba(255,204,2,0.35)] transition-colors duration-200 hover:bg-brand-yellow-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                {t.fast.mail}
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.35)] transition hover:border-brand-yellow hover:text-brand-yellow"
              >
                {t.fast.social}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
