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
      title: "Inzicht in gedrag → betere keuzes → betere conversie",
      description:
        "CRO zonder testfabriek: scherpe analyses, UX expert reviews en roadmap die conversie verbetert waar het telt.",
    },
    hero: {
      title: "Inzicht in gedrag → betere keuzes → betere conversie",
      intro: [
        "Wij ontleden gedrag en fricties zodat je keuzes kunt onderbouwen zonder eindeloze experiment-fabriek.",
        "Pragmatische CRO met duidelijke prioriteiten, kwalitatief én kwantitatief.",
      ],
    },
    trustBullets: [
      "Analyse binnen 10 werkdagen",
      "Focus op gedragsinzichten",
      "Geen A/B-test factory",
      "Roadmap met prioriteiten",
    ],
    helpSections: [
      {
        title: "Kwalitatieve scherpte",
        description:
          "Een UX expert review die flows, microcopy en interacties ontleedt. Geen checklist, wel context en sectorkennis.",
        bullets: [
          "Inspectie van cruciale journeys en schermen",
          "Heldere onderbouwing per bevinding",
          "Directe suggesties voor verbetering",
        ],
        imageAlt: "UX expert review visual",
      },
      {
        title: "Kwantitatieve diepgang",
        description:
          "We koppelen GA4, Search Console en gedragstools aan UX bevindingen. Dat maakt prioriteiten glashelder.",
        bullets: [
          "Segmentanalyses op device, kanaal en intent",
          "Zoek- en funneldata naast heatmaps en journey inzichten",
          "Prioritering met impact/effort en risico's",
        ],
        imageAlt: "Data analyse visual",
      },
    ],
    services: {
      title: "Onze CRO-aanpak",
      intro: "Geen experimentfabriek, wel rigoureuze inzichten en een roadmap die uitvoerbaar is.",
      ctaLabel: "Plan een kennismaking",
      rows: [
        {
          title: "UX expert review",
          description:
            "Diepgaande beoordeling van flows, microcopy en states met sector-benchmarks. Gericht op overtuiging én frictie.",
          deliverables: [
            "Toelichting per bevinding met bewijs",
            "Prioriteitenlijst met quick wins",
            "Opnames of voorbeelden ter illustratie",
          ],
          outcomes: [
            "Direct zicht op UX-issues die conversie remmen",
            "Input voor design- en dev-team zonder ruis",
          ],
        },
        {
          title: "Kwantitatieve analyse",
          description:
            "Gedragsdata uit GA4 en Search Console gekoppeld aan on-site gedragsmetingen. We zoeken bewijs, geen aannames.",
          deliverables: [
            "Segmentaties per device/kanaal",
            "Funnel- en zoekanalyse gekoppeld aan sessiegedrag",
            "Rapport met bevindingen en datapunten",
          ],
          outcomes: [
            "Helder waar de grootste verliezen zitten",
            "Keuzes kunnen staven met data",
          ],
        },
        {
          title: "User testing & journey inzichten (optioneel)",
          description:
            "Gerichte user tests of interviews om hypotheses te valideren en kansen te vinden die data niet toont.",
          deliverables: [
            "Testscript en werving (remote of on-site)",
            "Notities, clips en patronen per sessie",
            "Samenvatting met acties per journey",
          ],
          outcomes: [
            "Menselijke context naast je cijfers",
            "Sneller draagvlak voor beslissingen",
          ],
        },
        {
          title: "Prioritering en roadmap",
          description:
            "We vertalen bevindingen naar een heldere roadmap. Geen featurespread, wel gefocuste sprints.",
          deliverables: [
            "Impact/effort-matrix met risicoschatting",
            "Backlog-items die klaar zijn voor refinement",
            "Korte briefing voor design/dev",
          ],
          outcomes: [
            "Weten wat eerst moet voor maximale conversiestap",
            "Teams kunnen direct starten zonder uitzoekwerk",
          ],
        },
      ],
    },
    video: {
      title: "Vraag een gratis video-analyse aan",
      description:
        "We nemen een persoonlijke video op waarin we je UX/CRO-kansen aanwijzen en vervolgstappen delen.",
      labels: {
        website: "Website URL",
        email: "Zakelijk e-mailadres",
        message: "Optioneel bericht",
        messagePlaceholder: "Waar moeten we op inzoomen?",
        required: "Dit veld is verplicht.",
        validEmail: "Voer een geldig e-mailadres in.",
        loading: "Verzenden...",
        submit: "Vraag video-analyse aan",
        success: "Dank je! We nemen je aanvraag in behandeling en sturen binnen 2 werkdagen een video.",
      },
    },
    finalCta: {
      title: "Klaar voor conversie zonder testfabriek?",
      description: "Plan een korte call. We laten zien hoe we gedrag vertalen naar keuzes die opleveren.",
      cta: { href: "/contact", label: "Plan een kennismaking" },
    },
  },
  en: {
    seo: {
      title: "Behaviour insight → better choices → better conversion",
      description:
        "CRO without an experiment factory: sharp analysis, UX expert reviews and a roadmap that improves conversion where it matters.",
    },
    hero: {
      title: "Behaviour insight → better choices → better conversion",
      intro: [
        "We dissect behaviour and friction so you can make informed choices—no endless test factory.",
        "Pragmatic CRO with clear priorities, both qualitative and quantitative.",
      ],
    },
    trustBullets: [
      "Analysis within 10 business days",
      "Behaviour-first insights",
      "No A/B-test factory",
      "Priority-led roadmap",
    ],
    helpSections: [
      {
        title: "Qualitative sharpness",
        description:
          "A UX expert review of flows, microcopy and interactions. Not a checklist—context and sector knowledge included.",
        bullets: [
          "Review of critical journeys and states",
          "Evidence and reasoning per finding",
          "Actionable improvement suggestions",
        ],
        imageAlt: "UX expert review visual",
      },
      {
        title: "Quantitative depth",
        description:
          "We combine GA4, Search Console and behaviour tools with UX findings to make priorities obvious.",
        bullets: [
          "Segmentation by device, channel and intent",
          "Search and funnel data alongside heatmaps",
          "Prioritisation with impact/effort and risks",
        ],
        imageAlt: "Data analysis visual",
      },
    ],
    services: {
      title: "Our CRO approach",
      intro: "Not an experiment factory—rigorous insights and a roadmap teams can ship.",
      ctaLabel: "Schedule an intro call",
      rows: [
        {
          title: "UX expert review",
          description:
            "In-depth assessment of flows, microcopy and states with industry benchmarks. Focused on persuasion and friction.",
          deliverables: [
            "Context and evidence for each finding",
            "Prioritised list with quick wins",
            "Clips or examples to illustrate",
          ],
          outcomes: [
            "Immediate view of UX issues blocking conversion",
            "Clear input for design and engineering",
          ],
        },
        {
          title: "Quantitative analysis",
          description:
            "Behavioural data from GA4 and Search Console tied to on-site behaviour tools. We look for proof, not guesses.",
          deliverables: [
            "Segmentations by device/channel",
            "Funnel and search analysis linked to sessions",
            "Report with findings and datapoints",
          ],
          outcomes: [
            "Clarity on where losses are biggest",
            "Decisions backed by data",
          ],
        },
        {
          title: "User testing & journey insights (optional)",
          description:
            "Targeted user tests or interviews to validate hypotheses and uncover opportunities data won't show.",
          deliverables: [
            "Test script and recruitment (remote or on-site)",
            "Notes, clips and patterns per session",
            "Summary with actions per journey",
          ],
          outcomes: [
            "Human context alongside your numbers",
            "Faster buy-in for decisions",
          ],
        },
        {
          title: "Prioritisation and roadmap",
          description: "We translate insights into a clear roadmap. No feature sprawl—focused sprints instead.",
          deliverables: [
            "Impact/effort matrix with risk assessment",
            "Backlog items ready for refinement",
            "Short briefing for design/dev",
          ],
          outcomes: [
            "Knowing what to tackle first for conversion lift",
            "Teams can start immediately without guesswork",
          ],
        },
      ],
    },
    video: {
      title: "Request a free video analysis",
      description:
        "We'll record a personal video highlighting your CRO opportunities and next steps.",
      labels: {
        website: "Website URL",
        email: "Business email",
        message: "Optional message",
        messagePlaceholder: "What should we zoom in on?",
        required: "This field is required.",
        validEmail: "Enter a valid email address.",
        loading: "Sending...",
        submit: "Request video analysis",
        success: "Thank you! We'll review your request and send a video within two business days.",
      },
    },
    finalCta: {
      title: "Ready for conversion without the test factory?",
      description: "Book a short call. We'll show how we translate behaviour into choices that pay off.",
      cta: { href: "/contact", label: "Schedule an intro" },
    },
  },
};

export default function Cro() {
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
          imageAlt={language === "nl" ? "Voorbeeld van CRO visual" : "CRO visual placeholder"}
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
