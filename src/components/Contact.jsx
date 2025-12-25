import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { AnimatedParagraph } from "./ExpressiveText";

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

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden section-padding bg-gradient-to-br from-brand-blue/10 via-brand-teal/8 to-brand-teal/5 dark:from-surface-dark dark:via-surface-dark/95 dark:to-surface-dark"
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

      <div className="section-shell relative">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
            className="pill-badge"
          >
            {t.badge}
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }}
            className="mt-6 vt-heading text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            {t.heading}
          </motion.h2>
          <AnimatedParagraph
            text={t.intro}
            language={language}
            highlight
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-gray-400"
            delay={0.28}
          />
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
                data-tilt-card
                className="surface-card group relative h-full p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Icon size={22} />
                </div>
                <h3 className="typography-subheading mt-5 text-xl font-semibold text-neutral-900 dark:text-white">{content.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-400">{content.description}</p>
                <a
                  href={href}
                  {...linkProps}
                  data-magnetic
                  data-variant="secondary"
                  className="mt-6 secondary-btn text-sm font-semibold text-brand-blue"
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
          data-tilt-card
          className="surface-card mt-16 bg-neutral-900 px-6 py-10 text-white ring-1 ring-white/10 shadow-none"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="typography-subheading text-2xl font-semibold">{t.fast.title}</h3>
              <p className="mt-2 text-sm text-neutral-300 lg:max-w-xl">{t.fast.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@ecommeasure.com"
                data-magnetic
                data-variant="primary"
                className="primary-btn text-sm"
              >
                {t.fast.mail}
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                data-variant="secondary"
                className="secondary-btn border-white/50 bg-white/5 text-white text-sm"
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
