import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import ConversionFunnelCalculator from "../components/ConversionFunnelCalculator";
import { scrollToContactSection } from "../utils/scrollToContact";

const copy = {
  nl: {
    seo: {
      title: "Conversiefunnel omzet calculator",
      description:
        "Bereken conversie, orders en omzet door je funnelpercentages te combineren met verkeer en orderwaarde.",
    },
    hero: {
      eyebrow: "Tools",
      title: "Conversiefunnel omzet calculator",
      description:
        "Simuleer wat er met je omzet gebeurt als je funnelpercentages verschuiven. Vul verkeer, AOV en funnelcijfers in en zie direct de impact.",
    },
  },
  en: {
    seo: {
      title: "Conversion funnel revenue calculator",
      description:
        "Calculate conversion, orders and revenue by combining funnel percentages with traffic and order value.",
    },
    hero: {
      eyebrow: "Tools",
      title: "Conversion funnel revenue calculator",
      description:
        "Simulate how revenue moves when funnel percentages change. Enter traffic, AOV and funnel metrics to see the impact instantly.",
    },
  },
};

export default function ConversionFunnelCalculatorPage() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <>
      <SEO title={content.seo.title} description={content.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-teal/10 pb-24 pt-28   ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-teal shadow-sm backdrop-blur   "
          >
            {content.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.06, duration: 0.6 }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.12, duration: 0.6 }}
            className="mt-6 text-lg text-neutral-700 "
          >
            {content.hero.description}
          </motion.p>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <ConversionFunnelCalculator />
          <div className="mt-10 rounded-3xl bg-white/90 p-6 text-left shadow-lg ring-1 ring-black/5  md:p-8">
            <div className="space-y-4 text-neutral-800">
              <p>
                Heb je deze calculator willen gebruiken, maar beschik je niet over (een deel van) deze data?
              </p>
              <p>
                Dan is dat geen waardelek — het betekent simpelweg dat je meting nog niet op orde is. Zonder betrouwbare data is het onmogelijk om te bepalen waar conversie verloren gaat en waar optimalisatie daadwerkelijk impact heeft.
              </p>
              <p>
                Met onze <strong>measurement-dienst</strong> richten we GA4 en tracking correct in, controleren bestaande setups en zorgen we dat je precies ziet wat er gebeurt op je website. Zo leg je een solide basis voor onderbouwde CRO- en UX-verbeteringen.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToContactSection()}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_20px_45px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
            >
              Plan een kennismaking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
