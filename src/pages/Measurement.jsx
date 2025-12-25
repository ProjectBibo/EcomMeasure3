import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = [
  {
    label: "Startpakket",
    title: "Google Analytics 4 ‘Start’ installatie en configuratie",
    bullets: [
      "Installatie op uw website",
      "Configuratie van Property & datastream",
      "Filteren van intern bezoek",
      "Koppelen van Google Search Console & GTM",
      "Uitleg en walk-through (0.5u)",
    ],
    price: "Vanaf €220 (ex btw)",
  },
  {
    title: "Google Analytics 4 ‘Start plus AVG-compatible cookiebanner’",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Koppelen van uw website met Social Media en Google Ads (Facebook Ads e.a. pixels & tracking)",
      "AVG-compatible integratie met een moderne, mobile-first cookiebanner",
    ],
    price: "Vanaf €440 (ex btw)",
  },
  {
    title: "Google Analytics 4 ‘Advanced’ installatie en configuratie",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Inrichten van nieuwe gebeurtenissen en conversies conform zakelijke doelen (leads, clicks on calls, downloads, etc.)",
      "Personaliseren van GA4 interface",
    ],
    price: "Vanaf €440 (ex btw)",
  },
  {
    title: "Google Analytics 4 ‘E-commerce’ installatie en configuratie",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Inrichten Enhanced e-commerce conversies (i.s.m. uw developer of webbureau bij zelf ontworpen systemen)",
      "Personaliseren van GA4 interface",
    ],
    price: "Vanaf €880 (ex btw)",
  },
];

const content = {
  nl: {
    seo: {
      title: "Analytics diensten – Google Analytics 4 implementaties",
      description:
        "Vier GA4 pakketten met installatie, configuratie en AVG-compatible integraties die direct klaar zijn voor gebruik.",
    },
    heading: "Analytics diensten",
  },
  en: {
    seo: {
      title: "Analytics services – Google Analytics 4 implementations",
      description:
        "Four GA4 service packages covering setup, configuration and privacy-friendly integrations ready to launch.",
    },
    heading: "Analytics diensten",
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
      <path d="M4 13c3.5-1 6.5-3 8-7 1.5 4 4.5 6 8 7" />
      <path d="M4 17c3.5-1 6.5-3 8-7 1.5 4 4.5 6 8 7" />
      <path d="M4 9h.01" />
      <path d="M20 9h.01" />
    </svg>
  </span>
);

export default function Measurement() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const copy = content[language] || content.nl;

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="measurement-heading"
        className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20"
      >
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.h1
            id="measurement-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
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
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
                style={{
                  boxShadow:
                    "20px 30px 80px rgba(15,23,42,0.18), inset 0 0 0 rgba(0,0,0,0)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <div className="relative flex flex-col gap-4">
                  <CardIcon />
                  {service.label && (
                    <span className="inline-flex w-fit items-center rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                      {service.label}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{service.title}</h2>
                  {service.subcopy && (
                    <p className="text-sm font-medium text-brand-blue dark:text-brand-teal">{service.subcopy}</p>
                  )}
                  <ul className="flex flex-1 list-outside flex-col gap-2 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-6 text-sm font-semibold text-neutral-900 dark:text-white">
                  Prijs: {service.price}
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
