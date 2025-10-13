import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Measurement – GA4 & GTM events voor e-commerce",
      description:
        "Bouw een schaalbare GA4 en GTM setup met server-side tagging, enhanced e-commerce events en dashboards die direct inzicht geven.",
    },
    hero: {
      eyebrow: "Measurement",
      title: "Zekerheid in elke dataset met GA4, GTM en server-side tagging",
      description:
        "We richten je volledige measurement stack in: van datalayer en events tot advertentiekoppelingen en Looker Studio dashboards. Zo kun je elke growth-beslissing staven met betrouwbare data.",
    },
    sections: [
      {
        title: "Enhanced e-commerce events",
        bullets: [
          "Volledige datalayer mapping voor product, checkout en loyalty events.",
          "Custom dimensions & metrics afgestemd op jouw KPI-framework.",
          "Validatie met debug views, realtime dashboards en QA-scripts.",
        ],
      },
      {
        title: "Server-side tagging & consent",
        bullets: [
          "Server-side GTM containers met conversie API's voor Google Ads en Meta.",
          "Consent Mode v2 configuratie en forwarding van consent states.",
          "Failover strategieën zodat je meetdata robuust blijft bij uitval.",
        ],
      },
      {
        title: "Dashboards die dagelijks sturen",
        bullets: [
          "Looker Studio templates voor omzet, funnel en kanaalbijdrage.",
          "Automatische alerts bij afwijkingen in conversiepercentages.",
          "Knowledge transfers en Loom-opnames zodat teams zelfstandig blijven.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Measurement – GA4 & GTM events for commerce teams",
      description:
        "Set up a scalable GA4 and GTM foundation with server-side tagging, enhanced e-commerce events and dashboards that drive decisions.",
    },
    hero: {
      eyebrow: "Measurement",
      title: "Confidence in every dataset with GA4, GTM and server-side tagging",
      description:
        "We design your complete measurement stack: datalayer, events, ad platform connections and Looker Studio dashboards. Every growth decision is backed by reliable insights.",
    },
    sections: [
      {
        title: "Enhanced e-commerce events",
        bullets: [
          "Full datalayer mapping for product, checkout and loyalty events.",
          "Custom dimensions & metrics aligned with your KPI framework.",
          "Validation through debug views, realtime dashboards and QA scripts.",
        ],
      },
      {
        title: "Server-side tagging & consent",
        bullets: [
          "Server-side GTM with conversion APIs for Google Ads and Meta.",
          "Consent Mode v2 configuration and consent state forwarding.",
          "Failover strategies that keep your data resilient when outages happen.",
        ],
      },
      {
        title: "Dashboards that guide daily decisions",
        bullets: [
          "Looker Studio templates for revenue, funnel and channel contribution.",
          "Automated alerts when conversion metrics deviate.",
          "Knowledge transfers and Loom walkthroughs to keep teams autonomous.",
        ],
      },
    ],
  },
};

export default function Measurement() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="measurement-hero-title"
        className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20"
      >
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 vt-hero-visual">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-teal"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.7 }}
            id="measurement-hero-title"
            className="mt-7 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl vt-hero-title focus:outline-none"
            data-focus-target
            tabIndex={-1}
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {copy.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.55 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{section.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
