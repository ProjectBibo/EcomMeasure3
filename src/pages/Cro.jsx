import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = {
  nl: {
    seo: {
      title: "CRO diensten – Analyse en advies voor conversiegroei",
      description:
        "Drie CRO-analysediensten: UX & gedrag, kwantitatieve data-analyse en optimalisatie-advies met duidelijke output en CTA's.",
    },
    hero: {
      title: "CRO: inzicht, richting en advies",
      intro:
        "We brengen gedrag, data en fricties in kaart en vertalen die naar een prioriteitenlijst die je meteen kunt oppakken. Geen experimentuitvoering, wel duidelijke richting en acties.",
    },
    services: [
      {
        title: "UX & gedragsanalyse",
        summary:
          "Diepte-analyse van flows, pagina's en micro-interacties om concrete fricties en kansen bloot te leggen.",
        whatWeDo: [
          "Expert review op cruciale journeys met gedragsprincipes",
          "Check op contenthiërarchie, copy en interactiepatronen",
          "Heatmaps en sessie-opnames om werkelijke hindernissen te zien",
          "Analyse van checkout- en formulierflow voor blokkades",
        ],
        whatYouReceive: [
          "Compact rapport met bevindingen per scherm",
          "Screenshot-annotaties van issues en voorbeelden",
          "Checklist per journey voor snelle fixes",
          "Uitlegvideo of walkthrough voor het team",
        ],
        outcomes: [
          "Heldere lijst met UX-blokkades en prioriteit",
          "Snellere implementatie door visuele voorbeelden",
          "Basis voor copy- en designverbeteringen",
        ],
      },
      {
        title: "Kwantitatieve data-analyse",
        summary:
          "Datagedreven inzicht in welke pagina's, devices en bronnen de meeste conversiewinst of -verliezen veroorzaken.",
        whatWeDo: [
          "Analyse van GA4 events, funnel drop-offs en herhaalgedrag",
          "Segmentatie naar kanaal, device en klanttype",
          "Correlaties tussen zoekgedrag, landingspagina's en conversies",
          "Validatie van meetkwaliteit voor betrouwbare conclusies",
        ],
        whatYouReceive: [
          "Samenvattende presentatie met kernbevindingen",
          "Downloadbaar databoek met tabellen en grafieken",
          "Toplijst van pages en funnels met verbeterpotentieel",
          "Meetplan om datagaten te dichten",
        ],
        outcomes: [
          "Weten waar conversie lekt en waar je moet bijsturen",
          "Gezamenlijk beeld voor marketing en productteams",
          "Stevige basis voor prioritering en budget",
        ],
      },
      {
        title: "Optimalisatie-advies & prioritering",
        summary:
          "Vertaling van inzichten naar een concreet actieplan met volgorde, effort en verwachte impact.",
        whatWeDo: [
          "Clusteren van bevindingen tot thema's en kansen",
          "Impact/effort scoring en risico-inschatting",
          "Roadmap met sprints en owners per actie",
          "Afstemming met development en marketing voor haalbaarheid",
        ],
        whatYouReceive: [
          "Prioriteitenmatrix met duidelijke next steps",
          "Backlog-items die klaarstaan voor design/dev",
          "Samenvatting voor stakeholders met beslispunten",
          "Kick-off sessie om het team mee te nemen",
        ],
        outcomes: [
          "Gerichte lijst acties zonder experimentuitvoering",
          "Snellere doorlooptijd dankzij ready-to-build tickets",
          "Draagvlak doordat stakeholders dezelfde richting zien",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "CRO services – Analysis and advisory for conversion growth",
      description:
        "Three CRO analysis services: UX & behaviour, quantitative data analysis and optimisation advisory with clear outputs and CTAs.",
    },
    hero: {
      title: "CRO: insight, direction and advisory",
      intro:
        "We map behaviour, data and friction points and turn them into a priority list you can act on immediately. No experiment execution—just direction and actionable guidance.",
    },
    services: [
      {
        title: "UX & behaviour analysis",
        summary:
          "Deep review of flows, pages and micro-interactions to uncover concrete friction and opportunities.",
        whatWeDo: [
          "Expert review of critical journeys using behavioural principles",
          "Checks on content hierarchy, copy and interaction patterns",
          "Heatmaps and session recordings to see real obstacles",
          "Checkout and form-flow analysis to spot blockers",
        ],
        whatYouReceive: [
          "Concise report with findings per screen",
          "Screenshot annotations of issues and examples",
          "Checklist per journey for quick fixes",
          "Walkthrough video for the team",
        ],
        outcomes: [
          "Clear list of UX blockers with priority",
          "Faster implementation through visual examples",
          "Foundation for copy and design improvements",
        ],
      },
      {
        title: "Quantitative data analysis",
        summary:
          "Data-led insight into which pages, devices and sources drive the most conversion gains or losses.",
        whatWeDo: [
          "Analyse GA4 events, funnel drop-offs and repeat behaviour",
          "Segment by channel, device and customer type",
          "Correlate search behaviour, landing pages and conversions",
          "Validate measurement quality to keep findings reliable",
        ],
        whatYouReceive: [
          "Summary presentation with key findings",
          "Downloadable data book with tables and charts",
          "Top list of pages and funnels with improvement potential",
          "Measurement plan to close data gaps",
        ],
        outcomes: [
          "Know where conversion leaks and where to steer",
          "Shared view for marketing and product teams",
          "Solid basis for prioritisation and budget",
        ],
      },
      {
        title: "Optimisation advisory & prioritisation",
        summary:
          "Translate insights into an action plan with sequencing, effort and expected impact.",
        whatWeDo: [
          "Cluster findings into themes and opportunities",
          "Impact/effort scoring and risk assessment",
          "Roadmap with sprints and owners per action",
          "Alignment with development and marketing on feasibility",
        ],
        whatYouReceive: [
          "Priority matrix with clear next steps",
          "Backlog items ready for design/dev",
          "Stakeholder summary with decision points",
          "Kick-off session to onboard the team",
        ],
        outcomes: [
          "Focused list of actions without experiment execution",
          "Faster cycle time via ready-to-build tickets",
          "Buy-in because stakeholders see the same direction",
        ],
      },
    ],
  },
};

const sectionClasses = "card-surface flex flex-col gap-4 md:gap-5";
const subheadingClass = "text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500";
const bulletClass = "space-y-3 text-sm leading-relaxed text-neutral-700";

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = services[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="relative overflow-hidden bg-surface-soft pb-24 pt-28">
        <div className="grain-overlay" aria-hidden />

        <div className="relative site-container space-y-6">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
            className="max-w-3xl text-lg text-neutral-700"
          >
            {copy.hero.intro}
          </motion.p>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.14, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link to="/contact" className="button-primary">
              Plan kennismaking
            </Link>
            <Link to="/contact" className="button-secondary">
              Vraag Quick Scan aan
            </Link>
          </motion.div>
        </div>

        <div className="relative site-container mt-14 space-y-8 md:space-y-10">
          {copy.services.map((service, index) => (
            <motion.section
              key={service.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { delay: 0.06 * index, duration: 0.55 }}
              className={sectionClasses}
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-neutral-900">{service.title}</h2>
                <p className="text-neutral-700">{service.summary}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <p className={subheadingClass}>{language === "nl" ? "Wat we doen" : "What we do"}</p>
                  <ul className={bulletClass}>
                    {service.whatWeDo.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className={subheadingClass}>{language === "nl" ? "Wat je ontvangt" : "What you receive"}</p>
                  <ul className={bulletClass}>
                    {service.whatYouReceive.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className={subheadingClass}>{language === "nl" ? "Wat het oplevert" : "What it delivers"}</p>
                  <ul className={bulletClass}>
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/contact" className="button-primary">
                  Plan kennismaking
                </Link>
                <Link to="/contact" className="button-secondary">
                  Vraag Quick Scan aan
                </Link>
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
