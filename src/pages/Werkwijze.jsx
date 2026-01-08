import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Werkwijze",
      description: "Zo werken wij: van inzicht naar gerichte verbetering.",
    },
    hero: {
      title: "Zo werken wij: van inzicht naar gerichte verbetering",
      intro: "Geen losse acties, maar een duidelijke aanpak voor meten, begrijpen en verbeteren.",
    },
    why: {
      title: "Waarom een vaste werkwijze?",
      text: "Elke website is anders, maar de manier waarop je tot goede beslissingen komt niet. Daarom werken we met een vaste werkwijze: eerst begrijpen wat er speelt, daarna verbeteren wat écht impact heeft.",
    },
    steps: [
      {
        title: "1. Begrijpen wat er speelt",
        text: "We starten altijd met context. Wat wil je bereiken, waar loop je tegenaan en welke informatie is er al beschikbaar? Soms is er al data, soms nog niet — beide zijn prima. Dit bepaalt de richting, niet het tempo.",
      },
      {
        title: "2. Inzicht creëren",
        text: "We maken zichtbaar wat er op de website gebeurt. Dat doen we door metingen in te richten of te controleren, én door gedrag te analyseren op pagina’s, flows en interacties. Zo wordt duidelijk waar bezoekers afhaken en waar kansen liggen.",
      },
      {
        title: "3. Kansen scherp maken en prioriteren",
        text: "Inzichten zijn pas waardevol als je weet wat je ermee moet doen. Daarom vertalen we analyses naar concrete verbeterpunten en heldere prioriteiten. Geen lange lijst, maar focus op wat de meeste impact heeft.",
      },
      {
        title: "4. Verbeteren en doorontwikkelen",
        text: "Op basis van die prioriteiten werken we aan verbeteringen in UX, content en structuur. Soms testen we, soms optimaliseren we direct — afhankelijk van wat nodig is. Altijd onderbouwd, altijd doelgericht.",
      },
    ],
    collaboration: {
      title: "Hoe we samenwerken",
      items: [
        "Korte lijnen en duidelijke communicatie",
        "Transparant over keuzes en vervolgstappen",
        "Geen lange contracten, wel heldere afspraken",
        "Samenwerking met marketing, product en development waar nodig",
      ],
    },
    audience: {
      title: "Voor wie deze werkwijze werkt",
      items: [
        "E-commerce teams",
        "Bedrijven die grip willen op data én conversie",
        "Teams die betere beslissingen willen nemen over hun website",
      ],
    },
    cta: {
      text: "Benieuwd hoe deze werkwijze eruitziet voor jouw website?\nPlan een gratis adviesgesprek en we kijken samen waar de grootste kansen liggen.",
      button: "Plan een gratis adviesgesprek",
    },
  },
  en: {
    seo: {
      title: "Werkwijze",
      description: "Zo werken wij: van inzicht naar gerichte verbetering.",
    },
    hero: {
      title: "Zo werken wij: van inzicht naar gerichte verbetering",
      intro: "Geen losse acties, maar een duidelijke aanpak voor meten, begrijpen en verbeteren.",
    },
    why: {
      title: "Waarom een vaste werkwijze?",
      text: "Elke website is anders, maar de manier waarop je tot goede beslissingen komt niet. Daarom werken we met een vaste werkwijze: eerst begrijpen wat er speelt, daarna verbeteren wat écht impact heeft.",
    },
    steps: [
      {
        title: "1. Begrijpen wat er speelt",
        text: "We starten altijd met context. Wat wil je bereiken, waar loop je tegenaan en welke informatie is er al beschikbaar? Soms is er al data, soms nog niet — beide zijn prima. Dit bepaalt de richting, niet het tempo.",
      },
      {
        title: "2. Inzicht creëren",
        text: "We maken zichtbaar wat er op de website gebeurt. Dat doen we door metingen in te richten of te controleren, én door gedrag te analyseren op pagina’s, flows en interacties. Zo wordt duidelijk waar bezoekers afhaken en waar kansen liggen.",
      },
      {
        title: "3. Kansen scherp maken en prioriteren",
        text: "Inzichten zijn pas waardevol als je weet wat je ermee moet doen. Daarom vertalen we analyses naar concrete verbeterpunten en heldere prioriteiten. Geen lange lijst, maar focus op wat de meeste impact heeft.",
      },
      {
        title: "4. Verbeteren en doorontwikkelen",
        text: "Op basis van die prioriteiten werken we aan verbeteringen in UX, content en structuur. Soms testen we, soms optimaliseren we direct — afhankelijk van wat nodig is. Altijd onderbouwd, altijd doelgericht.",
      },
    ],
    collaboration: {
      title: "Hoe we samenwerken",
      items: [
        "Korte lijnen en duidelijke communicatie",
        "Transparant over keuzes en vervolgstappen",
        "Geen lange contracten, wel heldere afspraken",
        "Samenwerking met marketing, product en development waar nodig",
      ],
    },
    audience: {
      title: "Voor wie deze werkwijze werkt",
      items: [
        "E-commerce teams",
        "Bedrijven die grip willen op data én conversie",
        "Teams die betere beslissingen willen nemen over hun website",
      ],
    },
    cta: {
      text: "Benieuwd hoe deze werkwijze eruitziet voor jouw website?\nPlan een gratis adviesgesprek en we kijken samen waar de grootste kansen liggen.",
      button: "Plan een gratis adviesgesprek",
    },
  },
};

export default function Werkwijze() {
  const { language } = useLanguage();
  const t = copy[language] ?? copy.nl;

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} />
      <main className="bg-surface-light pb-20 pt-20">
        <div className="site-container space-y-16">
          <header className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-neutral-700">{t.hero.intro}</p>
          </header>

          <section className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-neutral-900">{t.why.title}</h2>
            <p className="text-neutral-700 leading-relaxed">{t.why.text}</p>
          </section>

          <section className="space-y-6">
            <div className="grid gap-6">
              {t.steps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-3 text-neutral-700 leading-relaxed">{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-neutral-900">{t.collaboration.title}</h2>
            <ul className="list-disc space-y-2 pl-5 text-neutral-700">
              {t.collaboration.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-neutral-900">{t.audience.title}</h2>
            <ul className="list-disc space-y-2 pl-5 text-neutral-700">
              {t.audience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-lg text-neutral-800 whitespace-pre-line">{t.cta.text}</p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/#contact"
                data-variant="primary"
                className="rounded-full bg-brand-yellow px-7 py-3 text-base font-semibold text-neutral-900 shadow-[0_20px_45px_rgba(255,204,2,0.35)] transition-colors duration-200 hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                {t.cta.button}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
