import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "CRO – A/B-tests & hypotheses voor continue groei",
      description:
        "Versnel experimentatie met onderzoek, hypotheses en development support die resultaat meetbaar maakt.",
    },
    hero: {
      eyebrow: "CRO",
      title: "Van inzichten naar bewezen impact met een strak experimentproces",
      description:
        "We combineren kwalitatief en kwantitatief onderzoek om hypotheses te bouwen die direct aansluiten op je KPI's. Daarna begeleiden we de volledige testcyclus tot en met implementatie.",
    },
    phases: [
      {
        title: "Onderzoek & analyse",
        description:
          "Customer journeys, analytics deep dives en user testing leggen fricties bloot. Elke bevinding wordt geprioriteerd op basis van impact en effort.",
      },
      {
        title: "Hypotheses & design",
        description:
          "We formuleren hypotheses met duidelijke succesmetrics en vertalen die naar wireframes of prototypes die development-ready zijn.",
      },
      {
        title: "Experimentatie & implementatie",
        description:
          "A/B-tests worden opgezet in jouw tooling. Na een winnende variant begeleiden we de technische implementatie en delen learnings met het team.",
      },
    ],
    highlights: [
      "Research library met herbruikbare inzichten en sessies.",
      "Prioritering via PIE of ICE frameworks met transparante scoring.",
      "Coaching van product owners en designers om sneller te leren.",
    ],
  },
  en: {
    seo: {
      title: "CRO – A/B testing & hypotheses for continuous growth",
      description:
        "Accelerate experimentation with research, hypotheses and delivery support that keeps impact measurable.",
    },
    hero: {
      eyebrow: "CRO",
      title: "From insight to proven impact with a focused experiment workflow",
      description:
        "We blend qualitative and quantitative research to craft hypotheses aligned to your KPIs. Then we guide the entire testing cycle through to implementation.",
    },
    phases: [
      {
        title: "Research & analysis",
        description:
          "Customer journeys, analytics deep dives and user testing expose friction. Each finding is prioritised on impact versus effort.",
      },
      {
        title: "Hypotheses & design",
        description:
          "We create hypotheses with clear success metrics and translate them into wireframes or prototypes that are ready for development.",
      },
      {
        title: "Experimentation & rollout",
        description:
          "A/B tests are launched in your tooling. After a winner we support the technical rollout and transfer learnings to your team.",
      },
    ],
    highlights: [
      "Research library with reusable insights and sessions.",
      "Prioritisation via PIE or ICE frameworks with transparent scoring.",
      "Coaching for product owners and designers to accelerate learning.",
    ],
  },
};

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/12 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/18">
        <div className="glow-orb glow-orb--yellow right-0 top-10 h-[24rem] w-[24rem] opacity-60" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-yellow"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.7 }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {copy.phases.map((phase, index) => (
              <motion.article
                key={phase.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.6 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_85px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_95px_rgba(2,6,23,0.55)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 3px 3px 10px rgba(255,255,255,0.5), inset -14px -16px 34px rgba(148,163,184,0.2)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{phase.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{phase.description}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
            className="mt-16 rounded-3xl border border-white/70 bg-white/80 p-10 shadow-[26px_40px_110px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[26px_44px_120px_rgba(2,6,23,0.6)]"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              {language === "nl" ? "Wat je ontvangt" : "What you get"}
            </h2>
            <ul className="mt-6 grid gap-4 text-sm leading-relaxed text-neutral-600 dark:text-gray-300 md:grid-cols-3">
              {copy.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}
