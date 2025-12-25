import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import {
  AlternatingSections,
  FinalCTA,
  HeroSplit,
  ServicesList,
  TrustStrip,
  VideoAnalysisSection,
} from "../components/ServicePageSections";

const content = {
  nl: {
    seo: {
      title: "Betrouwbaar meten als fundament voor groei",
      description:
        "Meetstrategie, GA4, GTM en consent-oplossingen zonder poespas. Wij richten je data-infrastructuur strak en AVG-proof in.",
    },
    hero: {
      title: "Betrouwbaar meten als fundament voor groei",
      intro: [
        "Wij ontwerpen en implementeren een meetinrichting waar management en teams op durven varen.",
        "Eerlijke inzichten, geen dashboards-for-show: alleen de metingen die beslissingen scherper maken.",
      ],
    },
    trustBullets: [
      "Binnen 2 weken helder meetplan",
      "AVG-proof inrichting",
      "Eerlijke, concrete aanbevelingen",
      "Geen ruis: wat je écht moet meten",
    ],
    helpSections: [
      {
        title: "Van audit naar scherp meetplan",
        description:
          "We toetsen je huidige set-up, identificeren gaten en prioriteren welke events en conversies nodig zijn voor betrouwbare sturing.",
        bullets: [
          "Inventarisatie van touchpoints, devices en databronnen",
          "Heldere KPI's en definitions of success per funnelfase",
          "Roadmap voor implementatie en checks",
        ],
        imageAlt: "Audit en meetplan visual",
      },
      {
        title: "Implementatie zonder frictie",
        description:
          "We richten GA4, GTM en consent zo in dat juridische, marketing- en dev-teams aligned zijn. Geen workarounds, wel borging.",
        bullets: [
          "Tagging en events via GTM met degelijke naamgeving",
          "Consentmode + datalagen conform AVG en cookiebanner",
          "Validatie, QA en overdracht voor je team",
        ],
        imageAlt: "Implementatie en QA visual",
      },
    ],
    services: {
      title: "Onze meetdiensten",
      intro:
        "Geen pakketniveaus maar concrete diensten die samen jouw meetfundament vormen.",
      ctaLabel: "Plan een kennismaking",
      rows: [
        {
          title: "GA4 inrichting en configuratie",
          description:
            "Schoon opgezet GA4 met properties, datastromen en filters die passen bij je merk en internationale setup.",
          deliverables: [
            "Herstructureren van properties en datastreams",
            "Custom events en conversies conform businessdoelen",
            "Documentatie met naming conventions",
          ],
          outcomes: [
            "Betrouwbare basis zonder ruissignalen",
            "Team begrijpt de structuur en kan zelf doorpakken",
          ],
        },
        {
          title: "GTM, events en conversies",
          description:
            "Tagging en eventtracking met oog voor performance en privacy. We bouwen liefst datalaag-first, niet pixel-chaos.",
          deliverables: [
            "Taggingplan per touchpoint",
            "Implementatie in GTM met debug en QA",
            "Meetrapport met testresultaten",
          ],
          outcomes: [
            "Heldere eventdata die beslissingen ondersteunt",
            "Minder onderhoud en sneller toevoegen van nieuwe metingen",
          ],
        },
        {
          title: "Consent en AVG-proof meten",
          description:
            "Consentmode, cookiebanner en dataminimalisatie afgestemd met legal. We voorkomen dat data plots wegvalt of niet compliant is.",
          deliverables: [
            "Consentmode implementatie en configuratie",
            "Privacyvriendelijke defaults en fallbackflows",
            "Checklists voor periodieke audits",
          ],
          outcomes: [
            "Meetsetup die juridisch en marketingtechnisch klopt",
            "Continuïteit: minder data-gaten en discussies",
          ],
        },
        {
          title: "Enhanced e-commerce",
          description:
            "Volledige e-commercetracking inclusief product- en checkout-events, afgestemd met dev en backend.",
          deliverables: [
            "Datalayer-specs en mappings",
            "Implementatie en validatie in GA4",
            "Monitoring op kritieke journeys",
          ],
          outcomes: [
            "Inzicht in drop-offs per stap en kanaal",
            "Data die merchandising en performance marketing voedt",
          ],
        },
        {
          title: "Dashboards, meetplan en KPI-definities",
          description:
            "Een meetplan dat teams gebruiken: kern-KPI's, definities en dashboards die beslissingen versnellen.",
          deliverables: [
            "KPI-framework en definities",
            "Dashboard-templates zonder overdaad",
            "Trainingssessie voor adoptie",
          ],
          outcomes: [
            "Iedereen kijkt naar dezelfde cijfers",
            "Snellere besluitvorming met context",
          ],
        },
      ],
    },
    video: {
      title: "Vraag een gratis video-analyse aan",
      description:
        "We nemen een persoonlijke video op waarin we je huidige meetinrichting beoordelen en concrete vervolgstappen delen.",
      labels: {
        website: "Website URL",
        email: "Zakelijk e-mailadres",
        message: "Optioneel bericht",
        messagePlaceholder: "Waar wil je dat we op letten?",
        required: "Dit veld is verplicht.",
        validEmail: "Voer een geldig e-mailadres in.",
        loading: "Verzenden...",
        submit: "Vraag video-analyse aan",
        success: "Dank je! We nemen je aanvraag in behandeling en sturen binnen 2 werkdagen een video.",
      },
    },
    finalCta: {
      title: "Samen bouwen aan betrouwbare data",
      description: "Plan een korte call en we laten zien hoe jouw meetsetup scherper kan.",
      cta: { href: "/contact", label: "Plan een kennismaking" },
    },
  },
  en: {
    seo: {
      title: "Measurement as a reliable growth foundation",
      description:
        "Analytics strategy, GA4, GTM and consent done right. We create a clean, compliant data setup teams can trust.",
    },
    hero: {
      title: "Measurement as a reliable growth foundation",
      intro: [
        "We design and implement a measurement setup leadership can rely on.",
        "Honest insights, no vanity dashboards: only the signals that sharpen decisions.",
      ],
    },
    trustBullets: [
      "Clear measurement plan within 2 weeks",
      "GDPR-proof setup",
      "Direct, concrete recommendations",
      "Focus on what truly matters",
    ],
    helpSections: [
      {
        title: "From audit to crisp measurement plan",
        description:
          "We review your current stack, find gaps and prioritise which events and conversions you need for confident steering.",
        bullets: [
          "Inventory of touchpoints, devices and data sources",
          "Clear KPIs and definitions of success per funnel stage",
          "Implementation roadmap and checks",
        ],
        imageAlt: "Audit and measurement plan visual",
      },
      {
        title: "Implementation without friction",
        description:
          "GA4, GTM and consent set up so legal, marketing and engineering stay aligned. No hacks—proper governance instead.",
        bullets: [
          "Tagging and events via GTM with solid naming",
          "Consent mode + data layers aligned with your CMP",
          "Validation, QA and handover for your team",
        ],
        imageAlt: "Implementation and QA visual",
      },
    ],
    services: {
      title: "Measurement services",
      intro: "No silver packages—just the services that build your measurement backbone.",
      ctaLabel: "Schedule an intro call",
      rows: [
        {
          title: "GA4 setup and configuration",
          description:
            "Clean GA4 properties, data streams and filters tailored to your brand and international footprint.",
          deliverables: [
            "Property and data-stream structure",
            "Custom events and conversions mapped to goals",
            "Documentation with naming conventions",
          ],
          outcomes: [
            "Reliable base without noisy signals",
            "Teams understand the structure and can extend it",
          ],
        },
        {
          title: "GTM, events and conversions",
          description:
            "Tagging and tracking focused on performance and privacy. Data-layer first instead of pixel chaos.",
          deliverables: [
            "Tagging plan per touchpoint",
            "GTM implementation with debug and QA",
            "Measurement report with test outcomes",
          ],
          outcomes: [
            "Event data that backs decisions",
            "Less maintenance and faster future additions",
          ],
        },
        {
          title: "Consent and GDPR-ready measurement",
          description:
            "Consent mode, cookie banner and data minimisation coordinated with legal to avoid drop-offs or non-compliance.",
          deliverables: [
            "Consent mode implementation and configuration",
            "Privacy-friendly defaults and fallbacks",
            "Checklists for recurring audits",
          ],
          outcomes: [
            "Measurement that satisfies legal and marketing",
            "Continuity without data gaps",
          ],
        },
        {
          title: "Enhanced e-commerce",
          description:
            "Full e-commerce tracking including product and checkout events, aligned with dev and backend.",
          deliverables: [
            "Data layer specs and mappings",
            "Implementation and validation in GA4",
            "Monitoring on critical journeys",
          ],
          outcomes: [
            "Clarity on drop-offs by step and channel",
            "Data that powers merchandising and performance marketing",
          ],
        },
        {
          title: "Dashboards, measurement plan and KPIs",
          description: "A plan teams will actually use: core KPIs, definitions and dashboards that accelerate decisions.",
          deliverables: [
            "KPI framework and definitions",
            "Dashboard templates without clutter",
            "Training session for adoption",
          ],
          outcomes: [
            "Everyone looks at the same numbers",
            "Faster decisions with context",
          ],
        },
      ],
    },
    video: {
      title: "Request a free video analysis",
      description:
        "We record a personal walkthrough of your measurement setup with clear next steps.",
      labels: {
        website: "Website URL",
        email: "Business email",
        message: "Optional message",
        messagePlaceholder: "Anything specific we should review?",
        required: "This field is required.",
        validEmail: "Enter a valid email address.",
        loading: "Sending...",
        submit: "Request video analysis",
        success: "Thank you! We'll review your request and send a video within two business days.",
      },
    },
    finalCta: {
      title: "Ready for trustworthy analytics?",
      description: "Book a short intro and we'll outline how to tighten your measurement setup.",
      cta: { href: "/contact", label: "Schedule an intro" },
    },
  },
};

export default function Measurement() {
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="bg-white text-neutral-900">
        <HeroSplit
          title={copy.hero.title}
          intro={copy.hero.intro}
          primaryCta={{ href: "/contact", label: language === "nl" ? "Plan een kennismaking" : "Book a call" }}
          secondaryCta={{
            href: "#video-analyse",
            label: language === "nl" ? "Vraag video-analyse aan" : "Request video analysis",
          }}
          imageAlt={language === "nl" ? "Voorbeeld van measurement visual" : "Measurement visual placeholder"}
        />
        <TrustStrip bullets={copy.trustBullets} />
        <AlternatingSections sections={copy.helpSections} />
        <ServicesList
          title={copy.services.title}
          intro={copy.services.intro}
          services={copy.services.rows}
          ctaLabel={copy.services.ctaLabel}
        />
        <div id="video-analyse">
          <VideoAnalysisSection
            title={copy.video.title}
            description={copy.video.description}
            labels={copy.video.labels}
          />
        </div>
        <div id="contact">
          <FinalCTA title={copy.finalCta.title} description={copy.finalCta.description} cta={copy.finalCta.cta} />
        </div>
      </main>
    </>
  );
}
