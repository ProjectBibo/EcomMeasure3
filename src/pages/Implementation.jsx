import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "Implementatie – Van roadmap naar live optimalisaties",
      description:
        "Zorg dat verbeteringen daadwerkelijk live komen met een strak implementatieproces en kennisoverdracht.",
    },
    hero: {
      eyebrow: "Implementatie",
      title: "Van idee naar impact binnen weken",
      description:
        "We begeleiden de volledige implementatie: van development tickets en QA tot uitrol en evaluatie. Zo worden learnings uit research en experimenten daadwerkelijk omgezet naar groei.",
    },
    sections: [
      {
        title: "Planning & alignment",
        bullets: [
          "Roadmap vertaald naar sprints met duidelijke owners en deadlines.",
          "Afstemming met development, design en marketing zodat iedereen dezelfde prioriteiten deelt.",
          "Kick-off en refinements met heldere acceptatiecriteria voor elke wijziging.",
        ],
      },
      {
        title: "Development & QA",
        bullets: [
          "Tickets met uitgewerkte states, analytics requirements en meetplan.",
          "Cross-device testen en accessibility checks voordat iets live gaat.",
          "Koppeling met GA4, GTM en consent setups zodat tracking direct klopt.",
        ],
      },
      {
        title: "Launch & borging",
        bullets: [
          "Releasecommunicatie en change logs zodat stakeholders weten wat er verandert.",
          "Dashboards en alerting die monitoren of het verwachte effect optreedt.",
          "Documentatie en overdracht naar teams zodat optimalisaties geborgd blijven.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Implementation – Turning roadmaps into live improvements",
      description:
        "Ensure improvements actually ship with a tight implementation workflow and thorough enablement.",
    },
    hero: {
      eyebrow: "Implementation",
      title: "Move from idea to impact in weeks",
      description:
        "We support the full implementation: development tickets, QA, rollout and review. Insights from research and experiments are translated into growth that sticks.",
    },
    sections: [
      {
        title: "Planning & alignment",
        bullets: [
          "Roadmap translated into sprints with clear owners and deadlines.",
          "Alignment with development, design and marketing so everyone shares priorities.",
          "Kick-off and refinement sessions with explicit acceptance criteria for every change.",
        ],
      },
      {
        title: "Development & QA",
        bullets: [
          "Tickets covering all states, analytics requirements and measurement plans.",
          "Cross-device testing and accessibility reviews before launch.",
          "Connection with GA4, GTM and consent setups so tracking is correct from day one.",
        ],
      },
      {
        title: "Launch & adoption",
        bullets: [
          "Release communication and change logs keeping stakeholders informed.",
          "Dashboards and alerting to monitor whether expected impact happens.",
          "Documentation and handover to teams so optimisations stay embedded.",
        ],
      },
    ],
  },
};

export default function Implementation() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-green/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-green/25">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-green"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.7 }}
            className="mt-7 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
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
      </div>
    </>
  );
}
