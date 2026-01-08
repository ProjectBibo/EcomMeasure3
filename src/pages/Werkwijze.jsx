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
        "We werken niet volgens een vast stappenplan. Elke website en situatie is anders. Wat wel vaststaat, is hoe we kijken, hoe we keuzes maken en waar we op sturen.",
    },
    why: {
      title: "Geen vaste start, wel vaste principes",
      text: "We starten niet altijd op dezelfde plek. Soms begint een traject bij data, soms bij gedrag, soms bij een concrete frustratie of vraag. De situatie bepaalt waar we instappen, niet een vooraf bedacht proces.",
    },
    sections: [
      {
        title: "Begrijpen vóór aannemen",
        text: "We kijken eerst hoe een website daadwerkelijk wordt gebruikt. Dat doen we door bestaande data te beoordelen, gedrag te analyseren en aannames te toetsen aan wat er echt gebeurt. Niet om alles perfect te maken, maar om richting te krijgen.",
      },
      {
        title: "Van observatie naar keuzes",
        text: "Inzichten zijn pas waardevol als ze leiden tot keuzes. We vertalen wat we zien naar concrete aandachtspunten en bepalen waar verbetering het meeste effect heeft. Focus staat altijd boven volledigheid.",
      },
      {
        title: "Gericht verbeteren",
        text: "Op basis van die keuzes werken we aan verbeteringen in UX, content en structuur. Wat we aanpassen verschilt per situatie, maar het doel is altijd hetzelfde: frictie verminderen en prestaties verbeteren op plekken die ertoe doen.",
      },
      {
        title: "Transparante samenwerking",
        text: "We werken met korte lijnen en duidelijke afspraken. Je weet wat we doen, waarom we het doen en wat de volgende stap is. Geen vaste trajecten, wel helderheid en voortgang.",
      },
    ],
    cta: {
      text: "Benieuwd hoe deze werkwijze eruitziet voor jouw website?\nPlan een gratis adviesgesprek en we kijken samen waar de grootste kansen liggen.",
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
        "We werken niet volgens een vast stappenplan. Elke website en situatie is anders. Wat wel vaststaat, is hoe we kijken, hoe we keuzes maken en waar we op sturen.",
    },
    why: {
      title: "Geen vaste start, wel vaste principes",
      text: "We starten niet altijd op dezelfde plek. Soms begint een traject bij data, soms bij gedrag, soms bij een concrete frustratie of vraag. De situatie bepaalt waar we instappen, niet een vooraf bedacht proces.",
    },
    sections: [
      {
        title: "Begrijpen vóór aannemen",
        text: "We kijken eerst hoe een website daadwerkelijk wordt gebruikt. Dat doen we door bestaande data te beoordelen, gedrag te analyseren en aannames te toetsen aan wat er echt gebeurt. Niet om alles perfect te maken, maar om richting te krijgen.",
      },
      {
        title: "Van observatie naar keuzes",
        text: "Inzichten zijn pas waardevol als ze leiden tot keuzes. We vertalen wat we zien naar concrete aandachtspunten en bepalen waar verbetering het meeste effect heeft. Focus staat altijd boven volledigheid.",
      },
      {
        title: "Gericht verbeteren",
        text: "Op basis van die keuzes werken we aan verbeteringen in UX, content en structuur. Wat we aanpassen verschilt per situatie, maar het doel is altijd hetzelfde: frictie verminderen en prestaties verbeteren op plekken die ertoe doen.",
      },
      {
        title: "Transparante samenwerking",
        text: "We werken met korte lijnen en duidelijke afspraken. Je weet wat we doen, waarom we het doen en wat de volgende stap is. Geen vaste trajecten, wel helderheid en voortgang.",
      },
    ],
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
