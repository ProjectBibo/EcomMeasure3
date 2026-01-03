import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Sitemap",
      description: "Overzicht van alle belangrijke pagina's op EcomMeasure.",
    },
    badge: "Sitemap",
    heading: "Alle pagina's in één oogopslag",
    intro:
      "Een compact overzicht van de belangrijkste pagina's. De links hieronder volgen dezelfde structuur als in de technische sitemap.",
    groups: [
      {
        title: "Hoofdpagina's",
        links: [
          { label: "Home", href: "/" },
          { label: "Over EcomMeasure", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Measurement",
        links: [
          { label: "Measurement overzicht", href: "/measurement" },
          { label: "GA4 & GTM", href: "/measurement/ga4-gtm" },
          { label: "Looker Studio", href: "/measurement/looker-studio" },
        ],
      },
      {
        title: "CRO",
        links: [
          { label: "CRO overzicht", href: "/cro" },
          { label: "Gedragsanalyse", href: "/cro/gedragsanalyse" },
          { label: "Hypotheses & A/B-tests", href: "/cro/hypotheses-ab-tests" },
          { label: "Implementatie", href: "/cro/implementatie" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Bayesiaanse A/B-test calculator", href: "/tools/bayesian-ab-test" },
          { label: "CRO ROI Calculator", href: "/tools/cro-roi" },
        ],
      },
      {
        title: "Blog",
        links: [
          { label: "Wat is conversie-optimalisatie?", href: "/blog/wat-is-conversie-optimalisatie" },
          { label: "Psychologische prijzen: 30 principes", href: "/blog/psychologische-prijzen-30-principes" },
          { label: "Conversie-optimalisatie: bureau, freelancer of zelf doen", href: "/blog/conversie-optimalisatie-bureau-freelancer-of-zelf-doen" },
          { label: "Conversie-optimalisatie boeken", href: "/blog/conversie-optimalisatie-boeken" },
          { label: "Conversie-optimalisatie tools", href: "/blog/conversie-optimalisatie-tools" },
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Sitemap",
      description: "Overview of all key pages on EcomMeasure.",
    },
    badge: "Sitemap",
    heading: "All pages at a glance",
    intro:
      "A compact overview of the main pages. The links below mirror the structure used in the technical sitemap.",
    groups: [
      {
        title: "Core pages",
        links: [
          { label: "Home", href: "/" },
          { label: "About EcomMeasure", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Measurement",
        links: [
          { label: "Measurement overview", href: "/measurement" },
          { label: "GA4 & GTM", href: "/measurement/ga4-gtm" },
          { label: "Looker Studio", href: "/measurement/looker-studio" },
        ],
      },
      {
        title: "CRO",
        links: [
          { label: "CRO overview", href: "/cro" },
          { label: "Behaviour analysis", href: "/cro/gedragsanalyse" },
          { label: "Hypotheses & A/B tests", href: "/cro/hypotheses-ab-tests" },
          { label: "Implementation", href: "/cro/implementatie" },
        ],
      },
      {
        title: "Tools",
        links: [
          { label: "Bayesian A/B test calculator", href: "/tools/bayesian-ab-test" },
          { label: "CRO ROI Calculator", href: "/tools/cro-roi" },
        ],
      },
      {
        title: "Blog",
        links: [
          { label: "What is conversion optimisation?", href: "/blog/wat-is-conversie-optimalisatie" },
          { label: "Psychological pricing: 30 principles", href: "/blog/psychologische-prijzen-30-principes" },
          { label: "Conversion optimisation: agency, freelancer or DIY", href: "/blog/conversie-optimalisatie-bureau-freelancer-of-zelf-doen" },
          { label: "Conversion optimisation books", href: "/blog/conversie-optimalisatie-boeken" },
          { label: "Conversion optimisation tools", href: "/blog/conversie-optimalisatie-tools" },
        ],
      },
    ],
  },
};

export default function Sitemap() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const t = copy[language];

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} />
      <main role="main" className="bg-surface-light pb-20 pt-20">
        <div className="mx-auto max-w-5xl px-6 space-y-10">
          <header className="space-y-4 text-left">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue"
            >
              {t.badge}
            </motion.span>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
              className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl"
            >
              {t.heading}
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.14, duration: 0.6 }}
              className="max-w-3xl text-lg text-neutral-700"
            >
              {t.intro}
            </motion.p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {t.groups.map((group, index) => (
              <motion.section
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, margin: "-10%" }}
                transition={shouldReduceMotion ? undefined : { duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lg backdrop-blur"
              >
                <h2 className="text-lg font-semibold text-neutral-900">{group.title}</h2>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {group.links.map((link) => (
                    <li key={link.href} className="flex items-center justify-between gap-2 rounded-lg bg-white/70 px-3 py-2 shadow-sm">
                      <a className="text-brand-blue hover:underline" href={link.href}>
                        {link.label}
                      </a>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{link.href}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
