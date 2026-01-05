import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import ServiceRowsSection from "../components/ServiceRowsSection";
import VideoAnalysisSection from "../components/VideoAnalysisSection";

const content = {
  nl: {
    seo: {
      title: "Inzicht in gedrag → betere keuzes → betere conversie",
      description:
        "CRO zonder testfabriek: kwalitatieve reviews, kwantitatieve analyse en prioriteiten voor duurzame verbetering.",
    },
    hero: {
      heading: "Inzicht in gedrag → betere keuzes → betere conversie",
      intro: [
        "We onderzoeken gedrag en frictie zodat je weet wat echt effect heeft op conversie, niet alleen op experimentvolume.",
        "Van UX expert review tot roadmap: concrete verbeteringen met duidelijke prioriteit.",
      ],
      primaryCta: "Plan een kennismaking",
      secondaryCta: "Vraag video-analyse aan",
    },
    trust: {
      bullets: [
        "Combinatie van kwalitatief en kwantitatief",
        "Roadmap met prioriteit en haalbaarheid",
        "Heldere aanbevelingen, geen jargon",
      ],
    },
    helpSections: [
      {
        title: "Snel zicht op wat remt en wat werkt",
        body: "We bekijken flows, zoekgedrag en intenties en leggen de grootste fricties bloot voordat je gaat bouwen of testen.",
        bullets: [
          "UX expert review met ±150 checkpoints",
          "Gedrag in analytics en search naast elkaar",
          "Kansen voor sneller vertrouwen en minder afhaken",
        ],
        imageLabel: "Voorbeeld van UX bevindingen",
      },
      {
        title: "Van inzichten naar roadmap",
        body: "We vertalen bevindingen naar prioriteiten, acties en validatie-opties. Praktisch, kort en zonder ruis.",
        bullets: [
          "Prioritering op impact × inspanning",
          "Kant-en-klare user stories of tickets",
          "Optioneel: user testing voor bevestiging",
        ],
        imageLabel: "Roadmap en prioriteiten",
      },
    ],
    services: {
      eyebrow: "Diensten",
      title: "CRO als scherp advies, geen testfabriek",
      intro: "",
      ctaLabel: "Plan een kennismaking",
      list: [
        {
          label: "Review",
          title: "UX expert review",
          description: "Kwalitatieve analyse van flows, pagina's en micro-interacties door een ervaren UX-specialist.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Rapport met duidelijke issues",
            "Screenshots en voorbeelden",
            "Topaanbevelingen per flow",
          ],
          resultTitle: "Resultaat",
          results: [
            "Snelle duidelijkheid over frictie",
            "Verbeteringen die direct uitvoerbaar zijn",
          ],
        },
        {
          label: "Analyse",
          title: "Kwantitatieve analyse",
          description: "Data uit GA4, Search Console en behaviour tools om groeidrivers en knelpunten met cijfers te onderbouwen.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Analyse van flows en bronnen",
            "Heatmap/scroll inzichten waar relevant",
            "Actielijst per kanaal of pagina",
          ],
          resultTitle: "Resultaat",
          results: [
            "Onderbouwde keuzes voor verbeteringen",
            "Focus op kansen met hoogste potentie",
          ],
        },
        {
          label: "User",
          title: "User testing & journey inzichten",
          description: "Optionele user testing of interviews om aannames te toetsen en journeys te verfijnen.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Testplan en scenario's",
            "Samenvatting met quotes en beelden",
            "Belangrijkste aanbevelingen",
          ],
          resultTitle: "Resultaat",
          results: [
            "Bevestiging van wat werkt of hapert",
            "Kwalitatieve input voor ontwerp",
          ],
        },
        {
          label: "Roadmap",
          title: "Prioritering en roadmap",
          description: "Eenduidige lijst met acties, effort-inschatting en volgorde. Geen losse ideeën maar een route.",
          deliverableTitle: "Wat je ontvangt",
          deliverables: [
            "Roadmap met impact/effort",
            "Voorbeelden van copy/design opties",
            "Validatie-advies (test of implementatie)",
          ],
          resultTitle: "Resultaat",
          results: [
            "Helder plan voor komende kwartalen",
            "Betere keuzes zonder A/B-testfabriek",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video-analyse",
      title: "Vraag een gratis video-analyse aan",
      description: "We nemen een persoonlijke video op met wat we zien, waarom het frictie geeft en hoe je het oplost.",
      previewNote: "Plaats voor een thumbnail of still van de analyse.",
      emailPlaceholder: "jij@bedrijf.nl",
      messagePlaceholder: "Welke pagina's of funnel? (optioneel)",
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
    finalCta: null,
  },
  en: {
    seo: {
      title: "Behaviour insight → better decisions → stronger conversion",
      description:
        "CRO without a test factory: qualitative reviews, quantitative analysis and clear priorities for lasting improvement.",
    },
    hero: {
      heading: "Behaviour insight → better decisions → stronger conversion",
      intro: [
        "We study behaviour and friction so you know what truly drives conversion, not just experiment throughput.",
        "From UX expert review to roadmap: concrete improvements with clear priorities.",
      ],
      primaryCta: "Book an intro call",
      secondaryCta: "Request video review",
    },
    trust: {
      bullets: [
        "No A/B-test factory, just sharp insight",
        "Qualitative plus quantitative in balance",
        "Roadmap with priority and feasibility",
        "Clear recommendations without jargon",
      ],
    },
    helpSections: [
      {
        title: "See blockers and wins quickly",
        body: "We review flows, search intent and behaviour to surface the biggest friction before you build or test.",
        bullets: [
          "UX expert review with ~150 checkpoints",
          "Behaviour and search data side by side",
          "Opportunities to build trust and reduce drop-off",
        ],
        imageLabel: "Examples of UX findings",
      },
      {
        title: "From insight to roadmap",
        body: "We translate findings into priorities, actions and validation paths. Practical, short and to the point.",
        bullets: [
          "Prioritisation on impact × effort",
          "Ready-to-use user stories or tickets",
          "Optional: user testing for validation",
        ],
        imageLabel: "Roadmap and priorities",
      },
    ],
    services: {
      eyebrow: "Services",
      title: "CRO as sharp advice, not a test factory",
      intro: "From deep review to route map. We don't build variants; we help you know what to improve.",
      ctaLabel: "Book an intro call",
      list: [
        {
          label: "Review",
          title: "UX expert review",
          description: "Qualitative analysis of flows, pages and micro-interactions by an experienced UX specialist.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Report with clear issues",
            "Screenshots and examples",
            "Top recommendations per flow",
          ],
          resultTitle: "Result",
          results: [
            "Fast clarity on friction",
            "Improvements ready to implement",
          ],
        },
        {
          label: "Analysis",
          title: "Quantitative analysis",
          description:
            "Data from GA4, Search Console and behaviour tools to underpin growth drivers and bottlenecks with numbers.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Flow and source analysis",
            "Heatmap/scroll insights where relevant",
            "Action list per channel or page",
          ],
          resultTitle: "Result",
          results: [
            "Evidence-backed improvement choices",
            "Focus on the highest-potential opportunities",
          ],
        },
        {
          label: "User",
          title: "User testing & journey insight",
          description: "Optional user testing or interviews to validate assumptions and refine journeys.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Test plan and scenarios",
            "Summary with quotes and footage",
            "Key recommendations",
          ],
          resultTitle: "Result",
          results: [
            "Validation of what works or breaks",
            "Qualitative input for design",
          ],
        },
        {
          label: "Roadmap",
          title: "Prioritisation and roadmap",
          description: "A clear list of actions with effort estimates and order. Not loose ideas but a route.",
          deliverableTitle: "What you receive",
          deliverables: [
            "Roadmap with impact/effort",
            "Examples of copy/design options",
            "Validation advice (test or implement)",
          ],
          resultTitle: "Result",
          results: [
            "Clear plan for coming quarters",
            "Better choices without a test factory",
          ],
        },
      ],
    },
    video: {
      eyebrow: "Video review",
      title: "Request a free video analysis",
      description: "We record a personal video with what we see, why it causes friction and how to fix it.",
      previewNote: "Space for a thumbnail or still of the analysis.",
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "Which pages or funnel? (optional)",
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
      title: "Ready for better decisions?",
      body: "Book a short intro. We'll show exactly how we deliver insights and priorities.",
      cta: "Book an intro call",
    },
  },
};

function Hero({ hero }) {
  return (
    <section className="section-shell bg-white">
      <div className="site-container grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">CRO & UX</p>
          <h1 className="text-4xl font-semibold leading-[1.1] text-neutral-900 sm:text-5xl">{hero.heading}</h1>
          <div className="space-y-3 text-lg text-neutral-700">
            {hero.intro.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#video-analyse"
              className="inline-flex items-center justify-center rounded-[4px] border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-500 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/30"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <div className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 bg-neutral-50" />
          <p className="text-sm text-neutral-500">Ruimte voor een hero-afbeelding of visual.</p>
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
      </div>
    </section>
  );
}

export default function Cro() {
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
        <ServiceRowsSection
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          intro={copy.services.intro}
          services={copy.services.list}
        />
        <div id="video-analyse">
          <VideoAnalysisSection copy={copy.video} />
        </div>
        {copy.finalCta && <FinalCta copy={copy.finalCta} />}
      </main>
    </>
  );
}
