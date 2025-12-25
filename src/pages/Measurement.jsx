import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Measurement diensten – betrouwbare data zonder ruis",
      description:
        "Wij richten je meetstack zo in dat je kunt vertrouwen op je data: GA4, server-side tagging, Consent Mode en dashboards die beslissingen versnellen.",
    },
    hero: {
      eyebrow: "Measurement",
      title: "Betrouwbaar meten als fundament voor groei",
      subtitle:
        "Wij richten je meetstack zo in dat je kunt vertrouwen op je data — van GA4 tot server-side en dashboards.",
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Bekijk aanpak",
    },
    benefits: [
      {
        title: "Inzicht in wat écht bijdraagt aan omzet",
        description: "Heldere flows en dashboards laten zien welke kanalen en journeys waarde leveren.",
      },
      {
        title: "Data conform AVG & Consent Mode",
        description: "Privacy by design set-up zodat je compliant blijft en toch kunt optimaliseren.",
      },
      {
        title: "Minder ruis, meer beslissingen",
        description: "Eenduidige events, meetplannen en naming zorgen dat teams sneller kunnen schakelen.",
      },
    ],
    services: [
      {
        title: "GA4 & GTM setup",
        description: "Een solide basis die direct betrouwbare events oplevert.",
        bullets: [
          "GA4 property, datastreams en kwaliteitsfilters",
          "GTM container met essentials en nette naming",
          "Conversies afgestemd op jullie doelen",
          "Snelle overdracht en documentatie",
        ],
      },
      {
        title: "Enhanced e-commerce tracking",
        description: "Volledige salesfunnel en productinteracties in kaart.",
        bullets: [
          "Product-, listing- en checkout-events ingericht",
          "Meetplan en tagging afgestemd met development",
          "Debugging en validatie van datalayers",
          "Rapportage van conversiepunten en marges",
        ],
      },
      {
        title: "Server-side tagging",
        description: "Schaalbare tagging zonder afhankelijkheid van browsers.",
        bullets: [
          "Servercontainer opgezet en verbonden met GA4",
          "Consentvriendelijke datastromen en IP-anonimisering",
          "Performance- en datakwaliteit checks",
          "Monitoring voor betrouwbare events",
        ],
      },
      {
        title: "Consent Mode & AVG inrichting",
        description: "Privacy-proof meten met behoud van inzichten.",
        bullets: [
          "CMP-integratie en Consent Mode v2 signalen",
          "Data minimalisatie en richtlijnen per vendor",
          "Controle op datadoorgifte en beleid",
          "Heldere uitleg voor marketing en legal",
        ],
      },
      {
        title: "Dashboards & KPI-structuur",
        description: "Dashboards die direct tot actie leiden.",
        bullets: [
          "KPI-framework en meetplan afgestemd op doelen",
          "Looker Studio dashboards met alerts",
          "Periodieke QA en sanity checks",
          "Overdracht zodat teams zelf kunnen sturen",
        ],
      },
    ],
    closing: {
      title: "Klaar om betere beslissingen te nemen op basis van data?",
      cta: "Plan een vrijblijvende kennismaking",
    },
  },
  en: {
    seo: {
      title: "Measurement services – reliable data without noise",
      description:
        "We design your measurement stack so you can trust your data: GA4, server-side tagging, Consent Mode and dashboards that drive decisions.",
    },
    hero: {
      eyebrow: "Measurement",
      title: "Measurement you can rely on",
      subtitle:
        "We configure your stack so you can trust your data — from GA4 to server-side tagging and decision-ready dashboards.",
      primaryCta: "Book an intro call",
      secondaryCta: "See our approach",
    },
    benefits: [
      {
        title: "Clarity on what drives revenue",
        description: "Clean dashboards reveal which channels and journeys actually deliver value.",
      },
      {
        title: "Privacy-first & Consent Mode ready",
        description: "Privacy-by-design setup keeps you compliant while enabling optimisation.",
      },
      {
        title: "Less noise, faster decisions",
        description: "Consistent events, plans and naming so teams can act with confidence.",
      },
    ],
    services: [
      {
        title: "GA4 & GTM setup",
        description: "A solid foundation that produces reliable events from day one.",
        bullets: [
          "GA4 property, data streams and quality filters",
          "GTM container with essentials and clean naming",
          "Conversions aligned to your goals",
          "Fast handover with documentation",
        ],
      },
      {
        title: "Enhanced e-commerce tracking",
        description: "Map the full sales funnel and product interactions.",
        bullets: [
          "Product, listing and checkout events configured",
          "Measurement plan and tagging aligned with devs",
          "Debugging and validation of data layers",
          "Reporting on conversion points and margins",
        ],
      },
      {
        title: "Server-side tagging",
        description: "Scalable tagging without relying on browsers.",
        bullets: [
          "Server container set up and linked to GA4",
          "Consent-friendly data flows and IP anonymisation",
          "Performance and data quality checks",
          "Monitoring to keep events trustworthy",
        ],
      },
      {
        title: "Consent Mode & GDPR setup",
        description: "Privacy-proof measurement while keeping insight.",
        bullets: [
          "CMP integration and Consent Mode v2 signals",
          "Data minimisation and vendor-specific guidance",
          "Checks on data transfer and policies",
          "Clear enablement for marketing and legal",
        ],
      },
      {
        title: "Dashboards & KPI structure",
        description: "Dashboards that lead straight to action.",
        bullets: [
          "KPI framework and measurement plan",
          "Looker Studio dashboards with alerts",
          "Periodic QA and sanity checks",
          "Handover so teams can steer themselves",
        ],
      },
    ],
    closing: {
      title: "Ready to make better decisions with trusted data?",
      cta: "Book a discovery call",
    },
  },
};

