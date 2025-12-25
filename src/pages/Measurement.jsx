import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Analytics diensten – GA4 installatie & configuratie",
      description:
        "Vier GA4 pakketten: van startinstallatie tot advanced en e-commerce configuraties, inclusief AVG-compatibele cookiebanner.",
    },
    hero: {
      heading: "Betrouwbaar meten als fundament voor groei",
      subheading:
        "Wij richten je meetstack zo in dat je kunt vertrouwen op je data — van GA4 tot server-side en dashboards.",
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Bekijk aanpak",
    },
    benefits: [
      "Inzicht in wat écht bijdraagt aan omzet",
      "Data conform AVG & Consent Mode",
      "Minder ruis, meer beslissingen",
    ],
    services: [
      {
        title: "GA4 & GTM setup",
        intro: "Een solide basis waarmee je data direct bruikbaar is.",
        bullets: [
          "Scherpe event- en conversieconfiguratie",
          "Schaalbare tagging in GTM",
          "Heldere naming conventions",
        ],
      },
      {
        title: "Enhanced e-commerce tracking",
        intro: "Volledige commerce journeys inzichtelijk zonder overbodige events.",
        bullets: [
          "Product- en checkoutflows in kaart",
          "Betrouwbare revenue- en funneldata",
          "Validatie met datalayer checks",
        ],
      },
      {
        title: "Server-side tagging",
        intro: "Sneller laden en meer controle over je datasets.",
        bullets: [
          "Opzet van server-side container",
          "Dataminimalisatie en betere datakwaliteit",
          "Monitoring en logging ingericht",
        ],
      },
      {
        title: "Consent Mode & AVG inrichting",
        intro: "Privacy by design zonder concessies op inzicht.",
        bullets: [
          "Consent Mode V2 configuratie",
          "CMP-koppeling en governance",
          "Dataminimalisatie volgens AVG",
        ],
      },
      {
        title: "Dashboards & KPI-structuur",
        intro: "Van ruwe data naar stuurinformatie voor teams.",
        bullets: [
          "KPI-framework en meetplan",
          "Dashboarding in Looker Studio of BI",
          "Training en overdracht",
        ],
      },
    ],
    ctaSection: {
      heading: "Klaar om betere beslissingen te nemen op basis van data?",
      cta: "Plan een vrijblijvende kennismaking",
    },
  },
  en: {
    seo: {
      title: "Analytics services – GA4 setup & configuration",
      description:
        "Four GA4 packages: from starter installs to advanced and e-commerce configurations, including a GDPR-friendly cookie banner.",
    },
    hero: {
      heading: "Reliable measurement as the foundation for growth",
      subheading:
        "We design your measurement stack so you can trust your data — from GA4 to server-side tagging and dashboards.",
      primaryCta: "Schedule an intro call",
      secondaryCta: "View our approach",
    },
    benefits: [
      "Clarity on what truly drives revenue",
      "Data aligned with GDPR & Consent Mode",
      "Less noise, faster decisions",
    ],
    services: [
      {
        title: "GA4 & GTM setup",
        intro: "A solid foundation that makes your data usable from day one.",
        bullets: [
          "Sharp event and conversion configuration",
          "Scalable tagging in GTM",
          "Clear naming conventions",
        ],
      },
      {
        title: "Enhanced e-commerce tracking",
        intro: "Full visibility on commerce journeys without clutter.",
        bullets: [
          "Mapped product and checkout flows",
          "Reliable revenue and funnel data",
          "Validation with data layer checks",
        ],
      },
      {
        title: "Server-side tagging",
        intro: "Faster performance with more control over your datasets.",
        bullets: [
          "Server-side container setup",
          "Data minimisation and better quality",
          "Monitoring and logging in place",
        ],
      },
      {
        title: "Consent Mode & GDPR setup",
        intro: "Privacy by design without losing visibility.",
        bullets: [
          "Consent Mode V2 configuration",
          "CMP integration and governance",
          "Data minimisation compliant with GDPR",
        ],
      },
      {
        title: "Dashboards & KPI structure",
        intro: "Turning raw data into decision-ready insights.",
        bullets: [
          "KPI framework and measurement plan",
          "Dashboards in Looker Studio or BI",
          "Training and handover",
        ],
      },
    ],
    ctaSection: {
      heading: "Ready to make better decisions with reliable data?",
      cta: "Book a free introduction",
    },
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

const CheckIcon = () => (
  <span
    aria-hidden
    className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 00-1.408-1.42l-6.3 6.25-2.292-2.27a1 1 0 10-1.408 1.42l3 2.97a1 1 0 001.408 0l7-6.95z"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

export default function Measurement() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <>
      <SEO title={content.seo.title} description={content.seo.description} />
      <main role="main" aria-labelledby="measurement-heading" className="bg-surface-soft pb-24 pt-24">
        <div className="grain-overlay" aria-hidden />

        <section className="relative">
          <div className="site-container grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
            <div className="space-y-6">
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
                id="measurement-heading"
                className="text-balance max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
              >
                {content.hero.heading}
              </motion.h1>
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-700">{content.hero.subheading}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark"
                  href="/contact"
                >
                  {content.hero.primaryCta}
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-900 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                  href="#services"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-brand-blue/10 via-white to-brand-yellow/20 p-8 shadow-[0_22px_65px_-20px_rgba(0,0,0,0.18)] ring-1 ring-neutral-200">
              <div className="flex h-full flex-col justify-between gap-6 text-neutral-800">
                <div className="flex items-center gap-3">
                  <AnalyticsIcon />
                  <div>
                    <p className="text-sm font-semibold text-brand-blue">Data-first aanpak</p>
                    <p className="text-sm text-neutral-600">Meetstack ingericht voor betrouwbaarheid en schaal.</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-neutral-700">
                  <p className="font-semibold text-neutral-900">Waar we op sturen</p>
                  <ul className="space-y-2">
                    {content.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container mt-16">
          <div className="grid gap-6 md:grid-cols-2">
            {content.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-4 rounded-2xl bg-white/80 p-6 shadow-[0_16px_45px_-24px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200"
              >
                <CheckIcon />
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">{benefit}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-700">
                    {language === "nl"
                      ? "Concreet inzicht zonder overbodige dashboards of metrics die niet bijdragen."
                      : "Concrete clarity without unnecessary dashboards or metrics that don’t add value."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="site-container mt-20 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
              {language === "nl" ? "Diensten" : "Services"}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-neutral-900">
              {language === "nl" ? "Gerichte analytics pakketten" : "Focused analytics packages"}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
              {language === "nl"
                ? "Compacte trajecten die jouw team sneller laten sturen op betrouwbare inzichten."
                : "Compact engagements that help your team act faster on reliable insights."}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {content.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
                className="group flex h-full flex-col rounded-3xl bg-white/80 p-7 shadow-[0_18px_55px_-28px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200"
              >
                <div className="flex items-center gap-3 text-brand-blue">
                  <AnalyticsIcon />
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue/80">
                    {language === "nl" ? "Measurement" : "Measurement"}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-700">{service.intro}</p>
                  <ul className="space-y-2 text-sm leading-relaxed text-neutral-800">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckIcon />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark"
                    href="/contact"
                  >
                    {language === "nl" ? "Plan een kennismaking" : "Schedule an intro"}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="site-container mt-20">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/10 via-white to-brand-yellow/20 p-10 text-center shadow-[0_20px_65px_-30px_rgba(0,0,0,0.45)] ring-1 ring-neutral-200">
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold text-neutral-900">{content.ctaSection.heading}</h2>
              <p className="text-base leading-relaxed text-neutral-700">
                {language === "nl"
                  ? "We denken mee over een meetstack die vandaag werkt en morgen schaalbaar blijft."
                  : "We help design a measurement stack that works today and scales for tomorrow."}
              </p>
              <div className="flex justify-center">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark"
                  href="/contact"
                >
                  {content.ctaSection.cta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
