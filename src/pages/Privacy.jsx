import React from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Privacy",
      description: "Informatie over welke gegevens EcomMeasure verzamelt en waarom.",
    },
    title: "Privacyverklaring",
    intro: "Een compacte uitleg van welke gegevens we gebruiken en hoe we daarmee omgaan.",
    sections: [
      {
        heading: "Welke gegevens worden verzameld",
        body: "Basiscontactgegevens die je zelf invult (zoals naam en e-mail) en analytische gegevens die anoniem inzicht geven in websitegebruik.",
      },
      {
        heading: "Waarom deze gegevens nodig zijn",
        body: "Om vragen te beantwoorden, afspraken te plannen en de website te verbeteren op basis van anonieme patronen.",
      },
      {
        heading: "Hoe gegevens worden bewaard",
        body: "Contactinformatie wordt veilig opgeslagen bij de gebruikte tools (zoals e-mail of formulierproviders) en alleen zolang nodig. Analytische data wordt geaggregeerd en niet gedeeld met derden voor advertenties.",
      },
      {
        heading: "Vragen of verzoeken",
        body: "Stuur een e-mail naar het contactadres op deze site voor inzage of verwijdering van je gegevens. Je ontvangt een reactie binnen een redelijke termijn.",
      },
    ],
  },
  en: {
    seo: {
      title: "Privacy",
      description: "Information about the data EcomMeasure collects and why.",
    },
    title: "Privacy policy",
    intro: "A short explanation of the data we use and how we handle it.",
    sections: [
      {
        heading: "What data is collected",
        body: "Basic contact details you provide (such as name and email) and anonymised analytics that show how the site is used.",
      },
      {
        heading: "Why this data is needed",
        body: "To answer questions, schedule calls, and improve the site based on anonymous patterns.",
      },
      {
        heading: "How data is stored",
        body: "Contact information is kept securely in the tools we use (like email or form providers) and only for as long as needed. Analytics are aggregated and never shared with third parties for advertising.",
      },
      {
        heading: "Questions or requests",
        body: "Email the contact address on this site to view or delete your information. You will receive a reply within a reasonable timeframe.",
      },
    ],
  },
};

export default function Privacy() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} />
      <main className="bg-surface-light pb-16 pt-20">
        <div className="site-container space-y-10">
          <header className="max-w-3xl space-y-4">
            <span className="pill-badge bg-white/90 text-brand-blue shadow-sm">Privacy</span>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">{t.title}</h1>
            <p className="text-lg text-neutral-700">{t.intro}</p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {t.sections.map((section) => (
              <article
                key={section.heading}
                className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-neutral-900">{section.heading}</h2>
                <p className="mt-3 text-neutral-700 leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
