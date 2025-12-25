import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "Gedragsanalyse – Inzicht in barrières en kansen",
      description:
        "Combineer kwantitatieve en kwalitatieve data om frictie in de klantreis te ontdekken en prioriteren.",
    },
    hero: {
      eyebrow: "Gedragsanalyse",
      title: "Ontdek waar klanten afhaken en waarom",
      description:
        "Van funneldata tot sessie-opnames en klantinterviews: we combineren alle bronnen om patronen zichtbaar te maken. Zo onderbouw je welke experimenten de grootste impact hebben.",
    },
    sections: [
      {
        title: "Volledige funnel inzichten",
        bullets: [
          "Analyse van GA4-events, microconversies en attributiemodellen om knelpunten te lokaliseren.",
          "Heatmaps en sessie-opnames die laten zien welke interacties frictie opleveren.",
          "Segmentaties per device, verkeerstype en doelgroep zodat inzichten direct toepasbaar zijn.",
        ],
      },
      {
        title: "Kwalitatieve research",
        bullets: [
          "User tests en klantinterviews met uitgewerkte scripts en rapportages.",
          "On-site polls en exit surveys om motivaties en barrières te verzamelen.",
          "Voortdurende feedbackloops met klantenservice en sales voor context uit de praktijk.",
        ],
      },
      {
        title: "Prioritering & communicatie",
        bullets: [
          "Gebruik van frameworks zoals PIE en PXL om kansen op impact te rangschikken.",
          "Heldere insight cards met probleemstelling, bewijs en mogelijke oplossing.",
          "Overdrachtsessies met stakeholders zodat de organisatie begrijpt wat er speelt.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Behavior analysis – Reveal friction and opportunities",
      description:
        "Blend quantitative and qualitative data to uncover friction in the customer journey and prioritise solutions.",
    },
    hero: {
      eyebrow: "Behavior analysis",
      title: "See where customers drop off and why",
      description:
        "From funnel data to session recordings and interviews: we combine every signal to surface patterns. That way you can prioritise experiments that deliver the highest impact.",
    },
    sections: [
      {
        title: "Full-funnel insights",
        bullets: [
          "GA4 events, micro conversions and attribution models analysed to pinpoint bottlenecks.",
          "Heatmaps and session recordings highlighting interactions that create friction.",
          "Segmentations by device, traffic source and audience so findings become actionable fast.",
        ],
      },
      {
        title: "Qualitative research",
        bullets: [
          "User tests and customer interviews with detailed scripts and reporting.",
          "On-site polls and exit surveys capturing motivations and barriers.",
          "Continuous feedback loops with support and sales to add real-world context.",
        ],
      },
      {
        title: "Prioritisation & storytelling",
        bullets: [
          "Frameworks such as PIE and PXL to rank opportunities by impact.",
          "Insight cards that package the problem, evidence and suggested solution.",
          "Enablement sessions with stakeholders to align on what customers truly experience.",
        ],
      },
    ],
  },
};

export default function BehaviorAnalysis() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28   ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur   "
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.7 }}
            className="mt-7 text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 "
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
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur   "
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 ">{section.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 ">
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
