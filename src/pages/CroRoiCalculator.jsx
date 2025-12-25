import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import CroRoiCalculator from "../components/CroRoiCalculator";

const copy = {
  nl: {
    seo: {
      title: "CRO ROI Calculator",
      description:
        "Bereken extra omzet, winst en ROI van een CRO-programma gebaseerd op jouw bezoekers, conversies en marge.",
    },
    hero: {
      eyebrow: "Tools",
      title: "CRO ROI Calculator",
      description:
        "Ontdek het groeipotentieel van je webshop door bezoekers, conversies en marges in te vullen en direct de business case te zien.",
    },
  },
  en: {
    seo: {
      title: "CRO ROI Calculator",
      description:
        "Estimate extra revenue, profit and ROI from a CRO programme using your visitors, conversions and margin.",
    },
    hero: {
      eyebrow: "Tools",
      title: "CRO ROI Calculator",
      description:
        "Enter your visitors, orders and margin to reveal the revenue upside and ROI for investing in CRO.",
    },
  },
};

export default function CroRoiCalculatorPage() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <>
      <SEO title={content.seo.title} description={content.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28   ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur   "
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
          <CroRoiCalculator />
        </div>
      </div>
    </>
  );
}
