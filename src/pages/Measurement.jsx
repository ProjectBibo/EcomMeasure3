import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import ServiceRowsSection from "../components/ServiceRowsSection";
import VideoAnalysisSection from "../components/VideoAnalysisSection";

const content = {
  nl: {
    seo: {
      title: "Measurement-first: GA4 en e-commerce tracking",
      description:
        "We herstellen je GA4, GTM en server-side meting zodat beslissingen niet langer op ruis of aannames rusten.",
    },
    hero: {
      heading: "Betrouwbare meting, geen ruis",
      intro: [
        "Veel GA4-implementaties zijn incompleet of tegenstrijdig. Daardoor stuur je op data die simpelweg niet klopt.",
        "Wij zetten measurement-first neer: GA4, GTM en server-side tracking die reproduceerbaar en uitlegbaar is.",
      ],
      primaryCta: "Kennismaken",
      secondaryCta: "Video-analyse aanvragen",
    },
    trust: {
      bullets: [
        "Fouten en gaten in GA4 worden opgespoord",
        "Datastromen, consent en tagging geordend",
        "Server-side en e-commerce tracking gecontroleerd",
        "Documentatie en uitleg zonder marketingtaal",
      ],
    },
    helpSections: [
      {
        title: "Meetplan en governance",
        body: "We leggen vast welke KPI's, events en datastromen echt iets zeggen. Geen dashboards zonder fundament.",
        bullets: [
          "Heldere definities per KPI en event",
          "Dashboardvragen teruggebracht tot beslissingen",
          "Eigenaarschap en controles per meetpunt",
        ],
        imageLabel: "Structuur voor KPI's en events",
      },
      {
        title: "Technische inrichting zonder ruis",
        body: "We corrigeren tags, consent-koppelingen en server-side routes zodat data consistent en AVG-proof is.",
        bullets: [
          "Consent mode, cookiebanner en GTM op lijn",
          "Validatie van events, conversies en e-commerce",
          "Documentatie en overdracht voor je team",
        ],
        imageLabel: "GTM en consent flows",
      },
    ],
    services: {
      eyebrow: "Diensten",
      title: "Measurement-first begeleiding",
      intro: "Geen losse CRO-tools of experiment-frameworks; alleen de tracking die beslissingen draagbaar maakt.",
      ctaLabel: "Kennismaken",
      list: [
        {
          label: "GA4",
          title: "GA4 herzien en op orde",
          description: "Property-structuur, datastromen en filters hersteld zodat rapportages reproduceerbaar zijn.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "GA4-configuratie zonder ruis",
            "Kernrapporten met duidelijke definities",
            "Overdracht en heldere documentatie",
          ],
          resultTitle: "Resultaat",
          results: [
            "Beslissingen op basis van kloppende data",
            "Teams spreken dezelfde taal over performance",
          ],
        },
        {
          label: "GTM",
          title: "GTM, events en conversies",
          description: "Tagging en datalayer afgestemd op je funnel, inclusief server-side implementatie waar nodig.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Scherpe event- en conversiedefinities",
            "Net ingerichte tags, triggers en datalayers",
            "QA-protocol voor beheer en wijzigingen",
          ],
          resultTitle: "Resultaat",
          results: [
            "Consistente meetpunten over kanalen",
            "Conversies inzichtelijk zonder aannames",
          ],
        },
        {
          label: "Consent",
          title: "Consent en AVG-proof tracking",
          description: "Consent mode, banner en tagging afgestemd op juridisch beleid en praktijk.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Geteste consent flows en documentatie",
            "Implementatieplan voor legal en tech",
            "Logging en controles voor audits",
          ],
          resultTitle: "Resultaat",
          results: [
            "Transparante meting zonder discussies",
            "Kleiner risico op datalekken of boetes",
          ],
        },
        {
          label: "E-commerce",
          title: "Enhanced e-commerce",
          description: "Volledige e-commerce tagging en reporting afgestemd op platform en datalayer, ook server-side.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Mapping van alle e-commerce events",
            "Validatie en tests per stap in checkout",
            "Overzicht van rapportages en definities",
          ],
          resultTitle: "Resultaat",
          results: [
            "Inzicht in mand, checkout en refunds",
            "Optimalisaties gebaseerd op harde data",
          ],
        },
        {
          label: "Dashboards",
          title: "Dashboards gekoppeld aan meetplan",
          description: "Rapportages die exact terugleiden naar definities, zonder interpretatieverschillen.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Meetplan met KPI's en definities",
            "Dashboards en Looker Studio-views",
            "Ritme voor rapportage en review",
          ],
          resultTitle: "Resultaat",
          results: [
            "Eén waarheid over performance",
            "Afwijkingen sneller opgespoord",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video-analyse",
      title: "Vraag een video-analyse aan",
      description:
        "Je ontvangt een persoonlijke video met fouten die we vinden in GA4/GTM en de eerste stappen om ze te herstellen.",
      previewNote: "Voorbeeldframe of thumbnail van een recente analyse.",
      emailPlaceholder: "jij@bedrijf.nl",
      messagePlaceholder: "Specifieke vragen of focusgebieden (optioneel)",
      optional: "Optioneel bericht",
      loading: "Versturen...",
      cta: "Video-analyse aanvragen",
      success: "Dank je. We bekijken je setup en sturen snel de video met bevindingen.",
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
      title: "Measurement-partner die meedenkt",
      body: "Kennismaken kan altijd. We laten zien hoe we GA4, GTM en server-side meten en hoe we rapporteren zonder frictie.",
      cta: "Kennismaken",
    },
  },
  en: {
    seo: {
      title: "Measurement-first: GA4, GTM and e-commerce tracking",
      description:
        "We fix GA4, GTM and server-side tracking so decisions are based on facts instead of noisy data.",
    },
    hero: {
      heading: "Reliable measurement without noise",
      intro: [
        "Many GA4 setups are incomplete or conflicting, which makes optimisation rest on unreliable data.",
        "We deliver measurement-first: GA4, GTM and server-side tracking that is reproducible and explainable.",
      ],
      primaryCta: "Kennismaken",
      secondaryCta: "Video-analyse aanvragen",
    },
    trust: {
      bullets: [
        "GA4 gaps and errors uncovered",
        "Data streams, consent and tagging aligned",
        "Server-side and e-commerce tracking checked",
        "Documentation and guidance without buzzwords",
      ],
    },
    helpSections: [
      {
        title: "Measurement plan and governance",
        body: "We define the KPIs, events and data routes that truly inform decisions. No dashboards without a base.",
        bullets: [
          "Clear definitions per KPI and event",
          "Reporting questions linked to decisions",
          "Ownership and controls per datapoint",
        ],
        imageLabel: "Structure for KPIs and events",
      },
      {
        title: "Clean technical setup",
        body: "We correct tags, consent connections and server-side routes so data stays consistent and GDPR-ready.",
        bullets: [
          "Consent mode, banner and GTM aligned",
          "Validation of events, conversions and e-commerce",
          "Documentation and handover for your team",
        ],
        imageLabel: "GTM and consent flows",
      },
    ],
    services: {
      eyebrow: "Services",
      title: "Measurement-first guidance",
      intro: "No standalone CRO tooling or experimentation frameworks; only tracking that keeps decisions dependable.",
      ctaLabel: "Kennismaken",
      list: [
        {
          label: "GA4",
          title: "GA4 repaired and aligned",
          description: "Property structure, data streams and filters corrected so reporting is reproducible.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Noise-free GA4 configuration",
            "Core reports with clear definitions",
            "Handover and concise documentation",
          ],
          resultTitle: "Result",
          results: [
            "Decisions based on accurate data",
            "Teams share one language on performance",
          ],
        },
        {
          label: "GTM",
          title: "GTM, events and conversions",
          description: "Tagging and data layers aligned to your funnel, including server-side where relevant.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Sharp event and conversion definitions",
            "Structured tags, triggers and data layers",
            "QA protocol for changes and releases",
          ],
          resultTitle: "Result",
          results: [
            "Consistent datapoints across channels",
            "Conversions visible without guesswork",
          ],
        },
        {
          label: "Consent",
          title: "Consent and GDPR-ready tracking",
          description: "Consent mode, banner and tagging aligned with legal policy and day-to-day practice.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Tested consent flows and documentation",
            "Implementation plan for legal and tech",
            "Logging and controls ready for audits",
          ],
          resultTitle: "Result",
          results: [
            "Transparent measurement without debate",
            "Lower risk of data leaks or fines",
          ],
        },
        {
          label: "E-commerce",
          title: "Enhanced e-commerce",
          description: "Complete e-commerce tagging and reporting matched to your platform and data layer, including server-side.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Mapping of every e-commerce event",
            "Validation and tests per checkout step",
            "Overview of reports and definitions",
          ],
          resultTitle: "Result",
          results: [
            "Clarity on basket, checkout and refunds",
            "Optimisation based on solid data",
          ],
        },
        {
          label: "Dashboards",
          title: "Dashboards linked to the plan",
          description: "Reports that trace back to definitions, keeping interpretation consistent.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Measurement plan with KPI definitions",
            "Dashboards and Looker Studio views",
            "Cadence for reporting and review",
          ],
          resultTitle: "Result",
          results: [
            "One source of truth on performance",
            "Faster detection of deviations",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video review",
      title: "Request a video analysis",
      description:
        "You receive a personal video with the GA4/GTM issues we detect and the first steps to fix them.",
      previewNote: "Thumbnail or still from a recent analysis.",
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "Specific questions or focus areas (optional)",
      optional: "Optional note",
      loading: "Sending...",
      cta: "Video-analyse aanvragen",
      success: "Thank you. We will review your setup and send the video with findings.",
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
      title: "Measurement partner for the long run",
      body: "Kennismaken is laagdrempelig. We show how we measure GA4, GTM and server-side and report without friction.",
      cta: "Kennismaken",
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
  const contactLabel = "Kennismaken";

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
