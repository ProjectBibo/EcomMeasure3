import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = {
  nl: {
    seo: {
      title: "UX/CRO diensten – expert reviews, analyses & testing",
      description:
        "Drie UX/CRO diensten: expert reviews, kwantitatieve analyses en user testing met duidelijke deliverables en prijzen.",
    },
    heading: "UX/CRO diensten",
    cards: [
      {
        title: "Kwalitatieve analyse middels UX Expert review",
        bullets: [
          "Inspectie én analyse van het gebruikersgemak door UX- en usability expert",
          "9 universele UX-aandachtsgebieden",
          "Totaalbeeld met ±150 checkpoints",
        ],
        whatWeDo:
          "We beoordelen flows, pagina's en micro-interacties op basis van best practices en benchmarkcases voor jouw sector.",
        deliverable: "Jij ontvangt: PDF + toelichting (bondig)",
        price: "Prijs vanaf €860 (ex btw, afhankelijk van de website)",
      },
      {
        title:
          "Kwantitatieve Analyse naar groeidrivers en verbeterpunten (Google Analytics 4, Google Search e.a.)",
        bullets: [
          "Kwantitatieve analyse van gebruikers op je site",
          "Aangevuld met eyetracking scans",
          "Aangevuld met onderzoek en inzichten vanuit Google Analytics, Google Search",
        ],
        whatWeDo:
          "We combineren traffic- en gedragdata met heatmaps en search insights om groeikansen en fricties scherp te krijgen.",
        deliverable: "Jij ontvangt: presentatie + actie/prioriteitenlijst (bondig)",
        price: "Prijs vanaf €1400 (ex btw, afhankelijk van de website)",
      },
      {
        title: "User Testing van de gehele customer journey",
        bullets: [
          "Persoonlijk, maatwerk en genormeerd testplan met meetbare doelen",
          "Tot 5 participanten, via mobile en desktop",
          "Remote of on-site",
        ],
        whatWeDo:
          "We begeleiden werving, scripts en moderatie en leggen bevindingen vast in video en notities voor snelle implementatie.",
        deliverable:
          "Jij ontvangt: presentatie + gedetailleerde lijst met acties en prioriteiten (bondig)",
        price: "Prijs vanaf €2500 (ex btw, afhankelijk van de website)",
      },
    ],
  },
  en: {
    seo: {
      title: "UX/CRO services – expert reviews, analysis & testing",
      description:
        "Three UX/CRO services: expert reviews, quantitative analyses and user testing with clear deliverables and pricing.",
    },
    heading: "UX/CRO services",
    cards: [
      {
        title: "Qualitative analysis via UX expert review",
        bullets: [
          "Inspection and analysis of usability by a UX specialist",
          "9 universal UX focus areas",
          "Complete overview with roughly 150 checkpoints",
        ],
        whatWeDo:
          "We assess flows, pages and micro-interactions using best practices and benchmark cases for your industry.",
        deliverable: "You receive: PDF + briefing (concise)",
        price: "Pricing from €860 (ex VAT, depending on the site)",
      },
      {
        title:
          "Quantitative analysis of growth drivers and improvements (Google Analytics 4, Google Search, etc.)",
        bullets: [
          "Quantitative analysis of user behaviour on your site",
          "Complemented with eye-tracking scans",
          "Enriched with research and insights from Google Analytics and Google Search",
        ],
        whatWeDo:
          "We combine traffic and behaviour data with heatmaps and search insights to pinpoint opportunities and friction.",
        deliverable: "You receive: presentation + action/priority list (concise)",
        price: "Pricing from €1400 (ex VAT, depending on the site)",
      },
      {
        title: "User testing of the full customer journey",
        bullets: [
          "Tailored, standardised test plan with measurable objectives",
          "Up to 5 participants on mobile and desktop",
          "Remote or on-site",
        ],
        whatWeDo:
          "We handle recruitment, scripts and moderation, documenting insights in video and notes for quick implementation.",
        deliverable: "You receive: presentation + detailed list of actions and priorities (concise)",
        price: "Pricing from €2500 (ex VAT, depending on the site)",
      },
    ],
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
  const { language } = useLanguage();
  const copy = services[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="relative overflow-hidden bg-surface-soft pb-24 pt-28   ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative site-container">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl"
          >
            {copy.heading}
          </motion.h1>
        </div>

        <div className="relative site-container mt-14">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {copy.cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
                className="group relative flex h-full flex-col card-surface"
              >
                <div className="relative flex flex-col gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
                    <CroIcon />
                  </div>
                  <h2 className="text-xl font-semibold leading-tight text-neutral-900 ">{card.title}</h2>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700 ">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2 rounded-2xl bg-neutral-50/80 p-4 text-sm leading-relaxed text-neutral-700 ring-1 ring-neutral-200/70   ">
                    <h3 className="text-sm font-semibold text-neutral-900 ">
                      {language === "nl" ? "Wat we doen" : "What we do"}
                    </h3>
                    <p>{card.whatWeDo}</p>
                    <h3 className="text-sm font-semibold text-neutral-900 ">
                      {language === "nl" ? "Jij ontvangt" : "You receive"}
                    </h3>
                    <p>{card.deliverable}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
