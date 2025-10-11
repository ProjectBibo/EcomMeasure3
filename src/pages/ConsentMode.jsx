import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Consent Mode v2 – AVG/GDPR proof meten",
      description:
        "Implementeer Consent Mode v2, CMP-integraties en juridische documentatie zodat privacy en performance hand in hand gaan.",
    },
    hero: {
      eyebrow: "Consent Mode v2",
      title: "Privacy-proof tracking zonder concessies in performance",
      description:
        "We vertalen wetgeving naar concrete configuraties. Je krijgt een consentstrategie die marketing, legal en development met elkaar verbindt.",
    },
    cards: [
      {
        title: "CMP integratie",
        items: [
          "Integratie met OneTrust, Cookiebot of custom CMP's.",
          "Real-time synchronisatie van consent states naar GTM en server-side tags.",
          "Testscenario's voor first-party, marketing en analytics consent.",
        ],
      },
      {
        title: "Documentatie & governance",
        items: [
          "Consent- en datastromen uitgeschreven voor legal en marketing.",
          "Version control voor scripts, events en wijzigingen.",
          "Checklist voor audits en DPIA's inclusief bewijslast.",
        ],
      },
      {
        title: "Performance behoud",
        items: [
          "Modelled conversions gekoppeld aan Google Ads en Meta.",
          "Fallbacks voor situaties met beperkte consent.",
          "Monitoring op consent acceptance rate en impact op ROAS.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Consent Mode v2 – GDPR proof measurement",
      description:
        "Implement Consent Mode v2, CMP integrations and governance so privacy and performance reinforce each other.",
    },
    hero: {
      eyebrow: "Consent Mode v2",
      title: "Privacy-proof tracking without sacrificing performance",
      description:
        "We translate regulation into practical configurations. The consent strategy connects marketing, legal and development teams.",
    },
    cards: [
      {
        title: "CMP integration",
        items: [
          "Integration with OneTrust, Cookiebot or custom CMP setups.",
          "Realtime synchronisation of consent states to GTM and server-side tags.",
          "Testing scenarios covering functional, marketing and analytics consent.",
        ],
      },
      {
        title: "Documentation & governance",
        items: [
          "Consent and data flows documented for legal and marketing stakeholders.",
          "Version control for scripts, events and changes.",
          "Audit and DPIA checklist including proof of compliance.",
        ],
      },
      {
        title: "Performance safeguards",
        items: [
          "Modelled conversions connected to Google Ads and Meta.",
          "Fallback logic for limited consent situations.",
          "Monitoring on consent acceptance rate and ROAS impact.",
        ],
      },
    ],
  },
};

export default function ConsentMode() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-teal/10 via-white to-brand-yellow/10 pb-24 pt-28 dark:from-brand-teal/20 dark:via-surface-dark dark:to-brand-yellow/20">
        <div className="story-stripe" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-teal shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-yellow"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.7 }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.16, duration: 0.7 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-20 max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {copy.cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.6 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 text-left shadow-[18px_28px_80px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[20px_32px_90px_rgba(2,6,23,0.55)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 3px 3px 10px rgba(255,255,255,0.5), inset -14px -16px 32px rgba(148,163,184,0.18)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{card.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                      <span>{item}</span>
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
