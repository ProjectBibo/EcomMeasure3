import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "CRO – Van inzicht naar gerichte optimalisatie",
      description:
        "CRO-diensten met focus op inzicht, duidelijke deliverables en impactvolle aanbevelingen zonder testfetisjisme.",
    },
    hero: {
      title: "Van inzicht naar gerichte optimalisatie",
      description: "CRO begint bij begrijpen wat gebruikers doen — en waarom.",
      primaryCta: "Plan kennismaking",
      secondaryCta: "Vraag QuickScan aan",
    },
    approach: {
      title: "Hoe wij CRO benaderen",
      text: [
        "Wij doen geen testen om te testen.",
        "We analyseren gedrag, signaleren knelpunten en adviseren verbeteringen die écht impact hebben.",
      ],
    },
    services: {
      title: "Diensten",
      cards: [
        {
          title: "UX Expert Review (kwalitatief)",
          intro: "Scherpe blik op flows, pagina's en micro-interacties.",
          research: [
            "Analyse op 9 UX-aandachtsgebieden",
            "Heuristiek + best practices per branche",
            "Heldere prioritering van bevindingen",
          ],
          deliverables: [
            "Bondig rapport met screenshots",
            "Live walkthrough van de belangrijkste issues",
          ],
          outcomes: [
            "Direct toepasbare verbeterpunten",
            "Minder frictie in cruciale journeys",
            "Eenduidige lijst voor design & dev",
          ],
        },
        {
          title: "Kwantitatieve analyse",
          intro: "Data-gedreven inzicht in gedrag en groeidrivers.",
          research: [
            "Analyse van funnel, devices en contentperformantie",
            "Heatmaps en scrollmaps als context",
            "Signalering van kansen per segment",
          ],
          deliverables: [
            "Presentatie met bevindingen en grafieken",
            "Actie- en prioriteitenlijst afgestemd op businessdoel",
          ],
          outcomes: [
            "Feitelijke basis voor keuzes",
            "Helder waar je omzet lekt",
            "Onderbouwing richting stakeholders",
          ],
        },
        {
          title: "User testing customer journey",
          intro: "Realistische tests die laten zien waar klanten afhaken.",
          research: [
            "Testplan met meetbare scenario’s",
            "Remote of on-site, mobiel en desktop",
            "Observaties vastgelegd in video en notities",
          ],
          deliverables: [
            "Presentatie met key learnings",
            "Lijst met acties en implementatiesuggesties",
          ],
          outcomes: [
            "Bewijs voor wat wel/niet werkt",
            "Sneller beslissen over roadmap",
            "Betere ervaring over de hele journey",
          ],
        },
      ],
    },
    results: {
      title: "Resultaat & vertrouwen",
      bullets: [
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
        "CRO services focused on insight, clear deliverables and impactful recommendations without test-for-test's-sake.",
    },
    hero: {
      title: "From insight to targeted optimisation",
      description: "CRO starts with understanding what users do — and why.",
      primaryCta: "Schedule introduction",
      secondaryCta: "Request QuickScan",
    },
    approach: {
      title: "How we approach CRO",
      text: [
        "We don’t run tests for the sake of testing.",
        "We analyse behaviour, spot bottlenecks and advise improvements that actually move the needle.",
      ],
    },
    services: {
      title: "Services",
      cards: [
        {
          title: "UX Expert Review (qualitative)",
          intro: "A sharp look at flows, pages and micro-interactions.",
          research: [
            "Analysis across 9 UX focus areas",
            "Heuristics plus industry best practices",
            "Clear prioritisation of findings",
          ],
          deliverables: [
            "Concise report with screenshots",
            "Live walkthrough of the main issues",
          ],
          outcomes: [
            "Immediately actionable improvements",
            "Less friction in crucial journeys",
            "Aligned list for design & dev",
          ],
        },
        {
          title: "Quantitative analysis",
          intro: "Data-driven insight into behaviour and growth drivers.",
          research: [
            "Analysis of funnel, devices and content performance",
            "Heatmaps and scrollmaps for context",
            "Signals per segment to find opportunities",
          ],
          deliverables: [
            "Presentation with findings and visuals",
            "Action and priority list aligned to business goals",
          ],
          outcomes: [
            "Factual basis for decisions",
            "Clarity on where revenue leaks",
            "Evidence stakeholders can rally behind",
          ],
        },
        {
          title: "User testing customer journey",
          intro: "Realistic tests showing where customers drop off.",
          research: [
            "Test plan with measurable scenarios",
            "Remote or on-site, mobile and desktop",
            "Observations captured in video and notes",
          ],
          deliverables: [
            "Presentation with key learnings",
            "Action list with implementation suggestions",
          ],
          outcomes: [
            "Proof of what works and what doesn’t",
            "Faster decisions on the roadmap",
            "Better experience across the journey",
          ],
        },
      ],
    },
    results: {
      title: "Outcome & trust",
      bullets: [
        "Clear priorities",
        "Evidence-based decisions",
        "Less debate, more direction",
        "Better conversion foundation",
      ],
      cta: "Schedule introduction",
    },
  },
};

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const secondaryCtaClass =
  "inline-flex items-center justify-center rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-brand-blue ring-1 ring-brand-blue/20 transition hover:-translate-y-0.5 hover:ring-brand-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const ServiceCard = ({ title, intro, research, deliverables, outcomes, index, shouldReduceMotion, language }) => (
  <motion.article
    initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
    transition={shouldReduceMotion ? undefined : { delay: 0.06 * index, duration: 0.55 }}
    className="flex h-full flex-col gap-4 rounded-3xl bg-white/85 p-6 shadow-[0_26px_65px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 backdrop-blur"
  >
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
      <span className="text-sm font-semibold">{index + 1}</span>
    </div>
    <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
    <p className="text-sm text-neutral-700">{intro}</p>

    <div className="space-y-2 rounded-2xl bg-surface-soft px-4 py-3 ring-1 ring-neutral-200/70">
      <h4 className="text-sm font-semibold text-neutral-900">{language === "nl" ? "Wat we onderzoeken" : "What we research"}</h4>
      <ul className="space-y-2 text-sm text-neutral-700">
        {research.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-neutral-200/80">
      <h4 className="text-sm font-semibold text-neutral-900">{language === "nl" ? "Wat je ontvangt" : "What you receive"}</h4>
      <ul className="space-y-2 text-sm text-neutral-700">
        {deliverables.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-2 rounded-2xl bg-surface-soft px-4 py-3 ring-1 ring-neutral-200/70">
      <h4 className="text-sm font-semibold text-neutral-900">{language === "nl" ? "Wat het oplevert" : "What it delivers"}</h4>
      <ul className="space-y-2 text-sm text-neutral-700">
        {outcomes.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-auto pt-2">
      <Link to="/contact" className={secondaryCtaClass}>
        {language === "nl" ? "Plan kennismaking" : "Schedule introduction"}
      </Link>
    </div>
  </motion.article>
);

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="relative overflow-hidden bg-surface-soft pb-24 pt-28">
        <div className="grain-overlay" aria-hidden />
        <div className="relative site-container">
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="flex flex-col gap-6 rounded-3xl bg-white/85 p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 backdrop-blur lg:p-12"
          >
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue ring-1 ring-brand-blue/20">
                CRO
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">{copy.hero.title}</h1>
              <p className="max-w-3xl text-lg text-neutral-700">{copy.hero.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className={primaryCtaClass}>
                {copy.hero.primaryCta}
              </Link>
              <Link to="/contact" className={secondaryCtaClass}>
                {copy.hero.secondaryCta}
              </Link>
            </div>
          </motion.section>

          <section className="mt-16 grid gap-6 rounded-3xl bg-white/80 p-8 ring-1 ring-neutral-200/80 backdrop-blur md:grid-cols-[1fr_1.6fr] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.approach.title}</h2>
              {copy.approach.text.map((line) => (
                <p key={line} className="text-neutral-700">
                  {line}
                </p>
              ))}
            </div>
            <div className="rounded-2xl bg-surface-soft p-6 ring-1 ring-neutral-200/70">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                <p className="text-sm text-neutral-800">
                  {language === "nl"
                    ? "Geen A/B-test bureau positionering. Altijd eerst de juiste vraag, dan het beste middel."
                    : "Not positioned as an A/B test shop. We start with the right question, then choose the best method."}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 space-y-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.services.title}</h2>
              <p className="max-w-3xl text-neutral-600">
                {language === "nl"
                  ? "Alle CRO-diensten blijven, maar met focus op wat we onderzoeken, wat je ontvangt en welk resultaat je mag verwachten."
                  : "All CRO services remain, now framed around what we research, what you receive and the outcomes you can expect."}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {copy.services.cards.map((card, index) => (
                <ServiceCard
                  key={card.title}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                  language={language}
                  {...card}
                />
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 rounded-3xl bg-white/85 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 backdrop-blur md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.results.title}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {copy.results.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-surface-soft px-4 py-3 ring-1 ring-neutral-200/70">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-blue" aria-hidden />
                    <span className="text-sm text-neutral-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-neutral-700">
                {language === "nl"
                  ? "Binnen 10 seconden duidelijk: dit levert richting én rust op."
                  : "Within seconds it’s clear: this brings direction and calm."}
              </p>
              <Link to="/contact" className={primaryCtaClass}>
                {copy.results.cta}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
