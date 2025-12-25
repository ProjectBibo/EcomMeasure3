import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const cta = {
  primary: "Plan kennismaking",
  secondary: "Vraag Quick Scan aan",
  primaryHref: "/contact",
  secondaryHref: "/contact?topic=quickscan",
};

const content = {
  nl: {
    seo: {
      title: "CRO analyse & advies – UX, data en prioritering",
      description:
        "Drie CRO-analysediensten zonder experimentuitvoering: UX & gedragsanalyse, kwantitatieve data-analyse en optimalisatie-advies met prioritering.",
    },
    hero: {
      title: "CRO analyse & advies",
      intro:
        "CRO is inzicht, richting en advies. We combineren UX-observaties en data-analyses tot een gerichte roadmap zonder experimentuitvoering. Elke dienst hieronder geeft je heldere stappen, tastbare output en duidelijke keuzes voor je team.",
    },
    services: [
      {
        title: "UX & gedragsanalyse",
        intro: "Voor teams die willen weten waar gebruikers vastlopen en waarom.",
        whatWeDo: [
          "Heuristische review van belangrijkste flows en pagina's",
          "Analyse van sessiereplays, scroll- en klikgedrag",
          "Journey mapping met context per device en trafficbron",
          "Samenvatten van de grootste fricties per stap",
        ],
        deliverables: [
          "Scorecard per flow met concrete bevindingen",
          "Screenshots en voorbeelden uit replays ter onderbouwing",
          "Toplijst van UX-blokkades met korte toelichting",
          "Aanbevolen vervolganalyses per thema",
        ],
        outcomes: [
          "Duidelijk beeld van waar en waarom gebruikers afhaken",
          "Onderbouwde input voor product- en designbeslissingen",
          "Snellere validatie van hypotheses zonder tests te draaien",
        ],
      },
      {
        title: "Kwantitatieve data-analyse",
        intro: "Voor marketeers en productowners die prioriteit willen geven op basis van cijfers.",
        whatWeDo: [
          "Funnel-, cohort- en segmentanalyses op conversie en waarde",
          "Diepte-analyse van landingspagina's, zoekgedrag en interne zoekresultaten",
          "Controle op eventkwaliteit en meetdekking in GA4 en dashboarding",
          "Detectie van afwijkingen per device, bron of campagne",
        ],
        deliverables: [
          "Analysepresentatie met grafieken en kernbevindingen",
          "Dataset of exports per segment met uitlegbaarheid",
          "Prioriteitenlijst met impact- en effortinschatting",
          "Aanbevolen metriekdefinities en meetverbeteringen",
        ],
        outcomes: [
          "Helder waar omzet of leads lekken in de funnel",
          "Bewijs om roadmapkeuzes snel te onderbouwen",
          "Betrouwbare cijfers om interne discussies te versnellen",
        ],
      },
      {
        title: "Optimalisatie-advies & prioritering",
        intro: "Voor teams die een beslisbaar plan willen zonder experimentuitvoering.",
        whatWeDo: [
          "Synthetiseren van bevindingen uit UX- en dataonderzoek",
          "Opstellen van verbetervoorstellen met aannames en randvoorwaarden",
          "Prioriteren met een transparant model (bijv. RICE of PIE)",
          "Afstemmen met stakeholders over scope, risico's en impact",
        ],
        deliverables: [
          "90-dagen roadmap met duidelijke owners en mijlpalen",
          "Verbeteracties inclusief rationale, vereisten en voorbeeldcopy",
          "Risico- en afhankelijkhedenmatrix per actie",
          "Communicatiepakket voor dev-, design- en marketingteams",
        ],
        outcomes: [
          "Gefocuste backlog die direct uitvoerbaar is",
          "Snellere besluitvorming met gedeelde prioriteiten",
          "Minder ruis over wat wel of niet wordt opgepakt",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "CRO analysis & advice – UX, data and prioritisation",
      description:
        "Three CRO analysis services without experiment execution: UX & behavioural analysis, quantitative data analysis and optimisation advice with prioritisation.",
    },
    hero: {
      title: "CRO analysis & advice",
      intro:
        "CRO here means insight, direction and advice. We combine UX observations and data analysis into a focused roadmap without running experiments. Each service below gives you clear steps, tangible outputs and confident choices for your team.",
    },
    services: [
      {
        title: "UX & behavioural analysis",
        intro: "For teams that need to see where users get stuck and why.",
        whatWeDo: [
          "Heuristic review of key flows and pages",
          "Analysis of session replays, scroll and click patterns",
          "Journey mapping with context by device and traffic source",
          "Summaries of the biggest frictions per step",
        ],
        deliverables: [
          "Scorecard per flow with concrete findings",
          "Screenshots and replay examples as evidence",
          "Top list of UX blockers with concise notes",
          "Recommended follow-up analyses per theme",
        ],
        outcomes: [
          "Clear picture of where and why users drop off",
          "Evidence to inform product and design decisions",
          "Faster validation of hypotheses without running tests",
        ],
      },
      {
        title: "Quantitative data analysis",
        intro: "For marketers and product owners who prioritise based on numbers.",
        whatWeDo: [
          "Funnel, cohort and segment analysis on conversion and value",
          "Deep dive into landing pages, search behaviour and onsite search results",
          "Quality checks on events and coverage in GA4 and dashboards",
          "Detection of anomalies by device, source or campaign",
        ],
        deliverables: [
          "Analysis deck with charts and key findings",
          "Dataset or exports per segment with explanations",
          "Priority list with impact and effort estimates",
          "Recommended metric definitions and measurement fixes",
        ],
        outcomes: [
          "Clarity on where revenue or leads leak in the funnel",
          "Proof to back roadmap decisions quickly",
          "Reliable numbers to speed up internal alignment",
        ],
      },
      {
        title: "Optimisation advice & prioritisation",
        intro: "For teams that want a decisive plan without executing experiments.",
        whatWeDo: [
          "Synthesize findings from UX and data research",
          "Draft improvement proposals with assumptions and constraints",
          "Prioritise with a transparent model (e.g. RICE or PIE)",
          "Align with stakeholders on scope, risks and impact",
        ],
        deliverables: [
          "90-day roadmap with clear owners and milestones",
          "Improvement actions including rationale, requirements and sample copy",
          "Risk and dependency matrix per action",
          "Communication pack for dev, design and marketing teams",
        ],
        outcomes: [
          "Focused backlog that teams can act on immediately",
          "Faster decisions with shared priorities",
          "Less noise about what will or won't be picked up",
        ],
      },
    ],
  },
};

export default function Cro() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="relative overflow-hidden bg-surface-soft pb-24 pt-28">
        <div className="grain-overlay" aria-hidden />
        <div className="relative site-container">
          <motion.h1
            id="cro-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.65 }}
            className="text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
            className="mt-5 max-w-3xl text-lg text-neutral-700"
          >
            {copy.hero.intro}
          </motion.p>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.12, duration: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href={cta.primaryHref} className="button-primary">
              {cta.primary}
            </a>
            <a href={cta.secondaryHref} className="button-secondary">
              {cta.secondary}
            </a>
          </motion.div>
        </div>

        <div className="relative site-container mt-16 space-y-8">
          {copy.services.map((service, index) => (
            <motion.section
              key={service.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
              className="card-surface flex flex-col gap-6"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-neutral-900">{service.title}</h2>
                <p className="text-base text-neutral-700">{service.intro}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
                    {language === "nl" ? "Wat we doen" : "What we do"}
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700">
                    {service.whatWeDo.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
                    {language === "nl" ? "Wat je ontvangt" : "What you receive"}
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
                    {language === "nl" ? "Wat het oplevert" : "What it delivers"}
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-700">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={cta.primaryHref} className="button-primary">
                  {cta.primary}
                </a>
                <a href={cta.secondaryHref} className="button-secondary">
                  {cta.secondary}
                </a>
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </>
  );
}
