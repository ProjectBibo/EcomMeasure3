import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import VideoAnalysisSection from "../components/VideoAnalysisSection";
import MeasurementPackages from "../components/MeasurementPackages";

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
        "GA4 inrichten",
        "AVG-proof inrichting en beheer",
        "GA4 + GTM + consent op één lijn",
        "Inzicht in al je website bezoekers",
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
        imageSrc: "/Meetplan%20en%20governance.svg",
        imageAlt: "Meetplan en governance visual",
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
    packages: {
      eyebrow: "Diensten",
      title: "GA4 & metingen: pakketten die je meting wél bruikbaar maken",
      intro:
        "We richten GA4, consent en events in zonder ruis. Zo heb je betrouwbare cijfers, korte lijntjes met marketing en sneller antwoord op meetvragen.",
      note: "Geen lange contracten. Pakketprijzen zijn vanaf en hangen af van platform en complexiteit.",
      packages: [
        {
          badge: "Startpakket",
          title: "GA4 Start",
          subtitle: "Kerninrichting van GA4 zodat je basis klopt en gedeeld kan worden.",
          bullets: [
            "GA4-property en datastream netjes ingericht",
            "Baseline events + belangrijkste conversies",
            "Uitsluiten intern verkeer en basisfilters",
            "Koppeling met Google Tag Manager",
            "Korte walkthrough + oplevernotities",
          ],
          extra: {
            getsTitle: "Wat je krijgt",
            gets: ["Schoon ingestelde meting", "Documentatie van keuzes"],
            resultTitle: "Resultaat",
            results: ["Betrouwbare basisdata", "Sneller antwoord op meetvragen"],
          },
          price: "Vanaf €199 (ex btw)",
        },
        {
          badge: "Plus",
          title: "GA4 Start + cookiebanner",
          subtitle: "Start plus consent dat past bij jouw situatie.",
          bullets: [
            "Alles uit GA4 Start",
            "Cookiebanner + consentflow afgestemd",
            "Consent Mode v2 ingericht en getest",
            "Basis koppelingen met Ads/Meta waar nodig",
            "Documentatie van meet- en consentkeuzes",
          ],
          extra: {
            getsTitle: "Wat je krijgt",
            gets: ["Ingerichte banner en consent"],
            resultTitle: "Resultaat",
            results: ["Meting die klopt én compliant is", "Minder datalek/risico"],
          },
          price: "Vanaf €399 (ex btw)",
        },
        {
          badge: "Advanced",
          title: "GA4 Advanced",
          subtitle: "Events en conversies scherp op funnel en micro-acties.",
          bullets: [
            "Alles uit GA4 Start",
            "Funnel events + microconversies (add_to_cart/checkout)",
            "Event-naming + meetplan light",
            "Conversies ingesteld in GA4 en optioneel Ads import",
            "QA-checklist en testscenario's",
          ],
          extra: {
            getsTitle: "Wat je krijgt",
            gets: ["Meetplan light", "Testrapport"],
            resultTitle: "Resultaat",
            results: ["Consistente meetpunten", "Heldere funnel-inzichten"],
          },
          price: "Vanaf €399 (ex btw)",
          note: "* afhankelijk van huidige setup",
        },
        {
          badge: "E-commerce",
          title: "GA4 E-commerce",
          subtitle: "Enhanced e-commerce events en validatie voor je shop.",
          bullets: [
            "Alles uit Advanced of Start + uitbreidingen",
            "Enhanced e-commerce mapping (view_item t/m purchase)",
            "Afstemming met dev/bureau over datalaag",
            "Validatie, debugging en testorders",
            "Rapportage-overzicht waar je wat vindt",
          ],
          extra: {
            getsTitle: "Wat je krijgt",
            gets: ["Eventmapping per stap", "Testscenario's en checks"],
            resultTitle: "Resultaat",
            results: ["Inzicht in basket & checkout", "Betere basis voor CRO"],
          },
          price: "Vanaf €799 (ex btw)",
          note: "* afhankelijk van platform en complexiteit",
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
        imageSrc: "/Meetplan%20en%20governance.svg",
        imageAlt: "Measurement plan and governance visual",
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
    packages: {
      eyebrow: "Services",
      title: "GA4 & measurement: packages that keep your data usable",
      intro:
        "We set up GA4, consent and events with clean governance. That means reliable numbers, faster answers and direct collaboration with marketing.",
      note: "No long contracts. Package prices start here and vary by platform and complexity.",
      packages: [
        {
          badge: "Starter",
          title: "GA4 Start",
          subtitle: "Core GA4 setup so your foundation is trustworthy and shareable.",
          bullets: [
            "GA4 property and data stream configured correctly",
            "Baseline events and key conversions",
            "Internal traffic exclusions and filters",
            "Google Tag Manager connection",
            "Short walkthrough and handover notes",
          ],
          extra: {
            getsTitle: "What you get",
            gets: ["Clean measurement setup", "Documented choices"],
            resultTitle: "Outcome",
            results: ["Reliable baseline data", "Faster answers to measurement questions"],
          },
          price: "From €199 (ex VAT)",
        },
        {
          badge: "Plus",
          title: "GA4 Start + cookie banner",
          subtitle: "Start plus consent that fits your legal reality.",
          bullets: [
            "Everything in GA4 Start",
            "Cookie banner and consent flow tailored",
            "Consent Mode v2 configured and tested",
            "Core ad pixels aligned where needed",
            "Documentation of measurement and consent choices",
          ],
          extra: {
            getsTitle: "What you get",
            gets: ["Live banner and consent flow"],
            resultTitle: "Outcome",
            results: ["Measurement that is correct and compliant", "Lower data-risk"],
          },
          price: "From €399 (ex VAT)",
        },
        {
          badge: "Advanced",
          title: "GA4 Advanced",
          subtitle: "Events and conversions shaped around your funnel and micro actions.",
          bullets: [
            "Everything in GA4 Start",
            "Funnel events and micro conversions (add_to_cart/checkout)",
            "Event naming and light measurement plan",
            "Conversions in GA4 plus optional Google Ads import",
            "QA checklist and test scenarios",
          ],
          extra: {
            getsTitle: "What you get",
            gets: ["Light measurement plan", "Test report"],
            resultTitle: "Outcome",
            results: ["Consistent measurement points", "Clear funnel insights"],
          },
          price: "From €399 (ex VAT)",
          note: "* depends on current setup",
        },
        {
          badge: "E-commerce",
          title: "GA4 E-commerce",
          subtitle: "Enhanced e-commerce tagging plus validation for your store.",
          bullets: [
            "Everything in Advanced or Start plus add-ons",
            "Enhanced e-commerce mapping (view_item through purchase)",
            "Alignment with dev/agency on data layer",
            "Validation, debugging and test orders",
            "Reporting overview so teams know where to look",
          ],
          extra: {
            getsTitle: "What you get",
            gets: ["Event mapping per step", "Test scenarios and checks"],
            resultTitle: "Outcome",
            results: ["Insight into basket and checkout", "Better base for CRO"],
          },
          price: "From €799 (ex VAT)",
          note: "* depends on platform and complexity",
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
              href="#video-analyse"
              className="inline-flex items-center justify-center rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-neutral-200 bg-neutral-50">
            <img
              src="/Foto%20Measurement.svg"
              alt="Measurement visual"
              className="h-full w-full object-cover"
            />
          </div>
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

function HelpSection({ section, reversed }) {
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
        </div>

        <div className="space-y-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-neutral-200 bg-neutral-50">
            {section.imageSrc ? (
              <img
                src={section.imageSrc}
                alt={section.imageAlt || ""}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          {section.imageLabel ? (
            <p className="text-sm text-neutral-500">{section.imageLabel}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function Measurement() {
  const { language } = useLanguage();
  const copy = content[language];

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
          />
        ))}
        <MeasurementPackages section={copy.packages} />
        <div id="video-analyse">
          <VideoAnalysisSection copy={copy.video} />
        </div>
      </main>
    </>
  );
}
