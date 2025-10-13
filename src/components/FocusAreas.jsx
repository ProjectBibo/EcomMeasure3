import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    badge: "Expertises",
    title: "Kies de verdieping die jouw groei versnelt",
    description:
      "Elk traject start met een heldere focus. Verken de pijlers van measurement, consent en CRO en ontdek welke stap jouw e-commerce versnelt.",
    cards: [
      {
        title: "Measurement",
        subtitle: "GA4 & GTM events",
        description:
          "Een schaalbare datastructuur met enhanced e-commerce events, server-side tagging en dashboards die dagelijks vertrouwen geven.",
        to: "/measurement",
      },
      {
        title: "Consent Mode v2",
        subtitle: "AVG/GDPR proof",
        description:
          "Consent Mode v2, CMP-integraties en duidelijke documentatie zodat marketing- en legalteams met zekerheid kunnen sturen.",
        to: "/consent-mode",
      },
      {
        title: "CRO",
        subtitle: "A/B-tests & hypotheses",
        description:
          "Onderzoek, experimenteer en leer sneller met een strak proces voor hypotheses, validatie en implementatie.",
        to: "/cro",
      },
    ],
  },
  en: {
    badge: "Expertise",
    title: "Pick the focus area that accelerates growth",
    description:
      "Every engagement starts with clarity. Explore the pillars of measurement, consent and CRO to see which track unlocks your next stage.",
    cards: [
      {
        title: "Measurement",
        subtitle: "GA4 & GTM events",
        description:
          "A scalable data foundation with enhanced e-commerce events, server-side tagging and dashboards that inspire daily confidence.",
        to: "/measurement",
      },
      {
        title: "Consent Mode v2",
        subtitle: "GDPR compliant",
        description:
          "Consent Mode v2, CMP integrations and transparent documentation so marketing and legal teams can operate with certainty.",
        to: "/consent-mode",
      },
      {
        title: "CRO",
        subtitle: "A/B tests & hypotheses",
        description:
          "Research, experiment and learn faster with a focused workflow for hypotheses, validation and implementation.",
        to: "/cro",
      },
    ],
  },
};

export default function FocusAreas() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <section className="relative overflow-hidden bg-surface-soft py-20 dark:bg-surface-dark">
      <div className="absolute inset-0 pointer-events-none">
        <div className="story-stripe" aria-hidden />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          className="inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600 shadow-sm backdrop-blur dark:bg-white/10 dark:text-gray-300"
        >
          {copy.badge}
        </motion.span>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-3xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-gray-400">{copy.description}</p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.55 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[18px_28px_70px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[18px_30px_80px_rgba(2,6,23,0.55)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "inset 3px 3px 10px rgba(255,255,255,0.55), inset -14px -18px 36px rgba(148,163,184,0.2)",
                }}
              />
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue/80 dark:text-brand-teal/80">
                    {card.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{card.description}</p>
              </div>
              <div className="mt-8 flex flex-1 items-end">
                <Link
                  to={card.to}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark hover:shadow-[0_24px_50px_rgba(255,204,2,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark"
                >
                  {language === "nl" ? "Bekijk de pagina" : "View details"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
