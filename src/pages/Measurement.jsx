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
      title: "Measurement diensten – GA4, consent & dashboards",
      description:
        "Vier concrete measurement services: GA4 & GTM setup, AVG-proof tracking, e-commerce measurement en dashboards met databetrouwbaarheid.",
    },
    hero: {
      title: "Measurement & analytics diensten",
      intro:
        "Een meetfundament dat campagnes, product en legal voedt, begint met consistente data. Wij richten GA4 en GTM in, zorgen voor consent-proof tracking en leveren dashboards die teams zelfstandig laten sturen. Kies hieronder wat je nodig hebt en plan direct een kennismaking.",
    },
    services: [
      {
        title: "GA4 & GTM setup",
        intro:
          "Voor marketing- en developmentteams die een betrouwbare basis willen voor alle kanalen en campagnes.",
        whatWeDo: [
          "Inventariseren van bestaande tagging en datalayer versus businessdoelen",
          "Vertalen van funnelstappen naar events, parameters en conversies in GA4",
          "Inrichten van GTM-containers met triggers, variabelen en publicatieflow",
          "Documenteren van naming conventions, rechten en releasechecklists",
        ],
        deliverables: [
          "Meetplan en datalayer-mapping per event en parameter",
          "Geconfigureerde GA4-property met conversies, audiences en kanalen",
          "GTM-container (web en/of server-side) klaar voor release met testresultaten",
          "Overdrachtsessie met opname, beheerhandleiding en QA-checklist",
        ],
        outcomes: [
          "Betrouwbare data om kanaal- en campagneresultaten te sturen",
          "Minder foutgevoelige releases dankzij heldere governance",
          "Snellere iteraties voor marketing en development",
        ],
      },
      {
        title: "Consent- & AVG-proof tracking",
        intro: "Voor organisaties die privacy-eisen willen borgen zonder meetverlies.",
        whatWeDo: [
          "Audit van huidige consent flows, scripts en datastromen",
          "Inrichten van Consent Mode v2 en server-side tagging waar relevant",
          "Integreren van CMP-signalen met GA4, advertentieplatformen en pixels",
          "Uitrollen van QA-scenario's om datalekken en regressies te voorkomen",
        ],
        deliverables: [
          "Privacy-impactoverzicht per platform en event",
          "Geconfigureerde consent implementatie met fallback- en testscenario's",
          "CMP-koppelingen met duidelijke tagging van toestemmingsstatussen",
          "Monitoring- en alertingplan voor consent en datastromen",
        ],
        outcomes: [
          "Compliant tracking zonder verrassingen bij audits",
          "Maximale datadekking binnen toegestane consentstatussen",
          "Duidelijkheid voor marketing, legal en development over verantwoordelijkheden",
        ],
      },
      {
        title: "E-commerce measurement",
        intro: "Voor webshops die hun volledige funnel in kaart willen brengen.",
        whatWeDo: [
          "Uitwerken van product-, checkout- en loyaliteitsevents inclusief parameters",
          "Afstemmen met developers over datalayer pushes en edge cases",
          "Valideren van Enhanced E-commerce events in GA4 en advertentieplatformen",
          "Documenteren van refunds, bundels en promoties voor correcte attributie",
        ],
        deliverables: [
          "Blueprint voor e-commerce events met payloadvoorbeelden",
          "Afgestemde datalayer- en GTM-configuraties per omgeving",
          "QA-rapport met screenshots, network-logs en meetchecks",
          "Dashboardviews voor product-, mandje- en checkoutprestaties",
        ],
        outcomes: [
          "Heldere zichtbaarheid op productprestaties en funnel drop-offs",
          "Betrouwbare omzet- en ROAS-rapportage per kanaal",
          "Sneller prioriteren van ontwikkelwerk dankzij gedeelde meetdefinities",
        ],
      },
      {
        title: "Dashboards & databetrouwbaarheid",
        intro: "Voor teams die één waarheid en snelle signalering van afwijkingen nodig hebben.",
        whatWeDo: [
          "Definiëren van KPI-framework, segmenten en bronnen",
          "Opzetten van Looker Studio of gelijkwaardige dashboards met role-based views",
          "Inbouwen van datakwaliteitscontroles, alerts en regressietests",
          "Coachen van teams in interpretatie en gebruik",
        ],
        deliverables: [
          "KPI- en metriekdefinities inclusief bron- en berekeningslogica",
          "Dashboard(s) met gedeelde filters, exports en toegangsbeheer",
          "Datakwaliteitsmonitor met alerts en releasechecklist",
          "Handleiding en opnames van trainingssessies",
        ],
        outcomes: [
          "Één set cijfers voor marketing, product en bestuur",
          "Snellere detectie van afwijkingen in conversies of omzet",
          "Minder tijd kwijt aan datadiscussies en ad-hoc exports",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Measurement services – GA4, consent & dashboards",
      description:
        "Four focused measurement services: GA4 & GTM setup, GDPR-proof tracking, e-commerce measurement and dashboards with data reliability built in.",
    },
    hero: {
      title: "Measurement & analytics services",
      intro:
        "A dependable measurement foundation aligns marketing, product and legal. We configure GA4 and GTM, secure consent-compliant tracking and deliver dashboards that teams can run with. Pick what you need below and schedule a call right away.",
    },
    services: [
      {
        title: "GA4 & GTM setup",
        intro: "For marketing and engineering teams that need a reliable base for every channel and campaign.",
        whatWeDo: [
          "Assess existing tagging and datalayer against business objectives",
          "Translate funnel steps into GA4 events, parameters and conversions",
          "Configure GTM containers with triggers, variables and release flow",
          "Document naming conventions, permissions and publish checklists",
        ],
        deliverables: [
          "Measurement plan and datalayer mapping per event and parameter",
          "Configured GA4 property with conversions, audiences and channels",
          "GTM container (web and/or server-side) ready for release with test results",
          "Handover session with recording, operations guide and QA checklist",
        ],
        outcomes: [
          "Trusted data to steer channel and campaign performance",
          "Fewer release issues through clear governance",
          "Faster iteration for marketing and development",
        ],
      },
      {
        title: "Consent- & GDPR-proof tracking",
        intro: "For teams that must satisfy privacy requirements without losing measurement fidelity.",
        whatWeDo: [
          "Audit current consent flows, scripts and data paths",
          "Configure Consent Mode v2 and server-side tagging where it adds value",
          "Connect CMP signals to GA4, ad platforms and pixels",
          "Roll out QA scenarios to prevent data leaks and regressions",
        ],
        deliverables: [
          "Privacy impact overview per platform and event",
          "Configured consent implementation with fallback and testing scenarios",
          "CMP integrations with clearly tagged consent states",
          "Monitoring and alert plan for consent and data streams",
        ],
        outcomes: [
          "Compliant tracking with no surprises during audits",
          "Maximum data coverage within approved consent states",
          "Clarity for marketing, legal and engineering on responsibilities",
        ],
      },
      {
        title: "E-commerce measurement",
        intro: "For webshops that want full-funnel visibility.",
        whatWeDo: [
          "Map product, checkout and loyalty events including parameters",
          "Align with developers on datalayer pushes and edge cases",
          "Validate enhanced e-commerce events in GA4 and ad platforms",
          "Document refunds, bundles and promotions for accurate attribution",
        ],
        deliverables: [
          "Blueprint for e-commerce events with payload examples",
          "Aligned datalayer and GTM configurations per environment",
          "QA report with screenshots, network logs and measurement checks",
          "Dashboard views for product, cart and checkout performance",
        ],
        outcomes: [
          "Clear view on product performance and funnel drop-offs",
          "Reliable revenue and ROAS reporting per channel",
          "Faster development prioritisation thanks to shared definitions",
        ],
      },
      {
        title: "Dashboards & data reliability",
        intro: "For teams that need one source of truth and fast anomaly detection.",
        whatWeDo: [
          "Define KPI framework, segments and data sources",
          "Build Looker Studio or equivalent dashboards with role-based views",
          "Embed data quality checks, alerts and regression tests",
          "Coach teams on interpretation and usage",
        ],
        deliverables: [
          "KPI and metric definitions with source and calculation logic",
          "Dashboard(s) with shared filters, exports and access control",
          "Data quality monitor with alerts and release checklist",
          "Guide and recordings of training sessions",
        ],
        outcomes: [
          "One set of numbers for marketing, product and leadership",
          "Faster detection of anomalies in conversions or revenue",
          "Less time spent debating data and creating ad-hoc exports",
        ],
      },
    ],
  },
};

export default function Measurement() {
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
            id="measurement-heading"
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
