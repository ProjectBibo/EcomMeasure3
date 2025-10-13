import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "Hypotheses & A/B-tests – Experimenteer met vertrouwen",
      description:
        "Van backlog tot analyse: zet een testprogramma neer dat bewijs levert en kennis borgt in de organisatie.",
    },
    hero: {
      eyebrow: "Hypotheses & A/B-tests",
      title: "Experimenteer op basis van duidelijke hypotheses",
      description:
        "We bouwen een A/B-testprogramma dat start met scherpe onderzoeksvragen, een gestroomlijnd proces en analyses die verder gaan dan uplift alleen.",
    },
    sections: [
      {
        title: "Strategie & roadmap",
        bullets: [
          "Onderzoeksvragen gekoppeld aan groeidoelen en funnelstappen.",
          "Backlog opgebouwd met kansen uit gedragsdata, research en input van stakeholders.",
          "Prioritering met bewezen modellen zoals ICE of custom scoring.",
        ],
      },
      {
        title: "Experiment design",
        bullets: [
          "Hypotheses met duidelijke probleemstelling, verwachting en meetplan.",
          "Design- en developmentbriefings inclusief states, copy en QA-checks.",
          "Bayesiaanse of frequentistische steekproefberekeningen afgestemd op traffic en risico.",
        ],
      },
      {
        title: "Analyse & leren",
        bullets: [
          "Dashboards die realtime voortgang en betrouwbaarheid tonen.",
          "Post-test analyses gericht op vervolgexperimenten en impact op KPI-clusters.",
          "Shareable learnings via experiment cards en terugkerende retrospectives.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Hypotheses & A/B tests – Experiment with confidence",
      description:
        "From backlog to analysis: run an experimentation program that proves impact and spreads knowledge across the organisation.",
    },
    hero: {
      eyebrow: "Hypotheses & A/B tests",
      title: "Experiment on the back of sharp hypotheses",
      description:
        "We establish an A/B testing program that starts with clear research questions, a streamlined process and analyses that go beyond uplift alone.",
    },
    sections: [
      {
        title: "Strategy & roadmap",
        bullets: [
          "Research questions tied to growth goals and funnel stages.",
          "Backlog built from behavioural data, research insights and stakeholder input.",
          "Prioritisation using proven models such as ICE or custom scoring.",
        ],
      },
      {
        title: "Experiment design",
        bullets: [
          "Hypotheses with a clear problem statement, expectation and measurement plan.",
          "Design and development briefs including states, copy and QA checks.",
          "Bayesian or frequentist sample size calculations tuned to traffic and risk appetite.",
        ],
      },
      {
        title: "Analysis & learning",
        bullets: [
          "Dashboards that track progress and significance in realtime.",
          "Post-test reviews focusing on follow-up experiments and impact on KPI clusters.",
          "Shareable learnings captured in experiment cards and recurring retrospectives.",
        ],
      },
    ],
  },
};

export default function HypothesesAbTests() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-purple/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-purple/20">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-purple"
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
