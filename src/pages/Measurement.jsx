import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = {
  nl: {
    seo: {
      title: "Analytics diensten – GA4 installatie & configuratie",
      description:
        "Vier GA4 pakketten: van startinstallatie tot advanced en e-commerce configuraties, inclusief AVG-compatibele cookiebanner.",
    },
    heading: "Analytics diensten",
    cards: [
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
    ],
  },
  en: {
    seo: {
      title: "Analytics services – GA4 setup & configuration",
      description:
        "Four GA4 packages: from starter installs to advanced and e-commerce configurations, including a GDPR-friendly cookie banner.",
    },
    heading: "Analytics services",
    cards: [
      {
        label: "Starter package",
        title: "Google Analytics 4 ‘Start’ setup and configuration",
        bullets: [
          "Installation on your website",
          "Property & data stream configuration",
          "Filtering internal traffic",
          "Linking Google Search Console & GTM",
          "Walk-through and handover (0.5h)",
        ],
        price: "From €220 (ex VAT)",
      },
      {
        title: "Google Analytics 4 ‘Start plus GDPR-ready cookie banner’",
        subcopy: "Everything in Start, plus:",
        bullets: [
          "Connecting your site with social media and Google Ads (Facebook Ads and other pixels & tracking)",
          "GDPR-compatible integration with a modern, mobile-first cookie banner",
        ],
        price: "From €440 (ex VAT)",
      },
      {
        title: "Google Analytics 4 ‘Advanced’ setup and configuration",
        subcopy: "Everything in Start, plus:",
        bullets: [
          "Configuring new events and conversions aligned to business goals (leads, click-to-call, downloads, etc.)",
          "Personalising the GA4 interface",
        ],
        price: "From €440 (ex VAT)",
      },
      {
        title: "Google Analytics 4 ‘E-commerce’ setup and configuration",
        subcopy: "Everything in Start, plus:",
        bullets: [
          "Implementing enhanced e-commerce conversions (with your developer or agency for custom platforms)",
          "Personalising the GA4 interface",
        ],
        price: "From €880 (ex VAT)",
      },
    ],
  },
};

const AnalyticsIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-10 w-10 text-brand-blue"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 22v4" />
    <path d="M12 16v10" />
    <path d="M18 10v16" />
    <path d="M24 6v20" />
    <path d="M4 26h24" />
    <circle cx="6" cy="14" r="2" className="fill-current/15" />
    <circle cx="12" cy="10" r="2" className="fill-current/15" />
    <circle cx="18" cy="14" r="2" className="fill-current/15" />
    <circle cx="24" cy="8" r="2" className="fill-current/15" />
  </svg>
);

export default function Measurement() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = services[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="measurement-heading"
        className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20"
      >
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
            id="measurement-heading"
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            {copy.heading}
          </motion.h1>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {copy.cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
                className="group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
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
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
                    <AnalyticsIcon />
                  </div>
                  {card.label && (
                    <span className="w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                      {card.label}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold leading-tight text-neutral-900 dark:text-white">{card.title}</h2>
                  {card.subcopy && (
                    <p className="text-sm font-medium text-brand-blue dark:text-brand-teal">{card.subcopy}</p>
                  )}
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-gray-300">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-neutral-200/70 pt-4 text-sm font-semibold text-neutral-900 dark:border-white/10 dark:text-white">
                  <span>{card.price}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
