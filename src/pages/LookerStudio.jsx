import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "Looker Studio – Dashboards die dagelijks sturen",
      description:
        "Krijg realtime inzicht in omzet, funnels en campagnes met Looker Studio dashboards die aansluiten op GA4 en advertentieplatformen.",
    },
    hero: {
      eyebrow: "Looker Studio",
      title: "Dashboards die direct laten zien waar je kunt sturen",
      description:
        "We bouwen rapportages die KPI's, marges en kanaalbijdrage combineren. Met alerts, dataverificatie en een duidelijke overdracht zorg je dat het dashboard leeft binnen het team.",
    },
    sections: [
      {
        title: "Eén bron van waarheid",
        bullets: [
          "Datasets uit GA4, advertentieplatformen en CRM gekoppeld via community connectors of BigQuery.",
          "Dashboards afgestemd op jouw groeimodel met segmentatie per land, merk of kanaal.",
          "Ingebouwde dataverificatie zodat afwijkingen in events of kosten direct zichtbaar zijn.",
        ],
      },
      {
        title: "Gebruiksvriendelijke visualisaties",
        bullets: [
          "Interactieve filters voor campagnes, doelgroepen en devicecategorieën.",
          "Scrolbare canvassen met verhalen per funnelstap: awareness, consideration en conversion.",
          "Design system dat aansluit op je huisstijl zodat stakeholders het dashboard vertrouwen.",
        ],
      },
      {
        title: "Adoptie & onderhoud",
        bullets: [
          "Documentatie en Loom-walkthroughs zodat teams zelfstandig inzichten kunnen delen.",
          "Automatische exports naar Slack of e-mail met de belangrijkste KPI's van de week.",
          "Roadmap voor iteraties: nieuwe databronnen, extra visualisaties en advanced segmentatie.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Looker Studio – Dashboards that drive action",
      description:
        "Get realtime insight into revenue, funnels and campaigns with Looker Studio dashboards connected to GA4 and ad platforms.",
    },
    hero: {
      eyebrow: "Looker Studio",
      title: "Dashboards that show exactly where to optimise",
      description:
        "We craft reports that combine KPIs, margins and channel contribution. Alerts, data validation and clear enablement make sure the dashboard becomes part of the team rhythm.",
    },
    sections: [
      {
        title: "A single source of truth",
        bullets: [
          "GA4, ad platforms and CRM data blended via community connectors or BigQuery.",
          "Dashboards shaped around your growth model with segmentation per country, brand or channel.",
          "Built-in data validation so anomalies in events or spend surface immediately.",
        ],
      },
      {
        title: "Human-centred visualisations",
        bullets: [
          "Interactive filters for campaigns, audiences and device categories.",
          "Scrollable canvases that tell the story for each funnel step: awareness, consideration, conversion.",
          "Design system aligned with your brand to build trust with stakeholders.",
        ],
      },
      {
        title: "Adoption & upkeep",
        bullets: [
          "Documentation and Loom walkthroughs so teams can share insights autonomously.",
          "Automated exports to Slack or email summarising the week's key KPIs.",
          "Iteration roadmap: new data sources, extra visualisations and advanced segmentation.",
        ],
      },
    ],
  },
};

export default function LookerStudio() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-yellow/10 pb-24 pt-28 ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur "
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.7 }}
            className="mt-7 text-balance text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 "
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {copy.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.55 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur "
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 ">{section.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 ">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
