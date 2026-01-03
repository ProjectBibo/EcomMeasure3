import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Over EcomMeasure – Persoonlijk verhaal",
      description: "Lees in het kort wie achter EcomMeasure zit en waarom de aanpak werkt.",
    },
    badge: "Over EcomMeasure",
    heading: "Wie er achter EcomMeasure zit",
    intro:
      "Een eenvoudige persoonlijke pagina: gebruik dit als startpunt om kort te vertellen wie je bent, waarom je dit werk doet en wat je drijft.",
    sections: [
      {
        title: "Persoonlijke achtergrond",
        helper:
          "Schrijf hier een korte bio over jezelf. Vertel in een paar zinnen waar je vandaan komt, welke rollen je hebt gehad en waarom je nu EcomMeasure runt.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et sapien et sapien tristique luctus. Vestibulum sed mattis mauris, vitae finibus nunc.",
      },
      {
        title: "Motivatie",
        helper:
          "Leg uit waarom data en optimalisatie belangrijk voor je zijn. Denk aan een moment waarop je merkte dat teams beter samenwerken met duidelijke metingen.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo id lacus viverra hendrerit sed ut arcu.",
      },
      {
        title: "Ervaring en focus",
        helper:
          "Beschrijf kort de belangrijkste ervaringen die relevant zijn: projecten, sectoren of technieken. Noem hier alleen de highlights die jou typeren.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper, leo in euismod suscipit, arcu arcu ultrices velit, et pharetra neque leo eget est.",
      },
      {
        title: "Wat je hier mag verwachten",
        helper:
          "Geef aan welke updates, inzichten of persoonlijke notities bezoekers op deze pagina kunnen vinden. Houd het menselijk en zonder verkooppraat.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere, lectus non egestas placerat, enim dui sodales erat, ac luctus est magna non turpis.",
      },
    ],
    closingTitle: "Nog iets persoonlijks",
    closingBody:
      "Gebruik een korte alinea om een persoonlijk detail te delen. Denk aan een hobby, een manier van werken of iets dat laat zien hoe je samenwerkt met teams.",
  },
  en: {
    seo: {
      title: "About EcomMeasure – Personal overview",
      description: "A simple personal page with the story behind EcomMeasure.",
    },
    badge: "About EcomMeasure",
    heading: "The person behind EcomMeasure",
    intro:
      "A straightforward personal page: use this space to briefly explain who you are, why you do this work, and what drives you.",
    sections: [
      {
        title: "Personal background",
        helper:
          "Share a short bio. Mention where you come from, roles you've held and why you run EcomMeasure today.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et sapien et sapien tristique luctus. Vestibulum sed mattis mauris, vitae finibus nunc.",
      },
      {
        title: "Motivation",
        helper:
          "Explain why data and optimisation matter to you. Consider a moment where clear measurement helped teams collaborate better.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo id lacus viverra hendrerit sed ut arcu.",
      },
      {
        title: "Experience and focus",
        helper:
          "Outline the key experiences that define you: projects, industries or techniques. Keep it to the highlights that matter.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper, leo in euismod suscipit, arcu arcu ultrices velit, et pharetra neque leo eget est.",
      },
      {
        title: "What to expect here",
        helper:
          "Let visitors know what kind of updates or personal notes you plan to share. Keep it human and avoid sales language.",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere, lectus non egestas placerat, enim dui sodales erat, ac luctus est magna non turpis.",
      },
    ],
    closingTitle: "A personal note",
    closingBody:
      "Add a short paragraph with a personal detail. Mention a hobby, a way of working or something that shows how you collaborate with teams.",
  },
};

export default function About() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main role="main" className="bg-surface-light pb-20 pt-20">
        <div className="mx-auto max-w-4xl px-6 space-y-12">
          <header className="space-y-4 text-left">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue"
            >
              {copy.badge}
            </motion.span>
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6 }}
              className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl"
            >
              {copy.heading}
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.14, duration: 0.6 }}
              className="max-w-3xl text-lg text-neutral-700"
            >
              {copy.intro}
            </motion.p>
          </header>

          <section className="space-y-6">
            {copy.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, margin: "-10%" }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: index * 0.04 }}
                className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-blue">Note</span>
                </div>
                <p className="mt-3 text-sm text-neutral-600">{section.helper}</p>
                <p className="mt-4 text-base text-neutral-800">{section.body}</p>
              </motion.article>
            ))}
          </section>

          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, margin: "-10%" }}
            transition={shouldReduceMotion ? undefined : { duration: 0.55 }}
            className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{copy.closingTitle}</h2>
            <p className="mt-3 text-base text-neutral-800">{copy.closingBody}</p>
          </motion.section>
        </div>
      </main>
    </>
  );
}
