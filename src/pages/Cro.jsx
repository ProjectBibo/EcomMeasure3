import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = [
  {
    title: "Kwalitatieve analyse middels UX Expert review",
    bullets: [
      "Inspectie én analyse van het gebruikersgemak door UX- en usability expert",
      "9 universele UX-aandachtsgebieden",
      "Totaalbeeld met ±150 checkpoints",
    ],
    whatWeDo:
      "We doorlopen de volledige experience en documenteren drempels, frictie en verbeterkansen met visuele voorbeelden.",
    deliverable: "PDF + toelichting (bondig)",
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
    whatWeDo:
      "We combineren verkeers- en gedragsdata, heatmaps en eyetracking om patronen te vinden die conversie en engagement sturen.",
    deliverable: "presentatie + actie/prioriteitenlijst (bondig)",
    price: "Prijs vanaf €1400 (ex btw, afhankelijk van de website)",
  },
  {
    title: "User Testing van de gehele customer journey",
    bullets: [
      "Persoonlijk, maatwerk en genormeerd testplan met meetbare doelen",
      "Tot 5 participanten, via mobile en desktop",
      "Remote of on-site",
    ],
    whatWeDo:
      "We ontwerpen scenario’s en modereren tests die zowel de emotionele als functionele journey vastleggen.",
    deliverable: "presentatie + gedetailleerde lijst met acties en prioriteiten (bondig)",
    price: "Prijs vanaf €2500 (ex btw, afhankelijk van de website)",
  },
];

const icon = (
  <svg
    aria-hidden
    className="h-10 w-10 text-brand-blue"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="18" className="fill-white/70 stroke-current" strokeWidth="2.4" />
    <path
      d="M16 26c2.8 1.8 6 2.7 8 2.7 2 0 5.4-.9 8.2-2.7"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <circle cx="18" cy="18" r="2" className="fill-current" />
    <circle cx="30" cy="18" r="2" className="fill-current" />
  </svg>
);

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const seoTitle = language === "nl" ? "CRO – UX/CRO diensten" : "CRO – UX/CRO services";
  const seoDescription =
    language === "nl"
      ? "Overzicht van UX expert reviews, kwantitatieve analyses en user testing trajecten."
      : "Overview of UX expert reviews, quantitative analyses and user testing programs.";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20">
        <div className="glow-orb glow-orb--primary-soft right-0 top-10 h-[24rem] w-[24rem] opacity-60" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
            className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            UX/CRO diensten
          </motion.h1>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.1 * index, duration: 0.6 }}
                className="group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_90px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_100px_rgba(2,6,23,0.55)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <div className="relative flex items-center gap-3 text-sm font-semibold text-brand-blue">
                  <span className="rounded-full bg-brand-blue/10 p-2 text-brand-blue">{icon}</span>
                  <span className="uppercase tracking-[0.14em] text-xs">Dienst</span>
                </div>

                <h2 className="relative mt-5 text-xl font-semibold text-neutral-900 dark:text-white">
                  {service.title}
                </h2>

                <ul className="relative mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-gray-200">
                  <div className="font-semibold text-neutral-900 dark:text-white">Wat we doen:</div>
                  <p>{service.whatWeDo}</p>
                  <div className="pt-1 font-semibold text-neutral-900 dark:text-white">Jij ontvangt:</div>
                  <p>{service.deliverable}</p>
                </div>

                <div className="relative mt-auto pt-6 text-base font-semibold text-neutral-900 dark:text-white">
                  {service.price}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
