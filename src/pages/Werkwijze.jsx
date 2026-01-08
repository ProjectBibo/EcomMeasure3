import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Werkwijze",
      description: "Zo werken wij: helder, eerlijk en gericht op betere keuzes.",
    },
    hero: {
      title: "Zo werken wij",
      intro:
        "Elke samenwerking start vanuit een concrete vraag of probleem. Soms is dat een meetvraag, soms een conversieprobleem, soms simpelweg twijfel over waar verbetering nodig is. We werken niet volgens een vast stappenplan, maar wel volgens een vaste manier van kijken en beslissen.",
    },
    why: {
      title: "Startpunt: een vraag of probleem",
      text: "Een traject begint meestal met een duidelijke aanleiding. Dat kan een gekozen pakket zijn, een probleem op de website of een vraag die al langer speelt. In het eerste contact bespreken we kort de situatie en bepalen we waar het zinvol is om in te stappen.",
    },
    sections: [
      {
        title: "Verkennen en scherpstellen",
        text: "Na het eerste gesprek brengen we de context in kaart. We kijken naar doelen, bestaande data en hoe de website wordt gebruikt. Soms ligt de focus op metingen, soms op gedrag of UX. Het doel is niet alles tegelijk aanpakken, maar helder krijgen waar de grootste knelpunten zitten.",
      },
      {
        title: "Keuzes maken en richting bepalen",
        text: "Op basis van wat we zien, bepalen we samen waar verbetering het meeste effect heeft. Dat vertalen we naar concrete aandachtspunten en een duidelijke richting. Geen uitgebreide roadmap, maar heldere keuzes waar we op gaan sturen.",
      },
      {
        title: "Verbeteren en bijsturen",
        text: "Vervolgens werken we aan gerichte verbeteringen in UX, content en structuur, of aan het verbeteren van inzicht en metingen. Wat we doen en hoe ver we gaan, hangt af van de vraag en het gekozen pakket. We sturen bij waar nodig en blijven scherp op wat echt bijdraagt.",
      },
      {
        title: "Samenwerking en communicatie",
        text: "Tijdens het traject houden we de lijnen kort. Je weet wat we doen, waarom we het doen en wat de volgende stap is. We werken transparant en stemmen af met marketing-, product- of developmentteams wanneer dat nodig is.",
      },
    ],
    cta: {
      text: "Benieuwd hoe dit er in de praktijk uitziet voor jouw website?\nPlan een gratis adviesgesprek en bespreek je vraag of situatie.",
      button: "Plan een gratis adviesgesprek",
    },
  },
  en: {
    seo: {
      title: "Werkwijze",
      description: "Zo werken wij: helder, eerlijk en gericht op betere keuzes.",
    },
    hero: {
      title: "Zo werken wij",
      intro:
        "Elke samenwerking start vanuit een concrete vraag of probleem. Soms is dat een meetvraag, soms een conversieprobleem, soms simpelweg twijfel over waar verbetering nodig is. We werken niet volgens een vast stappenplan, maar wel volgens een vaste manier van kijken en beslissen.",
    },
    why: {
      title: "Startpunt: een vraag of probleem",
      text: "Een traject begint meestal met een duidelijke aanleiding. Dat kan een gekozen pakket zijn, een probleem op de website of een vraag die al langer speelt. In het eerste contact bespreken we kort de situatie en bepalen we waar het zinvol is om in te stappen.",
    },
    sections: [
      {
        title: "Verkennen en scherpstellen",
        text: "Na het eerste gesprek brengen we de context in kaart. We kijken naar doelen, bestaande data en hoe de website wordt gebruikt. Soms ligt de focus op metingen, soms op gedrag of UX. Het doel is niet alles tegelijk aanpakken, maar helder krijgen waar de grootste knelpunten zitten.",
      },
      {
        title: "Keuzes maken en richting bepalen",
        text: "Op basis van wat we zien, bepalen we samen waar verbetering het meeste effect heeft. Dat vertalen we naar concrete aandachtspunten en een duidelijke richting. Geen uitgebreide roadmap, maar heldere keuzes waar we op gaan sturen.",
      },
      {
        title: "Verbeteren en bijsturen",
        text: "Vervolgens werken we aan gerichte verbeteringen in UX, content en structuur, of aan het verbeteren van inzicht en metingen. Wat we doen en hoe ver we gaan, hangt af van de vraag en het gekozen pakket. We sturen bij waar nodig en blijven scherp op wat echt bijdraagt.",
      },
      {
        title: "Samenwerking en communicatie",
        text: "Tijdens het traject houden we de lijnen kort. Je weet wat we doen, waarom we het doen en wat de volgende stap is. We werken transparant en stemmen af met marketing-, product- of developmentteams wanneer dat nodig is.",
      },
    ],
    cta: {
      text: "Benieuwd hoe dit er in de praktijk uitziet voor jouw website?\nPlan een gratis adviesgesprek en bespreek je vraag of situatie.",
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
              {t.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{section.title}</h3>
                  <p className="mt-3 text-neutral-700 leading-relaxed">{section.text}</p>
                </article>
              ))}
            </div>
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
