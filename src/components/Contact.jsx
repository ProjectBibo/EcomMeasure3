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
      className="relative overflow-hidden bg-white py-24 sm:py-28 dark:bg-surface-dark"
    >
      <div className="relative page-container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-200 bg-white text-sm font-medium text-brand-blue shadow-sm"
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
                className="surface-card group relative h-full border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-surface-muted"
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
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-200"
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
          className="mt-16 rounded-3xl border border-neutral-200 bg-surface-muted px-6 py-10 text-neutral-900 shadow-sm transition-[box-shadow,transform] duration-300 hover:shadow-lg focus-visible:shadow-lg dark:border-white/10 dark:bg-surface-muted dark:text-white"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="typography-subheading text-2xl font-semibold">{t.fast.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 lg:max-w-xl dark:text-gray-300">{t.fast.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@ecommeasure.com"
                data-magnetic
                data-variant="primary"
                className="btn-primary px-5 py-2 text-sm"
              >
                {t.fast.mail}
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                data-variant="secondary"
                className="btn-secondary px-5 py-2 text-sm"
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
