import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "CRO & UX optimalisatie – inzichten zonder experiment-circus",
      description:
        "Ontdek frictie in je funnel, maak betere UX-beslissingen op basis van data en krijg een roadmap met quick wins zonder A/B-test overload.",
    },
    hero: {
      eyebrow: "CRO & UX",
      title: "Optimaliseren zonder ruis",
      subtitle:
        "We combineren funnelanalyse en gedragsonderzoek tot een duidelijke roadmap — geen experiment-circus, wel beslissingen op data.",
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Bekijk aanpak",
    },
    benefits: [
      {
        title: "Inzicht in frictie in de funnel",
        description: "We maken zichtbaar waar gebruikers afhaken en waarom.",
      },
      {
        title: "Betere UX-beslissingen op basis van data",
        description: "Gedrag, usability en businessdoelen komen samen in concrete acties.",
      },
      {
        title: "Focus op quick wins",
        description: "Prioriteit op impact, niet op eindeloze A/B-testen.",
      },
    ],
    services: [
      {
        title: "Funnel- & data-analyse",
        description: "Gebruik data om knelpunten en groeidrivers scherp te krijgen.",
        bullets: [
          "Diepte-analyse in GA4 en CRM-data",
          "Kwaliteit van sessies, kanalen en devices",
          "Funnel drop-offs en conversiepunten in kaart",
          "Aanbevelingen met impact en effort",
        ],
      },
      {
        title: "UX & conversie-audit",
        description: "Een frisse blik op je belangrijkste flows en pagina’s.",
        bullets: [
          "Heuristieken en best practices toegepast op jullie journeys",
          "Mobile-first review van kritieke stappen",
          "Content, microcopy en trust-elementen doorgelicht",
          "Kort rapport met prioriteiten per scherm",
        ],
      },
      {
        title: "Gedragsanalyse",
        description: "Combineer data met observaties voor context.",
        bullets: [
          "Heatmaps, recordings en scrollgedrag gekoppeld aan metrics",
          "Zoek- en klikgedrag per segment",
          "Bevestiging of weerlegging van UX-hypothesen",
          "Concrete fixes per frictiepunt",
        ],
      },
      {
        title: "Prioriteiten & optimalisatie-roadmap",
        description: "Van bevindingen naar een uitvoerbare volgorde.",
        bullets: [
          "Impact/effort scoring en planning",
          "Sprints met quick wins en structurele verbeteringen",
          "Meetplan en KPI’s per actie",
          "Handover naar development en design",
        ],
      },
    ],
    closing: {
      title: "Klaar om de frictie uit je funnel te halen?",
      cta: "Plan een vrijblijvende kennismaking",
    },
  },
  en: {
    seo: {
      title: "CRO & UX optimisation – clarity without experiment overload",
      description:
        "Uncover funnel friction, make better UX decisions with data and get a roadmap focused on quick wins instead of endless A/B tests.",
    },
    hero: {
      eyebrow: "CRO & UX",
      title: "Optimise without the noise",
      subtitle:
        "We blend funnel analysis and behaviour research into a clear roadmap—no experiment circus, just data-backed decisions.",
      primaryCta: "Book an intro call",
      secondaryCta: "See our approach",
    },
    benefits: [
      {
        title: "Spot funnel friction",
        description: "We expose where users drop off and why.",
      },
      {
        title: "Better UX decisions from data",
        description: "Behaviour, usability and business goals come together in actionable steps.",
      },
      {
        title: "Focus on quick wins",
        description: "Impact-led priorities without endless A/B testing.",
      },
    ],
    services: [
      {
        title: "Funnel & data analysis",
        description: "Use data to pinpoint bottlenecks and growth drivers.",
        bullets: [
          "Deep-dive in GA4 and CRM data",
          "Session quality across channels and devices",
          "Funnel drop-offs and conversion points mapped",
          "Impact-driven recommendations",
        ],
      },
      {
        title: "UX & conversion audit",
        description: "A fresh look at your key flows and pages.",
        bullets: [
          "Heuristics and best practices applied to your journeys",
          "Mobile-first review of critical steps",
          "Content, microcopy and trust elements assessed",
          "Short report with priorities per screen",
        ],
      },
      {
        title: "Behaviour analysis",
        description: "Pair numbers with context from real users.",
        bullets: [
          "Heatmaps, recordings and scroll depth tied to metrics",
          "Search and click behaviour by segment",
          "Validate or disprove UX hypotheses",
          "Concrete fixes per friction point",
        ],
      },
      {
        title: "Priorities & optimisation roadmap",
        description: "Turn findings into a sequenced plan.",
        bullets: [
          "Impact/effort scoring and planning",
          "Sprints with quick wins and structural improvements",
          "Measurement plan and KPIs per action",
          "Handover to development and design",
        ],
      },
    ],
    closing: {
      title: "Ready to remove friction from your funnel?",
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
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="relative overflow-hidden bg-surface-soft pb-24 pt-28">
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
            <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
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
                <CroIcon />
                <span>{language === "nl" ? "CRO met focus op actie" : "CRO built for action"}</span>
              </div>
              <p className="text-lg font-semibold text-neutral-900">
                {language === "nl"
                  ? "In enkele sessies brengen we frictie, kansen en prioriteiten samen in een concrete roadmap."
                  : "In a few sessions we align friction, opportunities and priorities into a concrete roadmap."}
              </p>
              <ul className="space-y-3 text-sm text-neutral-700">
                {[
                  language === "nl" ? "Focus op impactvolle quick wins" : "Focus on high-impact quick wins",
                  language === "nl" ? "Bewezen UX-heuristieken" : "Proven UX heuristics",
                  language === "nl" ? "Duidelijke opvolging voor teams" : "Clear follow-up for teams",
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
              {language === "nl" ? "Wat het oplevert" : "What it delivers"}
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
                ? "CRO als duidelijke roadmap"
                : "CRO as a clear roadmap"}
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 text-max-width">
              {language === "nl"
                ? "Compacte kaarten met precies wat je krijgt: inzichten, prioriteiten en begeleiding naar uitvoering."
                : "Compact cards with exactly what you get: insights, priorities and guidance into execution."}
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
                    <CroIcon />
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
                    {language === "nl" ? "Ontdek hoe we helpen" : "Discover how we help"}
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
                    ? "We delen binnen één gesprek de beste volgende stap voor jouw funnel."
                    : "Within one conversation we’ll show the best next step for your funnel."}
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
