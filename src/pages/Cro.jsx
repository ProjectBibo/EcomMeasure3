import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import VideoAnalysisSection from "../components/VideoAnalysisSection";
import CroServicesSection from "../components/CroServicesSection";

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
      title: "CRO-diensten gericht op inzicht, niet op volume",
      intro:
        "Geen testfabriek of losse experimenten. Deze CRO-diensten zijn bedoeld om scherp inzicht te krijgen in gedrag, knelpunten en groeikansen — zodat optimalisaties onderbouwd en doelgericht zijn.",
      services: [
        {
          badge: "Review",
          title: "Kwalitatieve analyse via UX expert review",
          description:
            "Een grondige beoordeling van de website of funnel door een ervaren UX- en usability specialist, gericht op het vinden van frictie, onduidelijkheid en gemiste conversiekansen.",
          price: "Vanaf €750 (ex btw)",
          blocks: [
            {
              title: "Wat we doen",
              items: [
                "Systematische inspectie van gebruiksvriendelijkheid en conversiepunten",
                "Analyse van navigatie, content, formulieren, vertrouwen en interactie",
                "Beoordeling op bewezen UX-principes en best practices",
                "Uitgebreide checklist met tientallen concrete aandachtspunten",
              ],
            },
            {
              title: "Je ontvangt",
              items: [
                "Een overzichtelijk rapport (PDF) met bevindingen",
                "Concrete verbeterpunten per pagina of flow",
                "Prioritering op basis van impact en inspanning",
                "Heldere toelichting van de belangrijkste issues",
              ],
            },
            {
              title: "Resultaat",
              items: [
                "Direct inzicht in knelpunten",
                "Sneller beslissen wat eerst aangepakt moet worden",
                "Sterkere basis voor CRO- en UX-verbeteringen",
              ],
            },
          ],
        },
        {
          badge: "Analyse",
          title: "Kwantitatieve gedragsanalyse voor groeikansen",
          description:
            "Analyse van grootschalig gebruikersgedrag om patronen, afhakers en optimalisatiemogelijkheden bloot te leggen.",
          price: "Vanaf €1200 (ex btw)",
          blocks: [
            {
              title: "Wat we doen",
              items: [
                "Analyse van gebruikersgedrag via analytics (o.a. GA4, Search data)",
                "Onderzoek naar funnels, pagina-interacties en drop-offs",
                "Gebruik van visuele gedragstools (heatmaps, scroll- en clickdata)",
                "Combinatie van data uit meerdere bronnen voor context",
              ],
            },
            {
              title: "Je ontvangt",
              items: [
                "Heldere inzichten in waar gebruikers vastlopen of afhaken",
                "Overzicht van pagina’s en stappen met de meeste optimalisatiepotentie",
                "Concreet overzicht van kansen onderbouwd met data",
              ],
            },
            {
              title: "Resultaat",
              items: [
                "Objectieve prioriteiten voor CRO",
                "Betere onderbouwing voor UX- en conversieverbeteringen",
                "Minder aannames, meer richting",
              ],
            },
          ],
        },
        {
          badge: "User testing",
          title: "User testing over de volledige customer journey",
          description:
            "Testen met echte gebruikers om te begrijpen waar verwachtingen, intenties en realiteit uit elkaar lopen.",
          price: "Vanaf €2100 (ex btw)",
          blocks: [
            {
              title: "Wat we doen",
              items: [
                "Opzetten van een gestructureerd testplan met duidelijke doelen",
                "Testen met meerdere deelnemers op desktop en mobiel",
                "Uitvoering remote of on-site, afhankelijk van situatie",
                "Analyse van gedrag, feedback en terugkerende patronen",
              ],
            },
            {
              title: "Je ontvangt",
              items: [
                "Concreet overzicht van problemen en kansen",
                "Actiepunten gekoppeld aan context en locatie in de funnel",
                "Prioriteitenlijst met quick wins en verbeteringen",
              ],
            },
            {
              title: "Resultaat",
              items: [
                "Direct inzicht vanuit het perspectief van echte gebruikers",
                "Sneller draagvlak voor verbeteringen",
                "Betere beslissingen in UX- en CRO-trajecten",
              ],
            },
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
      title: "CRO services aimed at insight, not volume",
      intro:
        "No test factory or loose experiments. These CRO services are designed to deliver sharp insight into behaviour, friction points and growth opportunities — so optimisation is evidence-based and purposeful.",
      services: [
        {
          badge: "Review",
          title: "Qualitative analysis via UX expert review",
          description:
            "A thorough review of your site or funnel by an experienced UX and usability specialist, focused on friction, confusion and missed conversion opportunities.",
          price: "From €750 (ex VAT)",
          blocks: [
            {
              title: "What we do",
              items: [
                "Systematic inspection of usability and conversion points",
                "Analysis of navigation, content, forms, trust and interactions",
                "Assessment against proven UX principles and best practices",
                "Extensive checklist with dozens of concrete checkpoints",
              ],
            },
            {
              title: "You receive",
              items: [
                "A clear report (PDF) with findings",
                "Concrete improvements per page or flow",
                "Prioritisation based on impact and effort",
                "Straightforward explanation of the key issues",
              ],
            },
            {
              title: "Outcome",
              items: [
                "Immediate insight into bottlenecks",
                "Faster decisions on what to tackle first",
                "Stronger foundation for CRO and UX improvements",
              ],
            },
          ],
        },
        {
          badge: "Analysis",
          title: "Quantitative behaviour analysis for growth",
          description:
            "Analysis of large-scale user behaviour to uncover patterns, drop-offs and optimisation opportunities.",
          price: "From €1200 (ex VAT)",
          blocks: [
            {
              title: "What we do",
              items: [
                "Analyse user behaviour via analytics (incl. GA4, search data)",
                "Study funnels, page interactions and drop-offs",
                "Use behaviour tools like heatmaps, scroll and click data",
                "Combine data from multiple sources for context",
              ],
            },
            {
              title: "You receive",
              items: [
                "Clear insight into where users stall or drop off",
                "Overview of pages and steps with highest optimisation potential",
                "Concrete list of opportunities backed by data",
              ],
            },
            {
              title: "Outcome",
              items: [
                "Objective priorities for CRO",
                "Better rationale for UX and conversion improvements",
                "Fewer assumptions, more direction",
              ],
            },
          ],
        },
        {
          badge: "User testing",
          title: "User testing across the full customer journey",
          description:
            "Testing with real users to see where expectations, intent and reality diverge.",
          price: "From €2100 (ex VAT)",
          blocks: [
            {
              title: "What we do",
              items: [
                "Set up a structured test plan with clear goals",
                "Test with multiple participants on desktop and mobile",
                "Run sessions remote or on-site depending on context",
                "Analyse behaviour, feedback and recurring patterns",
              ],
            },
            {
              title: "You receive",
              items: [
                "Concise overview of issues and opportunities",
                "Action points tied to context and funnel location",
                "Prioritised list with quick wins and improvements",
              ],
            },
            {
              title: "Outcome",
              items: [
                "Immediate insight from real-user perspective",
                "Faster buy-in for improvements",
                "Better decisions in UX and CRO work",
              ],
            },
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
              className="inline-flex items-center justify-center rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <img
            src="/Foto CRO.svg"
            alt="CRO analysis examples"
            className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 object-cover"
          />
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
        <CroServicesSection section={copy.services} />
        <div id="video-analyse">
          <VideoAnalysisSection copy={copy.video} />
        </div>
        {copy.finalCta && <FinalCta copy={copy.finalCta} />}
      </main>
    </>
  );
}
