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
      title: "CRO – Van inzicht naar gerichte optimalisatie",
      description:
        "UX-gedreven CRO: expert reviews, kwantitatieve analyses en user testing. Duidelijke deliverables, geen test-fabriek.",
    },
    hero: {
      title: "Van inzicht naar gerichte optimalisatie",
      subtitle: "CRO begint bij begrijpen wat gebruikers doen — en waarom.",
      primaryCta: "Plan kennismaking",
      secondaryCta: "Vraag QuickScan aan",
    },
    approach: {
      title: "Hoe wij CRO benaderen",
      body:
        "Wij doen geen testen om te testen. We analyseren gedrag, signaleren knelpunten en adviseren verbeteringen die écht impact hebben.",
    },
    services: [
      {
        title: "UX Expert Review (kwalitatief)",
        description: "Snelle, scherpe analyse van flows en pagina's door UX-specialist.",
        sections: [
          {
            title: "Wat we onderzoeken",
            items: [
              "Cruciale journeys, micro-interacties en formulieren",
              "9 universele UX-aandachtsgebieden",
              "±150 checkpoints afgestemd op jouw sector",
            ],
          },
          {
            title: "Wat je ontvangt",
            items: [
              "PDF-rapport met bevindingen en voorbeelden",
              "Heldere topprioriteiten per journey",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Direct zicht op fricties",
              "Snel toepasbare verbeteringen zonder groot project",
            ],
          },
        ],
      },
      {
        title: "Kwantitatieve analyse",
        description: "Data-gedreven inzicht in groeidrivers en drempels.",
        sections: [
          {
            title: "Wat we onderzoeken",
            items: [
              "Gedrag in GA4 per segment en device",
              "Heatmaps, scroll- en clickdata",
              "Zoek- en trafficpatronen die conversie beïnvloeden",
            ],
          },
          {
            title: "Wat je ontvangt",
            items: [
              "Presentatie met prioriteitenlijst",
              "Aanbevelingen gekoppeld aan business KPI's",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Onderbouwde keuzes voor roadmap",
              "Duidelijke focus op impactvolle verbeteringen",
            ],
          },
        ],
      },
      {
        title: "User testing customer journey",
        description: "Genormeerde tests met echte gebruikers, remote of on-site.",
        sections: [
          {
            title: "Wat we onderzoeken",
            items: [
              "Volledige journey op desktop én mobiel",
              "Taak-scenario's met meetbare doelen",
              "Observaties en quotes per stap",
            ],
          },
          {
            title: "Wat je ontvangt",
            items: [
              "Video's, notities en samenvattende presentatie",
              "Actielijst met prioriteiten en owners",
            ],
          },
          {
            title: "Wat het oplevert",
            items: [
              "Minder discussie, meer richting",
              "Verbeteringen die aansluiten op wat klanten willen",
            ],
          },
        ],
      },
    ],
    results: {
      title: "Resultaat & vertrouwen",
      items: [
        "Duidelijke prioriteiten",
        "Onderbouwde keuzes",
        "Minder discussie, meer richting",
        "Betere conversie-basis",
      ],
      cta: "Plan kennismaking",
    },
  },
  en: {
    seo: {
      title: "CRO – From insight to targeted optimisation",
      description:
        "UX-led CRO: expert reviews, quantitative analysis and user testing. Clear deliverables, no test factory.",
    },
    hero: {
      title: "From insight to targeted optimisation",
      subtitle: "CRO starts with understanding what users do — and why.",
      primaryCta: "Schedule intro call",
      secondaryCta: "Request QuickScan",
    },
    approach: {
      title: "How we approach CRO",
      body:
        "We don't test for the sake of testing. We analyse behaviour, spot friction and advise improvements that create real impact.",
    },
    services: [
      {
        title: "UX Expert Review (qualitative)",
        description: "Fast, sharp assessment of flows and pages by a UX specialist.",
        sections: [
          {
            title: "What we examine",
            items: [
              "Critical journeys, micro-interactions and forms",
              "9 universal UX focus areas",
              "Around 150 checkpoints tailored to your industry",
            ],
          },
          {
            title: "What you receive",
            items: [
              "PDF report with findings and examples",
              "Clear top priorities per journey",
            ],
          },
          {
            title: "What it delivers",
            items: [
              "Instant view of friction",
              "Actionable improvements without a big project",
            ],
          },
        ],
      },
      {
        title: "Quantitative analysis",
        description: "Data-driven insight into growth drivers and blockers.",
        sections: [
          {
            title: "What we examine",
            items: [
              "Behaviour in GA4 by segment and device",
              "Heatmaps, scroll and click data",
              "Search and traffic patterns influencing conversion",
            ],
          },
          {
            title: "What you receive",
            items: [
              "Presentation with prioritised recommendations",
              "Advice linked to your business KPIs",
            ],
          },
          {
            title: "What it delivers",
            items: [
              "Evidence-based roadmap choices",
              "Clear focus on high-impact improvements",
            ],
          },
        ],
      },
      {
        title: "User testing customer journey",
        description: "Standardised tests with real users, remote or on-site.",
        sections: [
          {
            title: "What we examine",
            items: [
              "Full journey across desktop and mobile",
              "Task scenarios with measurable objectives",
              "Observations and quotes for each step",
            ],
          },
          {
            title: "What you receive",
            items: [
              "Recordings, notes and a summary deck",
              "Action list with priorities and owners",
            ],
          },
          {
            title: "What it delivers",
            items: [
              "Less debate, more direction",
              "Improvements aligned with what customers need",
            ],
          },
        ],
      },
    ],
    results: {
      title: "Outcome & confidence",
      items: [
        "Clear priorities",
        "Evidence-based decisions",
        "Less discussion, more direction",
        "Stronger conversion foundation",
      ],
      cta: "Schedule intro call",
    },
  },
};

