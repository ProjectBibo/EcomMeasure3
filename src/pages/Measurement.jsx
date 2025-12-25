import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const services = {
  nl: {
    seo: {
      title: "Measurement – Databetrouwbare keuzes voor e-commerce",
      description:
        "Vier measurement-diensten: van GA4 & GTM setup tot dashboards en AVG-proof tracking, met concrete output per stap.",
    },
    hero: {
      title: "Measurement voor webshops die op data sturen",
      intro:
        "We maken elke stap in je funnel meetbaar, zorgen dat consent en AVG op orde zijn en leveren dashboards die je direct kunt gebruiken. Zo bouw je aan een betrouwbare basis voor beslissingen en campagnes.",
    },
    services: [
      {
        title: "GA4 & GTM setup",
        summary:
          "Complete inrichting van Google Analytics 4 en Tag Manager zodat je funnel, campagnes en conversies consistent worden vastgelegd.",
        whatWeDo: [
          "Inventariseren van kritieke events per fase: product, checkout, service",
          "Ontwerp van datalayer en naamgeving voor developers en marketers",
          "Configureren van GA4 property, datastreams en conversies",
          "Opzetten van Tag Manager structuur, triggers en variabelen met QA",
        ],
        whatYouReceive: [
          "Datalayer blueprint en tagging plan",
          "Gepubliceerde GA4 property met events en conversies",
          "GTM containers met versies en testflows",
          "Overdrachtsdocument en korte walkthrough",
        ],
        outcomes: [
          "Betrouwbare eventdata voor marketing en productteams",
          "Snellere releases dankzij duidelijke naming en QA",
          "Minder afhankelijkheid van individuele developers",
        ],
      },
      {
        title: "Consent- & AVG-proof tracking",
        summary:
          "Zorgt dat meetpunten voldoen aan AVG en consent-richtlijnen, zonder dat je zicht verliest op performance.",
        whatWeDo: [
          "Toetsen huidige tracking en cookies tegen AVG-vereisten",
          "Inrichten van consent mode en koppeling met CMP",
          "Scheiding van noodzakelijke en marketing tags in GTM",
          "Validatie van datastromen met testscenario's",
        ],
        whatYouReceive: [
          "Rapport met risico's en oplossingsplan",
          "Geconfigureerde consent mode en tag-categorisering",
          "Documentatie van dataverzameling per cookiestatus",
          "Checklists voor toekomstige releases",
        ],
        outcomes: [
          "Tracking die juridisch en intern te verantwoorden is",
          "Behouden zicht op campagnes binnen consent kaders",
          "Lagere kans op datalekken of blokkerende scripts",
        ],
      },
      {
        title: "E-commerce measurement",
        summary:
          "Enhanced e-commerce tracking voor inzicht in productprestaties, winkelmandgedrag en revenue drivers.",
        whatWeDo: [
          "Vertalen van e-commerce journey naar meetbare events",
          "Inrichten van purchase-, refund- en engagementevents",
          "Koppelen met advertentieplatformen voor conversies",
          "Implementeren van alerts bij afwijkingen in omzetdata",
        ],
        whatYouReceive: [
          "Gedetailleerd tagging plan per winkelstap",
          "Technische implementatie in GA4 en GTM",
          "Koppelingen met Google Ads en overige kanalen",
          "Rapportage-sjabloon voor commerce KPI's",
        ],
        outcomes: [
          "Volledig beeld van omzet per kanaal en device",
          "Sneller signaleren van drop-offs in de funnel",
          "Betere input voor merchandising en campagnebudgetten",
        ],
      },
      {
        title: "Dashboards & databetrouwbaarheid",
        summary:
          "Dashboards die direct bruikbaar zijn voor marketing, product en management, plus monitoring op datakwaliteit.",
        whatWeDo: [
          "Inventariseren van KPI's en beslismomenten",
          "Opzetten van Looker Studio dashboards met segmenten",
          "Inrichten van datakwaliteitscontroles en alerts",
          "Documenteren van definities en berekeningen",
        ],
        whatYouReceive: [
          "Dashboard set-up inclusief filters en toegang",
          "Datadefinities en uitleg per metriek",
          "Monitoringplan met alerts en ownership",
          "Korte training voor gebruikers",
        ],
        outcomes: [
          "Eenduidige stuurinformatie voor teams en management",
          "Snelle detectie van afwijkingen in data",
          "Efficiëntere rapportage zonder handmatig werk",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "Measurement – Reliable analytics for ecommerce teams",
      description:
        "Four measurement services: GA4 & GTM setup, GDPR-proof tracking, ecommerce measurement and dashboards with clear outputs.",
    },
    hero: {
      title: "Measurement for ecommerce teams that act on data",
      intro:
        "We capture every step in your funnel, align consent with GDPR requirements and deliver dashboards your teams can use immediately. You get a reliable foundation for decisions and campaigns.",
    },
    services: [
      {
        title: "GA4 & GTM setup",
        summary:
          "End-to-end configuration of Google Analytics 4 and Tag Manager so funnels, campaigns and conversions are captured consistently.",
        whatWeDo: [
          "Map critical events per stage: product, checkout, service",
          "Design datalayer and naming conventions for dev and marketing",
          "Configure GA4 property, data streams and conversions",
          "Set up Tag Manager structure, triggers and variables with QA",
        ],
        whatYouReceive: [
          "Datalayer blueprint and tagging plan",
          "Published GA4 property with events and conversions",
          "GTM containers with versions and testing flows",
          "Handover notes and a short walkthrough",
        ],
        outcomes: [
          "Reliable event data for marketing and product teams",
          "Faster releases through clear naming and QA",
          "Less dependency on individual developers",
        ],
      },
      {
        title: "Consent & GDPR-proof tracking",
        summary:
          "Makes sure tracking complies with GDPR and consent policies while preserving performance insight.",
        whatWeDo: [
          "Assess current tracking and cookies against GDPR requirements",
          "Configure consent mode and integrate with the CMP",
          "Separate necessary and marketing tags inside GTM",
          "Validate data flows with defined test scenarios",
        ],
        whatYouReceive: [
          "Risk report with remediation plan",
          "Configured consent mode and tag categorisation",
          "Documentation of data collection per consent state",
          "Release checklists for future changes",
        ],
        outcomes: [
          "Tracking that is defensible legally and internally",
          "Continued visibility on campaigns within consent rules",
          "Lower risk of data leaks or blocking scripts",
        ],
      },
      {
        title: "Ecommerce measurement",
        summary:
          "Enhanced ecommerce tracking for product performance, basket behaviour and revenue drivers.",
        whatWeDo: [
          "Translate the ecommerce journey into measurable events",
          "Configure purchase, refund and engagement events",
          "Connect conversions to ad platforms",
          "Implement alerts when revenue data deviates",
        ],
        whatYouReceive: [
          "Detailed tagging plan for each shopping step",
          "Technical implementation in GA4 and GTM",
          "Connections to Google Ads and other channels",
          "Reporting template for commerce KPIs",
        ],
        outcomes: [
          "Full view of revenue by channel and device",
          "Faster detection of funnel drop-offs",
          "Better input for merchandising and budget decisions",
        ],
      },
      {
        title: "Dashboards & data reliability",
        summary:
          "Dashboards teams can use from day one, paired with monitoring that keeps data quality in check.",
        whatWeDo: [
          "Inventory of KPIs and decision moments",
          "Build Looker Studio dashboards with segments",
          "Set up data quality checks and alerts",
          "Document metric definitions and calculations",
        ],
        whatYouReceive: [
          "Dashboard setup with filters and access",
          "Metric definitions and explanations",
          "Monitoring plan with alerts and owners",
          "Short training for users",
        ],
        outcomes: [
          "Consistent reporting for teams and leadership",
          "Quick detection of anomalies in data",
          "More efficient reporting without manual work",
        ],
      },
    ],
  },
};

const sectionClasses = "card-surface flex flex-col gap-4 md:gap-5";
const subheadingClass = "text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500";
const bulletClass = "space-y-3 text-sm leading-relaxed text-neutral-700";

export default function Measurement() {
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
