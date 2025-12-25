import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "Measurement – Betrouwbare data als fundament voor groei",
      description:
        "Heldere GA4-implementaties met focus op wat we doen, wat het oplevert en hoe je grip krijgt op conversie.",
    },
    hero: {
      title: "Betrouwbare data als fundament voor groei",
      description:
        "Met correcte metingen weet je wat er écht gebeurt op je website — en waar je moet ingrijpen.",
      primaryCta: "Vraag gratis QuickScan aan",
      secondaryCta: "Plan kennismaking",
    },
    why: {
      title: "Waarom measurement?",
      points: [
        "Onvolledige of foutieve GA4-data",
        "Geen grip op funnel & omzet",
        "Beslissingen op aannames",
      ],
      closing: "Zonder betrouwbare data geen effectieve optimalisatie.",
    },
    services: {
      title: "Diensten",
      cards: [
        {
          title: "GA4 Start",
          summary: "Basisinrichting voor snelle, betrouwbare inzichten.",
          whatWeDo: [
            "GA4 property en datastream correct opzetten",
            "Interne traffic en spamfiltering configureren",
            "Koppelingen met Search Console en Tag Manager",
            "Korte overdracht zodat je direct zelfstandig verder kunt",
          ],
          outcomes: [
            "Betrouwbare basis voor rapportages",
            "Essentiële gebeurtenissen goed vastgelegd",
            "Snelle validatie van marketinginspanningen",
          ],
        },
        {
          title: "GA4 Start + Consent",
          summary: "Startpakket aangevuld met een AVG-proof consentoplossing.",
          whatWeDo: [
            "Technische integratie van een moderne cookiebanner",
            "Consent- en trackinginstellingen afstemmen op je beleid",
            "Datastromen en tags alleen laden bij juiste toestemming",
            "Controle op werking via testscenario’s",
          ],
          outcomes: [
            "Volledige naleving van privacyrichtlijnen",
            "Consistente data zonder datalekken",
            "Zicht op impact van consent op je rapportages",
          ],
        },
        {
          title: "GA4 Advanced",
          summary: "Meting afgestemd op je commerciële doelen en KPI’s.",
          whatWeDo: [
            "Events en conversies ontwerpen rondom leads, demo’s of sales",
            "Custom dimensies en metrics voor jouw funnel",
            "Meetplan documenteren inclusief naming conventions",
            "Dashboarding-ready datasets opleveren",
          ],
          outcomes: [
            "Inzicht in fricties en kansen per stap",
            "Rapportages die direct tot acties leiden",
            "Klaar voor deep dives en segmentatie",
          ],
        },
        {
          title: "GA4 E-commerce",
          summary: "Enhanced e-commerce tracking voor maximale omzetinzichten.",
          whatWeDo: [
            "Datalayer blueprint voor product-, winkelwagen- en checkout-events",
            "Samenwerking met developers voor correcte implementatie",
            "Validatie van revenue, tax en coupontracking",
            "Dashboards en alerts voor afwijkingen",
          ],
          outcomes: [
            "Volledige funneldata van view tot transactie",
            "Betrouwbare omzet- en marge-inzichten",
            "Sneller opsporen van drop-offs en bugs",
          ],
        },
      ],
    },
    value: {
      title: "Wat levert dit concreet op",
      bullets: [
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
      title: "Measurement – Reliable data as the foundation for growth",
      description:
        "Clear GA4 implementations focused on what we do, the outcomes, and how you regain control over conversion.",
    },
    hero: {
      title: "Reliable data as the foundation for growth",
      description:
        "With accurate measurement you know what truly happens on your site — and where to intervene.",
      primaryCta: "Request free QuickScan",
      secondaryCta: "Schedule introduction",
    },
    why: {
      title: "Why measurement?",
      points: [
        "Incomplete or incorrect GA4 data",
        "No grip on funnel & revenue",
        "Decisions based on assumptions",
      ],
      closing: "Without reliable data there is no effective optimization.",
    },
    services: {
      title: "Services",
      cards: [
        {
          title: "GA4 Start",
          summary: "Essential setup for fast, trustworthy insights.",
          whatWeDo: [
            "Configure GA4 property and data stream correctly",
            "Set up internal traffic and spam filters",
            "Link Search Console and Tag Manager",
            "Short handover so you can continue independently",
          ],
          outcomes: [
            "Reliable baseline for reporting",
            "Key events captured properly",
            "Quick validation of marketing efforts",
          ],
        },
        {
          title: "GA4 Start + Consent",
          summary: "Starter package with a GDPR-proof consent solution.",
          whatWeDo: [
            "Technical integration of a modern cookie banner",
            "Align consent and tracking settings with your policy",
            "Load data streams and tags only with valid consent",
            "Verify behaviour through test scenarios",
          ],
          outcomes: [
            "Full compliance with privacy guidelines",
            "Consistent data without leakage",
            "Visibility on consent impact in reports",
          ],
        },
        {
          title: "GA4 Advanced",
          summary: "Measurement tailored to your commercial goals and KPIs.",
          whatWeDo: [
            "Design events and conversions around leads, demos or sales",
            "Custom dimensions and metrics for your funnel",
            "Document a measurement plan with naming conventions",
            "Provide datasets that are dashboard-ready",
          ],
          outcomes: [
            "Insight into friction and opportunities per step",
            "Reports that lead directly to actions",
            "Ready for deep dives and segmentation",
          ],
        },
        {
          title: "GA4 E-commerce",
          summary: "Enhanced e-commerce tracking for maximum revenue insight.",
          whatWeDo: [
            "Datalayer blueprint for product, cart and checkout events",
            "Collaboration with developers for accurate implementation",
            "Validation of revenue, tax and coupon tracking",
            "Dashboards and alerts for anomalies",
          ],
          outcomes: [
            "Complete funnel data from view to transaction",
            "Reliable revenue and margin insights",
            "Faster detection of drop-offs and bugs",
          ],
        },
      ],
    },
    value: {
      title: "What this delivers",
      bullets: [
        "Reliable numbers",
        "Insight into behaviour & conversion",
        "Better decisions",
        "Foundation for CRO & growth",
      ],
      cta: "Request free QuickScan",
    },
  },
};

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const secondaryCtaClass =
  "inline-flex items-center justify-center rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-brand-blue ring-1 ring-brand-blue/20 transition hover:-translate-y-0.5 hover:ring-brand-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const ServiceCard = ({ title, summary, whatWeDo, outcomes, index, shouldReduceMotion }) => (
  <motion.article
    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.2 }}
    transition={shouldReduceMotion ? undefined : { delay: 0.06 * index, duration: 0.55 }}
    className="group relative flex h-full flex-col rounded-3xl bg-white/80 p-6 shadow-[0_26px_65px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 backdrop-blur"
  >
    <div className="flex flex-col gap-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
        <span className="text-lg font-bold">{index + 1}</span>
      </div>
      <h3 className="text-lg font-semibold leading-tight text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-700">{summary}</p>
      <div className="space-y-3 rounded-2xl bg-surface-soft px-4 py-3 ring-1 ring-neutral-200/70">
        <h4 className="text-sm font-semibold text-neutral-900">Wat we doen</h4>
        <ul className="space-y-2 text-sm text-neutral-700">
          {whatWeDo.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-neutral-200/80">
        <h4 className="text-sm font-semibold text-neutral-900">Wat het oplevert</h4>
        <ul className="space-y-2 text-sm text-neutral-700">
          {outcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-6">
      <Link to="/contact" className={secondaryCtaClass}>
        Plan kennismaking
      </Link>
    </div>
  </motion.article>
);

export default function Measurement() {
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
                Measurement
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                {copy.hero.title}
              </h1>
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

          <section className="mt-16 space-y-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.why.title}</h2>
              <p className="text-neutral-600">{copy.why.closing}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.why.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
                  transition={shouldReduceMotion ? undefined : { delay: 0.05 * index, duration: 0.5 }}
                  className="flex flex-col gap-3 rounded-2xl bg-white/80 p-6 ring-1 ring-neutral-200/80"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow text-sm font-semibold text-neutral-900 shadow-[0_14px_30px_rgba(255,204,2,0.35)]">
                    0{index + 1}
                  </span>
                  <p className="text-base font-medium text-neutral-900">{point}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-16 space-y-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.services.title}</h2>
              <p className="max-w-3xl text-neutral-600">
                {language === "nl"
                  ? "Alle bestaande GA4-diensten, maar gepresenteerd op resultaat. Kies wat past bij je situatie."
                  : "All existing GA4 services, presented with a focus on outcomes. Pick what matches your situation."}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {copy.services.cards.map((card, index) => (
                <ServiceCard
                  key={card.title}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                  {...card}
                />
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 rounded-3xl bg-white/85 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 backdrop-blur md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{copy.value.title}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {copy.value.bullets.map((item) => (
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
                  ? "Binnen 10 seconden duidelijk of het relevant is? Deze QuickScan laat het zien."
                  : "Need clarity fast? The QuickScan makes relevance obvious within seconds."}
              </p>
              <Link to="/contact" className={primaryCtaClass}>
                {copy.value.cta}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