const CroIcon = () => (
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
    <path d="M6 20l4-6 5 8 5-10 6 12" />
    <path d="M4 26h24" />
    <path d="M8 6h3v3H8z" className="fill-current/15" />
    <path d="M14.5 8.5h3v3h-3z" className="fill-current/15" />
    <path d="M22 4h3v3h-3z" className="fill-current/15" />
  </svg>
);

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const navigateWithTransition = useViewTransitionNavigate();
  const { language } = useLanguage();
  const copy = content[language];

  const primaryCtaLink = "/contact";
  const secondaryCtaLink = { pathname: "/contact", search: "?type=quickscan" };

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
      <main className="relative overflow-hidden bg-white pb-24 pt-24   ">
        <div className="grain-overlay" aria-hidden />

        <section className="site-container">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
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
            <h2 className="text-2xl font-semibold text-neutral-900 ">{copy.approach.title}</h2>
            <p className="mt-4 max-w-3xl text-base text-neutral-700 ">{copy.approach.body}</p>
          </div>
        </section>

        <section className="site-container mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 ">CRO services</h2>
              <p className="mt-2 max-w-2xl text-neutral-700 ">
                {language === "nl"
                  ? "Dezelfde diensten, nu gepresenteerd op onderzoeksvragen, deliverables en resultaat."
                  : "The same services, presented through research focus, deliverables and outcomes."}
              </p>
            </div>
            <Link
              to={primaryCtaLink}
              className="button-secondary"
              onClick={handlePrimaryCtaClick}
            >
              {copy.hero.primaryCta}
            </Link>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
              >
                <ServiceCard
                  icon={CroIcon}
                  title={service.title}
                  description={service.description}
                  sections={service.sections}
                  ctaLabel={copy.hero.primaryCta}
                  ctaTo={primaryCtaLink}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="site-container mt-16">
          <div className="rounded-3xl bg-gradient-to-r from-brand-blue/10 via-white to-brand-yellow/10 p-8 ring-1 ring-neutral-200/80  md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 ">{copy.results.title}</h2>
                <ul className="mt-4 grid gap-3 text-base text-neutral-800  md:grid-cols-2">
                  {copy.results.items.map((item) => (
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
                {copy.results.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
