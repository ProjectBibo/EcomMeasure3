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
    label: "Start plus AVG-compatible cookiebanner",
    title: "Google Analytics 4 ‘Start plus AVG-compatible cookiebanner’",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Koppelen van uw website met Social Media en Google Ads (Facebook Ads e.a. pixels & tracking)",
      "AVG-compatible integratie met een moderne, mobile-first cookiebanner",
    ],
    price: "Vanaf €440 (ex btw)",
  },
  {
    label: "Advanced",
    title: "Google Analytics 4 ‘Advanced’ installatie en configuratie",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Inrichten van nieuwe gebeurtenissen en conversies conform zakelijke doelen (leads, clicks on calls, downloads, etc.)",
      "Personaliseren van GA4 interface",
    ],
    price: "Vanaf €440 (ex btw)",
  },
  {
    label: "E-commerce",
    title: "Google Analytics 4 ‘E-commerce’ installatie en configuratie",
    subcopy: "Alles van het Startpakket, plus:",
    bullets: [
      "Inrichten Enhanced e-commerce conversies (i.s.m. uw developer of webbureau bij zelf ontworpen systemen)",
      "Personaliseren van GA4 interface",
    ],
    price: "Vanaf €880 (ex btw)",
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
    <rect
      x="6"
      y="10"
      width="36"
      height="28"
      rx="6"
      className="fill-white/70 stroke-current"
      strokeWidth="2.4"
    />
    <path
      d="M16 24L21 29L32 18"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="18" r="2" className="fill-current" />
    <circle cx="26" cy="28" r="2" className="fill-current" />
  </svg>
);

export default function Measurement() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const seoTitle =
    language === "nl"
      ? "Measurement – Analytics diensten"
      : "Measurement – Analytics services";
  const seoDescription =
    language === "nl"
      ? "Overzicht van onze GA4 installaties, cookiebanners en e-commerce configuraties."
      : "Overview of our GA4 setups, cookie banner support and e-commerce configurations.";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      <main
        role="main"
        aria-labelledby="analytics-services-title"
        className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20"
      >
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
            id="analytics-services-title"
            className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            Analytics diensten
          </motion.h1>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.55 }}
                className="group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
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
                  <span className="uppercase tracking-[0.14em] text-xs">{service.label}</span>
                </div>

                <h2 className="relative mt-5 text-xl font-semibold text-neutral-900 dark:text-white">
                  {service.title}
                </h2>

                {service.subcopy && (
                  <p className="relative mt-3 text-sm font-medium text-neutral-700 dark:text-gray-200">
                    {service.subcopy}
                  </p>
                )}

                <ul className="relative mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 pt-4 text-base font-semibold text-neutral-900 dark:text-white">
                  {service.price}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
