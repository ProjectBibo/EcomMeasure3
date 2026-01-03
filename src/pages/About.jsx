import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Over EcomMeasure",
      description: "Persoonlijke achtergrond en motivatie achter EcomMeasure.",
    },
    eyebrow: "Over EcomMeasure",
    title: "Wie er achter EcomMeasure zit",
    intro:
      "Een eenvoudige pagina om jezelf kort voor te stellen. Vertel waarom je dit werk doet en hoe je hier terecht bent gekomen.",
    sections: [
      {
        title: "Persoonlijke achtergrond",
        body: "Schrijf hier een korte alinea over je loopbaan en waar je vandaan komt. Gebruik eventueel 2-3 zinnen om de belangrijkste momenten te beschrijven.",
        hint: "Tip: noem opleiding, eerste stappen in data of marketing, en wat je nu drijft.",
      },
      {
        title: "Motivatie",
        body: "Leg in je eigen woorden uit waarom je graag met meetbaarheid en gebruikersgedrag werkt. Dit mag in een paar zinnen, zonder verkooppraat.",
        hint: "Beschrijf wat je energie geeft in projecten en welke waarden je belangrijk vindt.",
      },
      {
        title: "Ervaring in het kort",
        body: "Vat de belangrijkste rollen of projecten samen. Denk aan teams waar je mee werkte en wat je daar leerde.",
        hint: "Gebruik bullet points of korte zinnen; houd het menselijk en concreet.",
      },
      {
        title: "Wat je hier mag verwachten",
        body: "Vertel wat bezoekers op de site zullen vinden: persoonlijke inzichten, lessen en reflecties. Geen verkoop, wel context over jouw manier van werken.",
        hint: "Sluit af met een uitnodiging om contact op te nemen bij vragen (zonder call-to-action-knop).",
      },
    ],
    closing:
      "Heb je vragen over hoe je werkt of waar je in gelooft? Voeg hier een paar regels tekst toe die laten zien hoe iemand je kan bereiken.",
  },
  en: {
    seo: {
      title: "About EcomMeasure",
      description: "Personal background and motivation behind EcomMeasure.",
    },
    eyebrow: "About EcomMeasure",
    title: "The person behind EcomMeasure",
    intro:
      "A straightforward page to introduce yourself. Share why you do this work and how you arrived here.",
    sections: [
      {
        title: "Personal background",
        body: "Write a short paragraph about your career path and where you come from. Two or three sentences are enough to highlight key moments.",
        hint: "Tip: mention education, first steps in data or marketing, and what drives you now.",
      },
      {
        title: "Motivation",
        body: "Describe in your own words why you enjoy working with measurement and user behavior. Keep it to a few sentences without sales language.",
        hint: "Share what gives you energy in projects and which values matter to you.",
      },
      {
        title: "Experience snapshot",
        body: "Summarize the most relevant roles or projects. Think about the teams you worked with and what you learned there.",
        hint: "Bullet points or short sentences work well; stay human and concrete.",
      },
      {
        title: "What to expect here",
        body: "Explain what visitors will find on this site: personal insights, lessons and reflections. No sales, just context on how you approach work.",
        hint: "Close with a note on how to reach you for questions (no call-to-action button).",
      },
    ],
    closing:
      "Questions about how you work or what you believe in? Add a few lines here that show the best way to get in touch.",
  },
};

export default function About() {
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main className="bg-surface-light pb-20 pt-20">
        <div className="site-container space-y-14">
          <header className="space-y-4 max-w-3xl">
            <span className="pill-badge bg-white/90 text-brand-blue shadow-sm">{copy.eyebrow}</span>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="text-lg text-neutral-700">{copy.intro}</p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {copy.sections.map((section) => (
              <article
                key={section.title}
                className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                <p className="mt-3 text-neutral-700 leading-relaxed">{section.body}</p>
                <p className="mt-4 rounded-lg bg-surface-light px-4 py-3 text-sm text-neutral-600">
                  {section.hint}
                </p>
              </article>
            ))}
          </section>

          <section className="max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{language === "nl" ? "Afsluiting" : "Closing note"}</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">{copy.closing}</p>
          </section>
        </div>
      </main>
    </>
  );
}
