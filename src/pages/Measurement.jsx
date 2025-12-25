import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import ServiceRowsSection from "../components/ServiceRowsSection";
import VideoAnalysisSection from "../components/VideoAnalysisSection";

const content = {
  nl: {
    seo: {
      title: "Betrouwbaar meten als fundament voor groei",
      description:
        "Inrichting van GA4, GTM en consent zodat je meetdata betrouwbaar, AVG-proof en bruikbaar is voor beslissingen.",
    },
    hero: {
      heading: "Betrouwbaar meten als fundament voor groei",
      intro: [
        "We richten analytics zo in dat je cijfers kloppen, gedeeld kunnen worden en elke beslissing onderbouwen.",
        "Van meetplan en consent tot enhanced e-commerce: strak, compliant en toekomstvast.",
      ],
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Vraag video-analyse aan",
    },
    trust: {
      bullets: [
        "Binnen 2 weken een helder meetplan",
        "AVG-proof inrichting en beheer",
        "GA4 + GTM + consent op één lijn",
        "Eerlijke, concrete aanbevelingen",
      ],
    },
    helpSections: [
      {
        title: "Meetplan en governance",
        body: "We vertalen doelen naar duidelijke KPI's, gebeurtenissen en dashboards zodat teams dezelfde taal spreken.",
        bullets: [
          "Meetplan gekoppeld aan doelen",
          "Events en conversies scherp gedefinieerd",
          "Ownership, rollen en kwaliteitsoverzicht",
        ],
        imageLabel: "Structuur voor KPI's en events",
      },
      {
        title: "Technische inrichting zonder ruis",
        body: "We zorgen voor nette tagging, consent-koppelingen en controles zodat je data zuiver en reproduceerbaar blijft.",
        bullets: [
          "Consent modes en datalagen afgestemd",
          "Validatie van events en conversies",
          "Heldere documentatie en overdracht",
        ],
        imageLabel: "GTM en consent flows",
      },
    ],
    services: {
      eyebrow: "Diensten",
      title: "Van basis tot enhanced e-commerce",
      intro: "Geen pakketten of bundels – alleen wat nodig is om jouw meting betrouwbaar, compliant en bruikbaar te maken.",
      ctaLabel: "Plan een kennismaking",
      list: [
        {
          label: "GA4",
          title: "GA4 inrichting en configuratie",
          description: "Property-structuur, datastromen, filters en koppelingen afgestemd op jouw organisatie.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Schoon ingestelde GA4-property",
            "Dashboards met kern-KPI's",
            "Handover en teamwalkthrough",
          ],
          resultTitle: "Resultaat",
          results: [
            "Betrouwbare rapportages",
            "Sneller antwoord op meetvragen",
          ],
        },
        {
          label: "GTM",
          title: "GTM, events en conversies",
          description: "Tagging en events die aansluiten op je funnel, inclusief server-side of consent integraties waar nodig.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Duidelijke eventdefinities",
            "Netjes ingerichte tags en triggers",
            "Controlelijst voor QA",
          ],
          resultTitle: "Resultaat",
          results: [
            "Consistente meetpunten",
            "Heldere conversie- en funnels",
          ],
        },
        {
          label: "Consent",
          title: "Consent en AVG-proof meten",
          description: "Consent mode en cookiebanners afgestemd op jouw situatie, inclusief documentatie voor compliance.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Implementatie- en testenplan",
            "Afgesproken consent flows",
            "Compliance-notes voor legal",
          ],
          resultTitle: "Resultaat",
          results: [
            "Transparante, conforme meting",
            "Minder datalek- en risico zorgen",
          ],
        },
        {
          label: "E-commerce",
          title: "Enhanced e-commerce",
          description: "Volledige e-commerce tagging en rapportage afgestemd op jouw platform en datalayer.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Mapping van alle e-commerce events",
            "Validatie en testscenario's",
            "Overzicht van rapportages",
          ],
          resultTitle: "Resultaat",
          results: [
            "Klarer inzicht in basket en checkout",
            "Betere basis voor optimalisaties",
          ],
        },
        {
          label: "Dashboards",
          title: "Dashboards, meetplan en KPI's",
          description: "Dashboards die de businessvragen beantwoorden en gekoppeld zijn aan een actueel meetplan.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Meetplan met KPI's en definities",
            "Dashboard met de relevante lagen",
            "Ritme voor rapportage en review",
          ],
          resultTitle: "Resultaat",
          results: [
            "Shared language over performance",
            "Snelle signalering van afwijkingen",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video-analyse",
      title: "Vraag een gratis video-analyse aan",
      description: "We nemen een persoonlijke video op met bevindingen, kansen en concrete eerste acties voor jouw site.",
      previewNote: "Ruimte voor een voorbeeldframe of thumbnail van de video-analyse.",
      emailPlaceholder: "jij@bedrijf.nl",
      messagePlaceholder: "Specifieke vragen of focusgebieden (optioneel)",
      optional: "Optioneel bericht",
      loading: "Versturen...",
      cta: "Vraag video-analyse aan",
      success: "Dank je! We nemen je aanvraag in behandeling en sturen snel een bevestiging.",
      fields: {
        url: { label: "Website URL" },
        email: { label: "Zakelijk e-mailadres" },
        message: { label: "Bericht" },
      },
      errors: {
        urlRequired: "Vul je website in.",
        emailRequired: "Vul je zakelijke e-mailadres in.",
        emailInvalid: "Gebruik een geldig e-mailadres.",
      },
    },
    finalCta: {
      title: "Meten dat beslissingen versnelt",
      body: "Plan een korte kennismaking. We laten je zien hoe we meten, documenteren en opleveren.",
      cta: "Plan een kennismaking",
    },
  },
  en: {
    seo: {
      title: "Reliable measurement as the foundation for growth",
      description:
        "GA4, GTM and consent setups that keep your data reliable, compliant and ready for decision-making.",
    },
    hero: {
      heading: "Reliable measurement as the foundation for growth",
      intro: [
        "We align analytics so numbers are trustworthy, shareable and ready to inform every decision.",
        "From measurement plans and consent to enhanced e-commerce: precise, compliant and future-proof.",
      ],
      primaryCta: "Book an intro call",
      secondaryCta: "Request video review",
    },
    trust: {
      bullets: [
        "Clear measurement plan within 2 weeks",
        "GDPR-proof setup and governance",
        "GA4 + GTM + consent aligned",
        "Honest, concrete recommendations",
      ],
    },
    helpSections: [
      {
        title: "Measurement plan and governance",
        body: "We translate objectives into KPIs, events and dashboards so teams operate from the same playbook.",
        bullets: [
          "Measurement plan tied to goals",
          "Events and conversions defined tightly",
          "Ownership, roles and quality checks",
        ],
        imageLabel: "Structure for KPIs and events",
      },
      {
        title: "Clean technical setup",
        body: "Tagging, consent connections and controls that keep your data clean and reproducible.",
        bullets: [
          "Consent modes and data layers aligned",
          "Validation of events and conversions",
          "Clear documentation and handover",
        ],
        imageLabel: "GTM and consent flows",
      },
    ],
    services: {
      eyebrow: "Services",
      title: "From fundamentals to enhanced e-commerce",
      intro: "No bundles or packages – only what you need to keep measurement reliable, compliant and actionable.",
      ctaLabel: "Book an intro call",
      list: [
        {
          label: "GA4",
          title: "GA4 setup and configuration",
          description: "Property structure, data streams, filters and integrations tailored to your organisation.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Clean GA4 property setup",
            "Dashboards with core KPIs",
            "Handover and team walkthrough",
          ],
          resultTitle: "Result",
          results: [
            "Trustworthy reporting",
            "Faster answers to measurement questions",
          ],
        },
        {
          label: "GTM",
          title: "GTM, events and conversions",
          description: "Tagging and events aligned to your funnel, including server-side or consent integrations where needed.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Clear event definitions",
            "Well-structured tags and triggers",
            "QA checklist",
          ],
          resultTitle: "Result",
          results: [
            "Consistent measurement points",
            "Clear conversion and funnel views",
          ],
        },
        {
          label: "Consent",
          title: "Consent and GDPR-ready tracking",
          description: "Consent mode and cookie banners tailored to your situation, with documentation for compliance.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Implementation and testing plan",
            "Agreed consent flows",
            "Compliance notes for legal",
          ],
          resultTitle: "Result",
          results: [
            "Transparent, compliant measurement",
            "Less risk and fewer data concerns",
          ],
        },
        {
          label: "E-commerce",
          title: "Enhanced e-commerce",
          description: "Complete e-commerce tagging and reporting tailored to your platform and data layer.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Mapping of all e-commerce events",
            "Validation and testing scenarios",
            "Overview of reporting views",
          ],
          resultTitle: "Result",
          results: [
            "Clear insight into basket and checkout",
            "Better base for optimisation",
          ],
        },
        {
          label: "Dashboards",
          title: "Dashboards, plan and KPIs",
          description: "Dashboards that answer business questions and tie back to an up-to-date measurement plan.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Measurement plan with KPI definitions",
            "Dashboard with relevant layers",
            "Cadence for reporting and review",
          ],
          resultTitle: "Result",
          results: [
            "Shared language on performance",
            "Quick signal when metrics shift",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video review",
      title: "Request a free video analysis",
      description:
        "We record a personal video with findings, opportunities and immediate first actions for your site.",
      previewNote: "Space for a thumbnail or still of a recent video analysis.",
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "Specific questions or focus areas (optional)",
      optional: "Optional note",
      loading: "Sending...",
      cta: "Request video review",
      success: "Thank you! We received your request and will follow up shortly.",
      fields: {
        url: { label: "Website URL" },
        email: { label: "Business email" },
        message: { label: "Message" },
      },
      errors: {
        urlRequired: "Please add your website.",
        emailRequired: "Please add your business email.",
        emailInvalid: "Use a valid email address.",
      },
    },
    finalCta: {
      title: "Measurement that speeds up decisions",
      body: "Book a short intro. We will show how we measure, document and deliver.",
      cta: "Book an intro call",
    },
  },
};

