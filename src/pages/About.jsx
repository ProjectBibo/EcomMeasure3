import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Over EcomMeasure – Data gedreven groei voor webshops",
      description:
        "Ontdek het verhaal achter EcomMeasure en hoe measurement, consent en CRO samenkomen om e-commerce teams te versnellen.",
    },
    hero: {
      eyebrow: "Over EcomMeasure",
      title: "Van ruwe data naar beslissingen die elke sprint sterker maken",
      description:
        "EcomMeasure is gebouwd op de overtuiging dat e-commerce teams pas echt groeien wanneer data, privacy en experimenten in elkaar grijpen. Vanuit deze basis begeleid ik scale-ups en retailers naar een betere klantbeleving én meer omzet.",
    },
    pillars: [
      {
        title: "Integrale aanpak",
        body:
          "Measurement, consent en CRO horen bij elkaar. Door vanaf dag één multidisciplinair te werken ontstaat een gedeeld begrip van kansen en risico's.",
      },
      {
        title: "Samen met het team",
        body:
          "Workshops, reviews en documentatie zorgen dat jouw team eigenaar blijft. Ik bouw geen black box, maar een systeem dat schaalbaar is binnen de organisatie.",
      },
      {
        title: "Tempo met kwaliteit",
        body:
          "Snelle iteraties combineren we met strakke QA en versiebeheer. Zo houd je vaart, zonder concessies te doen aan betrouwbaarheid of compliance.",
      },
    ],
    timelineTitle: "Hoe een traject vorm krijgt",
    timeline: [
      {
        heading: "Audit & strategie",
        copy: "We starten met het scherpstellen van doelen, datastromen en de vereiste governance. Deze fase levert een roadmap op met quick wins en langetermijnkansen.",
      },
      {
        heading: "Implementatie & overdracht",
        copy: "Consent Mode v2, server-side tagging en experiment frameworks worden ingericht terwijl we documenteren voor marketeers, developers en legal.",
      },
      {
        heading: "Optimaliseren & opschalen",
        copy: "Met dashboards en experimentresultaten sturen we bij. Teams krijgen trainingen, sparringsessies en support om zelfstandig door te bouwen.",
      },
    ],
  },
  en: {
    seo: {
      title: "About EcomMeasure – Data-driven growth partner",
      description:
        "Learn how EcomMeasure combines measurement, consent and CRO to help commerce teams grow with confidence.",
    },
    hero: {
      eyebrow: "About EcomMeasure",
      title: "Turning raw signals into confident decisions every sprint",
      description:
        "EcomMeasure is built on the belief that sustainable growth happens when data, privacy and experimentation reinforce each other. From that foundation I guide scale-ups and retailers towards better customer journeys and higher revenue.",
    },
    pillars: [
      {
        title: "Integrated approach",
        body:
          "Measurement, consent and CRO belong together. By collaborating multidisciplinary from day one we create shared understanding of both risks and opportunities.",
      },
      {
        title: "Built with your team",
        body:
          "Workshops, reviews and documentation keep your team in control. No black boxes – just systems that can scale inside your organisation.",
      },
      {
        title: "Pace with quality",
        body:
          "We mix fast iterations with rigorous QA and version control so you keep momentum without compromising on reliability or compliance.",
      },
    ],
    timelineTitle: "How an engagement evolves",
    timeline: [
      {
        heading: "Audit & strategy",
        copy: "We align on goals, data flows and required governance. The result is a roadmap with quick wins and long-term opportunities.",
      },
      {
        heading: "Implementation & enablement",
        copy: "Consent Mode v2, server-side tagging and experimentation frameworks are configured while we document for marketing, engineering and legal stakeholders.",
      },
      {
        heading: "Optimise & scale",
        copy: "Dashboards and experiment learnings fuel the next actions. Teams receive training, sparring sessions and support to keep improving independently.",
      },
    ],
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-surface-light pb-24 pt-28 dark:bg-surface-dark">
        <div className="glow-orb glow-orb--blue -left-24 top-0 h-[28rem] w-[28rem] opacity-70" aria-hidden />
        <div className="glow-orb glow-orb--teal right-0 top-1/3 h-[26rem] w-[26rem] opacity-60" aria-hidden />
        <div className="grain-overlay" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.05, duration: 0.7, ease: "easeOut" }}
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.7, ease: "easeOut" }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {copy.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { delay: 0.1 * index, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[18px_28px_70px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[18px_30px_80px_rgba(2,6,23,0.6)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "inset 2px 2px 8px rgba(255,255,255,0.45), inset -12px -14px 30px rgba(148,163,184,0.22)",
                }}
              />
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{pillar.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="relative mx-auto mt-24 max-w-5xl px-6">
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            {copy.timelineTitle}
          </motion.h2>
          <div className="mt-10 space-y-10">
            {copy.timeline.map((item, index) => (
              <motion.div
                key={item.heading}
                initial={shouldReduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.65, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[20px_32px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-blue via-brand-teal to-brand-yellow" aria-hidden />
                <h3 className="pl-6 text-xl font-semibold text-neutral-900 dark:text-white">{item.heading}</h3>
                <p className="pl-6 pt-4 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
