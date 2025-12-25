import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ServiceCard from "../components/ServiceCard";
import { useLanguage } from "../context/LanguageContext";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

const content = {
  nl: {
    seo: {
      title: "Measurement – Betrouwbare data als fundament",
      description:
        "Heldere GA4 diensten zonder ruis: van start tot e-commerce. Altijd gericht op betrouwbare data als basis voor groei.",
    },
    hero: {
      title: "Betrouwbare data als fundament voor groei",
      subtitle:
        "Met correcte metingen weet je wat er écht gebeurt op je website — en waar je moet ingrijpen.",
      primaryCta: "Vraag gratis QuickScan aan",
      secondaryCta: "Plan kennismaking",
    },
    problem: {
      title: "Waarom measurement?",
      items: [
        "Onvolledige of foutieve GA4-data",
        "Geen grip op funnel & omzet",
        "Beslissingen op aannames",
      ],
      closing: "Zonder betrouwbare data geen effectieve optimalisatie.",
    },
    services: [
      {
        title: "GA4 Start",
        description: "Basisopzet van GA4 zodat metingen vanaf dag één kloppen.",
        sections: [
          {
            title: "Wat we doen",
            items: [
              "Installatie en configuratie van property & datastream",
              "Filtering van intern verkeer en spam",
              "Koppeling met Search Console en Tag Manager",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Schoon dataprofiel zonder ruis",
              "Inzicht in gedrag en verkeer per kanaal",
              "Basisrapporten die direct bruikbaar zijn",
            ],
          },
        ],
      },
      {
        title: "GA4 Start + Consent",
        description: "Startpakket inclusief AVG-proof consent setup en cookiebanner.",
        sections: [
          {
            title: "Wat we doen",
            items: [
              "Implementatie van moderne, mobile-first cookiebanner",
              "Consent Mode configuratie volgens AVG-richtlijnen",
              "Koppelingen met advertenties en social pixels respecteren keuzes",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Compliance zonder dataverlies waar mogelijk",
              "Heldere brondata voor marketing en rapportages",
              "Transparante user experience rond toestemming",
            ],
          },
        ],
      },
      {
        title: "GA4 Advanced",
        description: "Metingen ingericht op jouw doelen en kritieke interacties.",
        sections: [
          {
            title: "Wat we doen",
            items: [
              "Nieuwe events en conversies afgestemd op business KPI's",
              "Custom rapporten voor journeys en microconversies",
              "Dashboards en alerts voor teamgebruik",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Diepte-inzicht in gedrag over devices",
              "Sneller signaleren van issues of kansen",
              "Beslissingen gebaseerd op actuele, relevante data",
            ],
          },
        ],
      },
      {
        title: "GA4 E-commerce",
        description: "Volledige e-commerce tracking voor conversie en omzetsturing.",
        sections: [
          {
            title: "Wat we doen",
            items: [
              "Enhanced e-commerce events i.s.m. developers of bureau",
              "Afstemming van product-, checkout- en refund-events",
              "Validatie van datalayer en meetplan",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Betrouwbare conversie- en omzetdata",
              "Inzicht in winkelmand, checkout en retourstromen",
              "Sturing op marges, productgroepen en campagnes",
            ],
          },
        ],
      },
    ],
    outcomes: {
      title: "Wat levert dit concreet op",
      items: [
        "Betrouwbare cijfers",
        "Inzicht in gedrag & conversie",
        "Betere beslissingen",
        "Basis voor CRO & groei",
      ],
      cta: "Vraag gratis QuickScan aan",
    },
  },
  en: {
    seo: {
      title: "Measurement – Reliable data as your growth foundation",
      description:
        "Clear GA4 services without noise: from starter setups to e-commerce. Always focused on trustworthy data for growth.",
    },
    hero: {
      title: "Reliable data as the foundation for growth",
      subtitle:
        "With correct measurement you know what really happens on your site — and where to intervene.",
      primaryCta: "Request free QuickScan",
      secondaryCta: "Schedule intro call",
    },
    problem: {
      title: "Why measurement?",
      items: [
        "Incomplete or incorrect GA4 data",
        "No grip on funnel & revenue",
        "Decisions based on assumptions",
      ],
      closing: "Without reliable data there is no effective optimisation.",
    },
    services: [
      {
        title: "GA4 Start",
        description: "Baseline GA4 setup so tracking is accurate from day one.",
        sections: [
          {
            title: "What we do",
            items: [
              "Property and data stream configuration",
              "Filtering internal traffic and spam",
              "Linking Search Console and Tag Manager",
            ],
          },
          {
            title: "What you get",
            items: [
              "Clean data without noise",
              "Behaviour and traffic insights per channel",
              "Ready-to-use core reports",
            ],
          },
        ],
      },
      {
        title: "GA4 Start + Consent",
        description: "Starter package including GDPR-ready consent setup and banner.",
        sections: [
          {
            title: "What we do",
            items: [
              "Implement a modern, mobile-first cookie banner",
              "Configure Consent Mode aligned with GDPR",
              "Ensure ad and social pixels respect user choices",
            ],
          },
          {
            title: "What you get",
            items: [
              "Compliance with minimal data loss",
              "Clear source data for marketing and reporting",
              "Transparent user experience around consent",
            ],
          },
        ],
      },
      {
        title: "GA4 Advanced",
        description: "Tracking tailored to your goals and critical interactions.",
        sections: [
          {
            title: "What we do",
            items: [
              "Configure events and conversions aligned to KPIs",
              "Custom reports for journeys and micro conversions",
              "Dashboards and alerts for the team",
            ],
          },
          {
            title: "What you get",
            items: [
              "Deep insight across devices",
              "Faster signals on issues or opportunities",
              "Decisions grounded in relevant, current data",
            ],
          },
        ],
      },
      {
        title: "GA4 E-commerce",
        description: "Complete e-commerce tracking to steer conversion and revenue.",
        sections: [
          {
            title: "What we do",
            items: [
              "Enhanced e-commerce events with your developers or agency",
              "Align product, checkout and refund events",
              "Validate the data layer and measurement plan",
            ],
          },
          {
            title: "What you get",
            items: [
              "Reliable conversion and revenue data",
              "Insight into cart, checkout and returns",
              "Control over margins, categories and campaigns",
            ],
          },
        ],
      },
    ],
    outcomes: {
      title: "What this delivers",
      items: [
        "Reliable numbers",
        "Insight into behaviour & conversion",
        "Better decisions",
        "Foundation for CRO & growth",
      ],
      cta: "Request free QuickScan",
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

export default function Measurement() {
  const shouldReduceMotion = useReducedMotion();
  const navigateWithTransition = useViewTransitionNavigate();
  const { language } = useLanguage();
  const copy = content[language];

  const primaryCtaLink = { pathname: "/contact", search: "?type=quickscan" };
  const secondaryCtaLink = "/contact";

  const handlePrimaryCtaClick = createViewTransitionClickHandler(
    navigateWithTransition,
    primaryCtaLink
  );
  const handleSecondaryCtaClick = createViewTransitionClickHandler(
    navigateWithTransition,
    secondaryCtaLink
  );

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="measurement-heading"
        className="relative overflow-hidden bg-white pb-24 pt-24"
      >
        <div className="grain-overlay" aria-hidden />

        <section className="site-container">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
            id="measurement-heading"
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
            className="mt-4 max-w-2xl text-lg text-neutral-700 "
          >
            {copy.hero.subtitle}
          </motion.p>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.14, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to={primaryCtaLink}
              className="button-primary"
              onClick={handlePrimaryCtaClick}
            >
              {copy.hero.primaryCta}
            </Link>
            <Link
              to={secondaryCtaLink}
              className="button-secondary"
              onClick={handleSecondaryCtaClick}
            >
              {copy.hero.secondaryCta}
            </Link>
          </motion.div>
        </section>

        <section className="site-container mt-16">
          <div className="rounded-3xl bg-surface-soft p-8 ring-1 ring-neutral-200/80  md:p-10">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              className="text-2xl font-semibold text-neutral-900 "
            >
              {copy.problem.title}
            </motion.h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {copy.problem.items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true }}
                  transition={shouldReduceMotion ? undefined : { delay: 0.05 * index, duration: 0.55 }}
                  className="rounded-2xl bg-white/90 p-4 text-sm font-semibold text-neutral-900 ring-1 ring-neutral-200/80  shadow-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-base font-semibold text-brand-blue ">{copy.problem.closing}</p>
          </div>
        </section>

        <section className="site-container mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 ">Measurement services</h2>
              <p className="mt-2 max-w-2xl text-neutral-700 ">
                {language === "nl"
                  ? "Alle diensten blijven gelijk, nu gepresenteerd op duidelijk resultaat. Kies wat past bij jouw situatie."
                  : "The same services, presented with a clear focus on outcomes. Pick what matches your situation."}
              </p>
            </div>
            <Link
              to={secondaryCtaLink}
              className="button-secondary"
              onClick={handleSecondaryCtaClick}
            >
              {copy.hero.secondaryCta}
            </Link>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {copy.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
              >
                <ServiceCard
                  icon={AnalyticsIcon}
                  title={service.title}
                  description={service.description}
                  sections={service.sections}
                  ctaLabel={language === "nl" ? "Plan kennismaking" : "Schedule intro"}
                  ctaTo={secondaryCtaLink}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="site-container mt-16">
          <div className="rounded-3xl bg-gradient-to-r from-brand-blue/10 via-white to-brand-yellow/10 p-8 ring-1 ring-neutral-200/80  md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 ">{copy.outcomes.title}</h2>
                <ul className="mt-4 grid gap-3 text-base text-neutral-800  md:grid-cols-2">
                  {copy.outcomes.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={primaryCtaLink}
                className="button-primary"
                onClick={handlePrimaryCtaClick}
              >
                {copy.outcomes.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