function Hero({ hero }) {
  return (
    <section className="section-shell bg-white">
      <div className="site-container grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Measurement</p>
          <h1 className="text-4xl font-semibold leading-[1.1] text-neutral-900 sm:text-5xl">{hero.heading}</h1>
          <div className="space-y-3 text-lg text-neutral-700">
            {hero.intro.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#video-analyse"
              className="inline-flex items-center justify-center rounded-[4px] border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-500 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/30"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 bg-neutral-50" />
          <p className="mt-3 text-sm text-neutral-500">Ruimte voor een hero-afbeelding of visual.</p>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ bullets }) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-6">
      <div className="site-container grid gap-4 text-sm font-semibold text-neutral-800 sm:grid-cols-4">
        {bullets.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-px flex-1 max-w-[24px] bg-neutral-400" aria-hidden />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HelpSection({ section, reversed, contactLabel }) {
  return (
    <section className="section-shell bg-white">
      <div className={`site-container grid gap-8 lg:grid-cols-2 ${reversed ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-neutral-900">{section.title}</h2>
          <p className="text-neutral-700">{section.body}</p>
          <ul className="space-y-2 text-sm text-neutral-800">
            {section.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-8 bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-600"
          >
            {contactLabel}
          </a>
        </div>

        <div className="space-y-3">
          <div className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 bg-neutral-50" />
          <p className="text-sm text-neutral-500">{section.imageLabel}</p>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ copy }) {
  return (
    <section className="section-shell border-t border-neutral-200 bg-neutral-50/70">
      <div className="site-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-neutral-900">{copy.title}</h3>
          <p className="text-neutral-700">{copy.body}</p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
        >
          {copy.cta}
        </a>
      </div>
    </section>
  );
}

export default function Measurement() {
  const { language } = useLanguage();
  const copy = content[language];
  const contactLabel = language === "nl" ? "Plan kennismaking" : "Book intro call";

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="bg-white">
        <Hero hero={copy.hero} />
        <TrustStrip bullets={copy.trust.bullets} />
        {copy.helpSections.map((section, index) => (
          <HelpSection
            key={section.title}
            section={section}
            reversed={index % 2 === 1}
            contactLabel={contactLabel}
          />
        ))}
        <ServiceRowsSection
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          intro={copy.services.intro}
          services={copy.services.list}
          ctaLabel={copy.services.ctaLabel}
          ctaHref="/contact"
        />
        <div id="video-analyse">
          <VideoAnalysisSection copy={copy.video} />
        </div>
        <FinalCta copy={copy.finalCta} />
      </main>
    </>
  );
}
