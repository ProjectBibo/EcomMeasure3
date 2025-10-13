import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    seo: {
      title: "Over EcomMeasure – Het gezicht achter de meetoplossingen",
      description:
        "Maak kennis met Jeroen, de consultant achter EcomMeasure. Lees hoe strategie, consent en CRO samenkomen in zijn manier van werken.",
    },
    hero: {
      eyebrow: "Over mij",
      title: "Ik help e-commerceteams groeien met vertrouwen in hun data",
      description:
        "Ik ben Jeroen, digital analytics consultant en oprichter van EcomMeasure. Mijn hart ligt bij het vertalen van ruwe gegevens naar een roadmap waar marketeers, developers en privacyteams samen op kunnen bouwen.",
      ctaPrimary: { label: "Plan een gesprek", href: "/contact" },
      ctaSecondary: {
        label: "Bekijk de aanpak",
        href: "#werkwijze",
      },
    },
    metrics: [
      { value: "12+", label: "jaar ervaring in e-commerce en analytics" },
      { value: "35", label: "teams begeleid met measurement en consent" },
      { value: "400+", label: "experimenten en analyses afgerond" },
    ],
    story: {
      heading: "Van ruwe data naar gedragen beslissingen",
      lead:
        "Ik ben opgegroeid in marketingteams waar dashboards vooral vragen opriepen. Door marketing, development en legal aan dezelfde tafel te brengen, ontdekte ik dat de echte waarde ontstaat als iedere discipline dezelfde cijfers vertrouwt.",
      paragraphs: [
        "Daarom richtte ik EcomMeasure op: een boutique consultancy die measurement, consent en CRO structureel verbindt. Ik help scale-ups en retailers om experimenten te draaien die zowel compliant als impactvol zijn.",
        "Samen bouwen we aan een fundament dat jouw organisatie zelf kan doorontwikkelen. Ik zorg voor de structuur, tooling en overdracht waarmee jouw team zelfstandig keuzes kan maken – sprint na sprint.",
      ],
      points: [
        "Sterk in stakeholdermanagement tussen marketing, product, IT en legal",
        "Hands-on ervaring met Consent Mode v2, server-side tagging en GTM",
        "Combineert growth frameworks met governance en QA",
      ],
    },
    focus: {
      heading: "Waar ik je mee help",
      items: [
        {
          title: "Measurement foundations",
          description:
            "Van audit tot implementatie. We leggen een datalaag en trackingstructuur vast die future-proof is, inclusief documentatie voor jouw team.",
        },
        {
          title: "Consent & governance",
          description:
            "Ik verbind marketingdoelen met privacywetgeving. Denk aan Consent Mode v2, server-side tagging en samenwerking met legal.",
        },
        {
          title: "Experimentation & CRO",
          description:
            "Samen vertalen we inzichten naar hypotheses en experimenten. Resultaten worden gedeeld in begrijpelijke learnings en playbooks.",
        },
      ],
    },
    timeline: {
      heading: "Loopbaan in vogelvlucht",
      items: [
        {
          period: "2012 – 2016",
          title: "Performance marketeer",
          description:
            "Startte mijn carrière bij e-commerce bureaus. Leerde er hoe advertenties, data en UX elkaar versterken – en waar het vaak misgaat.",
        },
        {
          period: "2016 – 2021",
          title: "Lead analytics bij scale-ups",
          description:
            "Bouwde analytics teams op bij snelgroeiende webshops. Introduceerde server-side tagging, heldere experimentprocessen en dashboards die teams dagelijks gebruiken.",
        },
        {
          period: "2021 – heden",
          title: "Oprichter EcomMeasure",
          description:
            "Werk als zelfstandig consultant voor retailers en D2C-merken. Combineer measurement, consent en CRO om groei te versnellen zonder concessies aan privacy.",
        },
      ],
    },
    approach: {
      heading: "Werkwijze",
      id: "werkwijze",
      items: [
        {
          title: "1. Luisteren en doorvragen",
          description:
            "We starten met interviews en audits om doelen, datastromen en risico's scherp te krijgen. Geen standaard templates, wel context.",
        },
        {
          title: "2. Bouwen met jouw team",
          description:
            "Implementaties doe ik samen met developers, marketeers en legal. Ik schrijf documentatie, review code en zorg dat iedereen het waarom begrijpt.",
        },
        {
          title: "3. Overdragen en opschalen",
          description:
            "Na oplevering begeleid ik het team om zelfstandig verder te kunnen. Denk aan playbooks, trainingsessies en sparringmomenten.",
        },
      ],
    },
    personal: {
      heading: "Meer over mij",
      paragraphs: [
        "Ik geloof dat data pas waarde heeft als het teams dichter bij elkaar brengt. Daarom werk ik graag op locatie mee, organiseer ik gezamenlijke reviews en maak ik complexe materie visueel.",
        "Buiten het werk ben ik vaak te vinden op de racefiets of in de keuken. Die combinatie van focus en creativiteit neem ik ook mee in projecten.",
      ],
      listTitle: "Fun fact",
      listItems: ["Gecertificeerd in GA4, Mixpanel en CXL experimentation"],
    },
    cta: {
      heading: "Samen bouwen aan een schaalbaar datagrondwerk?",
      body: "Plan een vrijblijvende call en ontdek hoe we measurement, consent en CRO in jouw organisatie laten samenwerken.",
      primary: { label: "Stuur een bericht", href: "/contact" },
      secondary: { label: "Bel direct", href: "tel:+31612345678" },
    },
  },
  en: {
    seo: {
      title: "About EcomMeasure – Meet the consultant behind the dashboards",
      description:
        "Get to know Jeroen, the consultant behind EcomMeasure. Learn how strategy, consent and CRO come together in his approach.",
    },
    hero: {
      eyebrow: "About me",
      title: "I help commerce teams grow with confidence in their data",
      description:
        "I'm Jeroen, a digital analytics consultant and founder of EcomMeasure. I love translating raw signals into a roadmap that marketers, engineers and privacy stakeholders can rely on together.",
      ctaPrimary: { label: "Book an intro call", href: "/contact" },
      ctaSecondary: {
        label: "See the approach",
        href: "#werkwijze",
      },
    },
    metrics: [
      { value: "12+", label: "years of experience across commerce and analytics" },
      { value: "35", label: "teams supported with measurement and consent" },
      { value: "400+", label: "experiments analysed and shipped" },
    ],
    story: {
      heading: "Turning raw data into shared decisions",
      lead:
        "I grew up in marketing teams where dashboards sparked more debate than clarity. By getting marketing, product, engineering and legal around the same table I realised impact happens when every discipline trusts the same numbers.",
      paragraphs: [
        "That is why I founded EcomMeasure: a boutique consultancy that connects measurement, consent and CRO. I support scale-ups and retailers to run experiments that are both compliant and revenue-generating.",
        "Together we build a foundation your organisation can evolve independently. I create the structure, tooling and enablement so your team can keep making confident decisions – sprint after sprint.",
      ],
      points: [
        "Strong stakeholder management across marketing, product, engineering and legal",
        "Hands-on experience with Consent Mode v2, server-side tagging and GTM",
        "Mixes growth frameworks with governance and quality assurance",
      ],
    },
    focus: {
      heading: "How I support you",
      items: [
        {
          title: "Measurement foundations",
          description:
            "From audit to implementation. We design the data layer and tracking architecture, backed by documentation tailored to your team.",
        },
        {
          title: "Consent & governance",
          description:
            "I align marketing goals with privacy regulations. Think Consent Mode v2, server-side tagging and collaboration with legal teams.",
        },
        {
          title: "Experimentation & CRO",
          description:
            "We translate insights into hypotheses and tests. Results are shared through clear learnings and playbooks everyone can act on.",
        },
      ],
    },
    timeline: {
      heading: "Career snapshot",
      items: [
        {
          period: "2012 – 2016",
          title: "Performance marketer",
          description:
            "Started out at e-commerce agencies. Learned how acquisition, data and UX fuel each other – and where they often break.",
        },
        {
          period: "2016 – 2021",
          title: "Analytics lead at scale-ups",
          description:
            "Built analytics functions for high-growth webshops. Introduced server-side tagging, structured experimentation and dashboards teams rely on daily.",
        },
        {
          period: "2021 – today",
          title: "Founder of EcomMeasure",
          description:
            "Consult with retailers and D2C brands. Combine measurement, consent and CRO to accelerate growth without compromising on privacy.",
        },
      ],
    },
    approach: {
      heading: "Approach",
      id: "werkwijze",
      items: [
        {
          title: "1. Listen and diagnose",
          description:
            "We start with interviews and audits to clarify goals, data flows and risks. No cookie-cutter templates, just context.",
        },
        {
          title: "2. Build with your team",
          description:
            "Implementations happen alongside developers, marketers and legal. I document, review and make sure everyone understands the why behind choices.",
        },
        {
          title: "3. Enable and scale",
          description:
            "After delivery I guide the team to continue autonomously – through playbooks, training sessions and sparring moments.",
        },
      ],
    },
    personal: {
      heading: "A bit more personal",
      paragraphs: [
        "I believe data only matters when it brings teams closer together. That is why I enjoy working on-site, facilitating shared reviews and visualising complex topics.",
        "Outside of client work you'll find me on a road bike or in the kitchen. That mix of focus and creativity shows up in the projects I run as well.",
      ],
      listTitle: "Fun fact",
      listItems: ["Certified in GA4, Mixpanel and CXL experimentation"],
    },
    cta: {
      heading: "Ready to build a dependable data foundation?",
      body: "Let's schedule a call to connect measurement, consent and CRO inside your organisation.",
      primary: { label: "Send a message", href: "/contact" },
      secondary: { label: "Call me", href: "tel:+31612345678" },
    },
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-surface-light pb-24 pt-24 dark:bg-surface-dark">
        <div className="glow-orb glow-orb--blue -left-24 top-0 h-[28rem] w-[28rem] opacity-70" aria-hidden />
        <div className="glow-orb glow-orb--teal right-0 top-1/3 h-[26rem] w-[26rem] opacity-60" aria-hidden />
        <div className="grain-overlay" aria-hidden />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-6">
          <header className="max-w-3xl">
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
              className="mt-6 text-lg text-neutral-700 dark:text-gray-300"
            >
              {copy.hero.description}
            </motion.p>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.22, duration: 0.7, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href={copy.hero.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.45)] transition hover:bg-brand-yellow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-surface-dark"
              >
                {copy.hero.ctaPrimary.label}
              </a>
              <a
                href={copy.hero.ctaSecondary.href}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300/80 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:text-gray-200 dark:hover:border-white/50 dark:hover:text-white dark:focus-visible:ring-offset-surface-dark"
              >
                {copy.hero.ctaSecondary.label}
              </a>
            </motion.div>
          </header>

          <section className="grid gap-6 sm:grid-cols-3">
            {copy.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.08 * index, duration: 0.6 }}
                className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[18px_28px_70px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[18px_30px_80px_rgba(2,6,23,0.6)]"
              >
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">{metric.value}</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-300">{metric.label}</p>
              </motion.div>
            ))}
          </section>

          <section className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
                className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                {copy.story.heading}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.1 }}
                className="mt-6 text-lg text-neutral-700 dark:text-gray-300"
              >
                {copy.story.lead}
              </motion.p>
              {copy.story.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.14 + index * 0.08 }}
                  className="mt-5 text-base text-neutral-600 dark:text-gray-300"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[20px_32px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">{copy.focus.heading}</p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-gray-300">
                {copy.story.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {copy.focus.items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.1 * index }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[18px_28px_70px_rgba(15,23,42,0.18)] backdrop-blur transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-[18px_30px_80px_rgba(2,6,23,0.6)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 2px 2px 8px rgba(255,255,255,0.45), inset -12px -14px 30px rgba(148,163,184,0.22)",
                  }}
                />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{item.description}</p>
              </motion.article>
            ))}
          </section>

          <section className="space-y-6 rounded-3xl border border-white/60 bg-white/70 p-8 text-neutral-800 shadow-[20px_32px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              className="text-xl font-semibold"
            >
              {copy.timeline.heading}
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.timeline.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.08 * index }}
                  className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">{item.period}</p>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id={copy.approach.id} className="space-y-8">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              {copy.approach.heading}
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              {copy.approach.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={shouldReduceMotion ? undefined : { once: true }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.1 * index }}
                  className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[20px_32px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="mt-4 text-sm text-neutral-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{copy.personal.heading}</h2>
              {copy.personal.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base text-neutral-600 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[20px_32px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[22px_34px_90px_rgba(2,6,23,0.6)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">{copy.personal.listTitle}</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-gray-300">
                {copy.personal.listItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-r from-brand-blue-dark/90 via-brand-blue/80 to-brand-teal/70 p-10 text-white shadow-[24px_36px_90px_rgba(2,6,23,0.32)] backdrop-blur dark:border-white/10">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight">{copy.cta.heading}</h2>
              <p className="max-w-2xl text-base text-white/90">{copy.cta.body}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={copy.cta.primary.href}
                  className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_16px_36px_rgba(255,204,2,0.45)] transition hover:bg-brand-yellow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue/60"
                >
                  {copy.cta.primary.label}
                </a>
                <a
                  href={copy.cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue/60"
                >
                  {copy.cta.secondary.label}
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}
