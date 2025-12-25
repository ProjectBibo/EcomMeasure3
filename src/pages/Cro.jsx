import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "UX/CRO diensten – expert reviews, analyses & testing",
      description:
        "Drie UX/CRO diensten: expert reviews, kwantitatieve analyses en user testing met duidelijke deliverables en prijzen.",
    },
    hero: {
      heading: "Conversiegerichte verbeteringen zonder ruis",
      subheading:
        "We combineren data-analyse en UX-review om frictie te vinden en direct te vertalen naar optimalisaties.",
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Bekijk aanpak",
    },
    benefits: [
      "Inzicht in frictie in de funnel",
      "Betere UX-beslissingen op basis van data",
      "Focus op quick wins, geen experiment-circus",
    ],
    services: [
      {
        title: "Funnel- & data-analyse",
        intro: "Hard bewijs voor waar gebruikers afhaken en waar omzet weglekt.",
        bullets: [
          "Analyse van GA4, Search Console en onsite gedrag",
          "Segmentatie naar device, bron en intentie",
          "Aanbevolen next steps per kanaal",
        ],
      },
      {
        title: "UX & conversie-audit",
        intro: "Compacte review van flows, messaging en vertrouwen.",
        bullets: [
          "Expert review van kritieke journeys",
          "Heuristieken en best practices voor e-commerce",
          "Prioriteitenlijst met quick wins",
        ],
      },
      {
        title: "Gedragsanalyse (GA4, heatmaps, recordings)",
        intro: "Kwantitatieve en kwalitatieve inzichten gecombineerd.",
        bullets: [
          "Click- en scrollgedrag per template",
          "Verhitte elementen versus dode zones",
          "Observaties vertaald naar hypotheses",
        ],
      },
      {
        title: "Prioriteiten & optimalisatie-roadmap",
        intro: "Van inzicht naar uitvoering met heldere volgorde.",
        bullets: [
          "Impact/effort scoring op verbeterideeën",
          "Roadmap voor 90 dagen optimalisatie",
          "Bewaking van voortgang en learnings",
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
      title: "UX/CRO services – expert reviews, analysis & testing",
      description:
        "Three UX/CRO services: expert reviews, quantitative analyses and user testing with clear deliverables and pricing.",
    },
    hero: {
      heading: "Conversion-focused improvements without the noise",
      subheading:
        "We combine data analysis and UX review to uncover friction and translate it into concrete optimisations.",
      primaryCta: "Schedule an intro call",
      secondaryCta: "View our approach",
    },
    benefits: [
      "Visibility on funnel friction",
      "Better UX decisions grounded in data",
      "Focus on quick wins, not endless experiments",
    ],
    services: [
      {
        title: "Funnel & data analysis",
        intro: "Hard evidence on where users drop off and revenue leaks.",
        bullets: [
          "Analysis of GA4, Search Console and on-site behaviour",
          "Segmentation by device, source and intent",
          "Recommended next steps per channel",
        ],
      },
      {
        title: "UX & conversion audit",
        intro: "Concise review of flows, messaging and trust.",
        bullets: [
          "Expert review of critical journeys",
          "Heuristics and best practices for ecommerce",
          "Prioritised quick-win list",
        ],
      },
      {
        title: "Behaviour analysis (GA4, heatmaps, recordings)",
        intro: "Quantitative and qualitative insights combined.",
        bullets: [
          "Click and scroll behaviour per template",
          "Hot elements versus dead zones",
          "Observations translated into hypotheses",
        ],
      },
      {
        title: "Priorities & optimisation roadmap",
        intro: "From insights to action with clear sequencing.",
        bullets: [
          "Impact/effort scoring on improvements",
          "90-day optimisation roadmap",
          "Progress tracking and learnings",
        ],
      },
    ],
    ctaSection: {
      heading: "Ready to make better decisions with reliable data?",
      cta: "Book a free introduction",
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

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <>
      <SEO title={content.seo.title} description={content.seo.description} />
      <main className="bg-surface-soft pb-24 pt-24">
        <div className="grain-overlay" aria-hidden />

        <section className="relative">
          <div className="site-container grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center">
            <div className="space-y-6">
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
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
                  <CroIcon />
                  <div>
                    <p className="text-sm font-semibold text-brand-blue">UX + data</p>
                    <p className="text-sm text-neutral-600">Focust op frictie en kansen binnen je belangrijkste journeys.</p>
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
                      ? "Scherpe inzichten zonder eindeloze experimenten of dikke rapporten."
                      : "Sharp insights without endless experiments or heavy reports."}
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
              {language === "nl" ? "CRO met focus op actie" : "Actionable CRO services"}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
              {language === "nl"
                ? "Geen experiment-circus, wel duidelijke inzichten en next steps die conversie verhogen."
                : "No experiment circus—just clear insights and next steps that lift conversion."}
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
                  <CroIcon />
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand-blue/80">
                    {language === "nl" ? "Optimalisatie" : "Optimisation"}
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
                    {language === "nl" ? "Ontdek hoe we helpen" : "Discover how we help"}
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
                  ? "We combineren data en UX om je funnel blijvend te verbeteren."
                  : "We pair data and UX to steadily improve your funnel."}
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
