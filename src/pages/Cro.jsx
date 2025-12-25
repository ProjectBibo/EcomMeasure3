import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const croServices = [
  {
    title: "Kwalitatieve analyse middels UX Expert review",
    bullets: [
      "Inspectie én analyse van het gebruikersgemak door UX- en usability expert",
      "9 universele UX-aandachtsgebieden",
      "Totaalbeeld met ±150 checkpoints",
    ],
    extras: [
      {
        title: "Wat we doen",
        description:
          "We doorlopen de belangrijkste flows, toetsen tegen UX-heuristieken en markeren directe quick wins en structurele knelpunten.",
      },
      {
        title: "Jij ontvangt",
        description: "PDF + toelichting (bondig)",
      },
    ],
    price: "Prijs vanaf €860 (ex btw, afhankelijk van de website)",
  },
  {
    title:
      "Kwantitatieve Analyse naar groeidrivers en verbeterpunten (Google Analytics 4, Google Search e.a.)",
    bullets: [
      "Kwantitatieve analyse van gebruikers op je site",
      "Aangevuld met eyetracking scans",
      "Aangevuld met onderzoek en inzichten vanuit Google Analytics, Google Search",
    ],
    extras: [
      {
        title: "Wat we doen",
        description:
          "We combineren verkeers- en conversiedata met heatmaps en eyetracking om bottlenecks en kansen cijfermatig te onderbouwen.",
      },
      {
        title: "Jij ontvangt",
        description: "Presentatie + actie/prioriteitenlijst (bondig)",
      },
    ],
    price: "Prijs vanaf €1400 (ex btw, afhankelijk van de website)",
  },
  {
    title: "User Testing van de gehele customer journey",
    bullets: [
      "Persoonlijk, maatwerk en genormeerd testplan met meetbare doelen",
      "Tot 5 participanten, via mobile en desktop",
      "Remote of on-site",
    ],
    extras: [
      {
        title: "Wat we doen",
        description:
          "We ontwerpen scenario's voor de volledige journey, rekruteren deelnemers en modereren sessies met objectieve observaties.",
      },
      {
        title: "Jij ontvangt",
        description: "Presentatie + gedetailleerde lijst met acties en prioriteiten (bondig)",
      },
    ],
    price: "Prijs vanaf €2500 (ex btw, afhankelijk van de website)",
  },
];

const content = {
  nl: {
    seo: {
      title: "UX/CRO diensten – onderzoek en optimalisatie",
      description:
        "Drie CRO-diensten van expert reviews tot user testing, inclusief duidelijke deliverables en prioriteiten.",
    },
    heading: "UX/CRO diensten",
  },
  en: {
    seo: {
      title: "UX/CRO services – research and optimization",
      description:
        "Three CRO services from expert reviews to user testing with clear deliverables and priorities.",
    },
    heading: "UX/CRO diensten",
  },
};

const CardIcon = () => (
  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M7 3h10a2 2 0 0 1 2 2v16l-7-4-7 4V5a2 2 0 0 1 2-2Z" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
    </svg>
  </span>
);

export default function Cro() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const copy = content[language] || content.nl;

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20">
        <div className="glow-orb glow-orb--primary-soft right-0 top-10 h-[24rem] w-[24rem] opacity-60" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            {copy.heading}
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {croServices.map((service) => (
              <article
                key={service.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[20px_30px_90px_rgba(15,23,42,0.18)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_95px_rgba(2,6,23,0.55)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 3px 3px 10px rgba(255,255,255,0.5), inset -14px -16px 34px rgba(148,163,184,0.2)",
                  }}
                />
                <div className="relative flex flex-1 flex-col gap-4">
                  <CardIcon />
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{service.title}</h2>
                  <ul className="flex flex-col gap-2 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid gap-3 rounded-2xl bg-neutral-50/70 p-4 text-sm text-neutral-700 shadow-inner dark:bg-white/5 dark:text-gray-200">
                    {service.extras.map((extra) => (
                      <div key={extra.title} className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue dark:text-brand-teal">
                          {extra.title}
                        </p>
                        <p>{extra.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative mt-6 text-sm font-semibold text-neutral-900 dark:text-white">{service.price}</div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
