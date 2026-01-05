import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import { scrollToContactSection } from "../utils/scrollToContact";
import CroRoiCalculator from "../components/CroRoiCalculator";

const copy = {
  nl: {
    seo: {
      title: "Funnel Impact Calculator",
      description:
        "Modelleer je volledige funnel volgens GA4-logica en zie exact waar de omzet weglekt en hoeveel impact verbetering per stap heeft.",
    },
    hero: {
      eyebrow: "Tools",
      title: "Funnel Impact Calculator",
      description:
        "Breng je funnel in kaart met GA4-stijl stappen en bereken direct hoeveel orders en omzet er per stap verloren gaan.",
    },
    after: {
      title: "Geen zekerheid over de cijfers? Dan mis je inzicht, niet omzet.",
      body: [
        "Deze calculator gaat ervan uit dat je weet hoeveel mensen elke funnelstap zien en waar ze afhaken.",
        "Kun je die percentages niet invullen? Dat is het signaal dat meting ontbreekt: zonder betrouwbare GA4-data blijft een omzetlek onzichtbaar.",
        "Pas wanneer measurement en GA4 goed zijn ingericht, kun je gericht optimaliseren en CRO-resultaten boeken.",
      ],
      quote: "If you don’t know these numbers, you’re not missing revenue — you’re missing insight.",
      cta: "Plan een kennismaking",
    },
  },
  en: {
    seo: {
      title: "Funnel Impact Calculator",
      description:
        "Map your funnel with GA4-style logic to see exactly where value leaks and what each step contributes to revenue.",
    },
    hero: {
      eyebrow: "Tools",
      title: "Funnel Impact Calculator",
      description:
        "Chart every step from visit to order and instantly see where you lose orders, revenue and conversion momentum.",
    },
    after: {
      title: "Unsure about the numbers? That means missing insight, not revenue.",
      body: [
        "This calculator assumes you know each funnel step, its drop-offs and what users do between them.",
        "If you cannot fill in these percentages, it signals a measurement gap: without reliable GA4 data, revenue leaks stay invisible.",
        "Only with solid measurement and GA4 setup can you prioritise CRO and improve the funnel with confidence.",
      ],
      quote: "If you don’t know these numbers, you’re not missing revenue — you’re missing insight.",
      cta: "Plan een kennismaking",
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
        <div className="relative mx-auto mt-16 max-w-4xl px-6">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-[18px_26px_76px_rgba(15,23,42,0.14)] backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900 ">{content.after.title}</h2>
            <div className="mt-4 space-y-3 text-neutral-700 ">
              {content.after.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="mt-2 rounded-2xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-900 ">{content.after.quote}</p>
            </div>
            <div className="mt-6">
              <a
                href="#contact"
                data-magnetic
                data-variant="primary"
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition-colors duration-200"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToContactSection();
                }}
              >
                {content.after.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
