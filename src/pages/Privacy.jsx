import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    seo: {
      title: "Privacy – Eenvoudig beleid",
      description: "Lees hoe EcomMeasure omgaat met gegevens en hoe je contact kunt opnemen.",
    },
    badge: "Privacy",
    heading: "Privacy in begrijpelijke taal",
    intro:
      "We verzamelen alleen de gegevens die nodig zijn om je te helpen en je ervaring te verbeteren. Hieronder lees je kort welke gegevens dat zijn en wat we ermee doen.",
    sections: [
      {
        title: "Welke gegevens we verzamelen",
        body:
          "Contactgegevens die je zelf invult (zoals naam, e-mail en telefoonnummer) en basisgebruik van de website via analytische tools.",
      },
      {
        title: "Waarom we die gegevens nodig hebben",
        body:
          "Om je aanvraag of bericht te beantwoorden, offertes voor te bereiden en de website te verbeteren met geanonimiseerde inzichten.",
      },
      {
        title: "Hoe we gegevens opslaan",
        body:
          "Gegevens worden bewaard in beveiligde systemen. We delen niets met derden buiten de essentiële leveranciers die nodig zijn om de site en formulieren te laten werken.",
      },
      {
        title: "Vragen of verzoeken",
        body:
          "Stuur een e-mail naar info@ecommeasure.com als je gegevens wilt inzien, aanpassen of laten verwijderen. We reageren zo snel mogelijk.",
      },
    ],
  },
  en: {
    seo: {
      title: "Privacy – Simple policy",
      description: "Learn how EcomMeasure handles data and how to get in touch.",
    },
    badge: "Privacy",
    heading: "Privacy in plain language",
    intro:
      "We only collect what is needed to help you and to improve your experience. Below is a short overview of which data we collect and why.",
    sections: [
      {
        title: "What we collect",
        body:
          "Contact details you provide (such as name, email and phone number) and basic website usage through analytics tools.",
      },
      {
        title: "Why we need it",
        body:
          "To respond to your request or message, prepare proposals and improve the site with anonymised insights.",
      },
      {
        title: "How we store data",
        body:
          "Data is stored in secure systems. We don’t share anything with third parties beyond essential providers needed to run the site and forms.",
      },
      {
        title: "Questions or requests",
        body:
          "Email info@ecommeasure.com if you want to view, update or delete your data. We will respond as quickly as possible.",
      },
    ],
  },
};

export default function Privacy() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const t = copy[language];

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} />
      <main role="main" className="bg-surface-light pb-20 pt-20">
        <div className="mx-auto max-w-4xl px-6 space-y-10">
          <header className="space-y-4">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue"
            >
              {t.badge}
            </motion.span>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
              className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl"
            >
              {t.heading}
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.14, duration: 0.6 }}
              className="max-w-3xl text-lg text-neutral-700"
            >
              {t.intro}
            </motion.p>
          </header>

          <section className="space-y-4">
            {t.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, margin: "-10%" }}
                transition={shouldReduceMotion ? undefined : { duration: 0.45, delay: index * 0.05 }}
                className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur"
              >
                <h2 className="text-lg font-semibold text-neutral-900">{section.title}</h2>
                <p className="mt-2 text-base text-neutral-800">{section.body}</p>
              </motion.article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