const CheckIcon = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5 text-brand-blue"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

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
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="measurement-heading"
        className="relative overflow-hidden bg-surface-soft pb-24 pt-28"
      >
        <div className="grain-overlay" aria-hidden />

        <section className="relative site-container grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue ring-1 ring-brand-blue/10">
              {copy.hero.eyebrow}
            </div>
            <h1
              id="measurement-heading"
              className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
            >
              {copy.hero.title}
            </h1>
            <p className="text-lg leading-relaxed text-neutral-700 text-max-width">
              {copy.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a className="button-primary" href="/contact">
                {copy.hero.primaryCta}
              </a>
              <a className="button-secondary" href="#services">
                {copy.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65, delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/10 via-white to-amber-100/60 p-8 ring-1 ring-neutral-200"
            aria-hidden
          >
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-12 h-36 w-36 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="relative flex flex-col gap-6 text-neutral-800">
              <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-brand-blue ring-1 ring-white/60">
                <AnalyticsIcon />
                <span>{language === "nl" ? "Meetstack zonder ruis" : "Noise-free measurement"}</span>
              </div>
              <p className="text-lg font-semibold text-neutral-900">
                {language === "nl"
                  ? "Van property tot dashboard: elke stap is afgestemd op betrouwbare beslissingen."
                  : "From property to dashboard, every layer is tuned for trustworthy decisions."}
              </p>
              <ul className="space-y-3 text-sm text-neutral-700">
                {[
                  language === "nl" ? "Heldere events en naming" : "Clear events and naming",
                  language === "nl" ? "Consentvriendelijke implementatie" : "Consent-friendly implementation",
                  language === "nl" ? "Snelle validatie en overdracht" : "Fast validation and handover",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-blue" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="site-container mt-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              {language === "nl" ? "Voordelen" : "Benefits"}
            </p>
            <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {language === "nl" ? "Wat je direct merkt" : "What you notice first"}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {copy.benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.05 * index, duration: 0.5 }}
                className="flex items-start gap-4 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-neutral-200"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/15">
                  <CheckIcon />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-neutral-900">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-700">{benefit.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="site-container mt-20 space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
              {language === "nl" ? "Diensten" : "Services"}
            </p>
            <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {language === "nl"
                ? "Compacte pakketten met directe impact"
                : "Lean packages with immediate impact"}
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 text-max-width">
              {language === "nl"
                ? "Geen overload aan opties, wel precies wat nodig is om je meetstack betrouwbaar te maken."
                : "No overload of options—just what you need to make measurement reliable."}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.06 * index, duration: 0.55 }}
                className="flex h-full flex-col justify-between rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-neutral-200"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/15">
                    <AnalyticsIcon />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-700">{service.description}</p>
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a className="button-primary" href="/contact">
                    {language === "nl" ? "Plan een kennismaking" : "Book an intro call"}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="site-container mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-blue/90 via-brand-blue to-brand-blue/80 px-8 py-10 text-white shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" aria-hidden />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 max-w-2xl">
                <h2 className="text-2xl font-semibold sm:text-3xl">{copy.closing.title}</h2>
                <p className="text-base text-white/85">
                  {language === "nl"
                    ? "We laten je in één sessie zien waar de grootste winst ligt."
                    : "In one session we’ll show you where the biggest gains are."}
                </p>
              </div>
              <a className="button-primary bg-white text-brand-blue shadow-md" href="/contact">
                {copy.closing.cta}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
