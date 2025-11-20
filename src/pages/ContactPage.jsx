import React, { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import GoogleTag from "../components/GoogleTag";
import SectionFallback from "../components/SectionFallback";
import { useLanguage } from "../context/LanguageContext";

const Contact = lazy(() => import("../components/Contact"));

const content = {
  nl: {
    seo: {
      title: "Contact – Plan een kennismaking met EcomMeasure",
      description:
        "Neem contact op voor measurement, Consent Mode of CRO trajecten. Plan direct een call of stuur een bericht.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Samen bouwen aan meetbare groei?",
      description:
        "Laat weten waar je staat met measurement of CRO. Binnen één werkdag reageren we met concrete vervolgstappen.",
      highlights: [
        "Kennismaking binnen één week mogelijk",
        "Implementatie ervaring bij e-commerce & retail",
        "Samenwerking met marketing, product en legal",
      ],
    },
  },
  en: {
    seo: {
      title: "Contact – Schedule an intro with EcomMeasure",
      description:
        "Reach out for measurement, Consent Mode or CRO engagements. Schedule a call or send a message and we will get back within one business day.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Ready to build measurable growth together?",
      description:
        "Share where you stand with measurement or CRO. Expect a reply with concrete next steps within one business day.",
      highlights: [
        "Intro call available within a week",
        "Experience with e-commerce and retail organisations",
        "Close collaboration with marketing, product and legal",
      ],
    },
  },
};

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];

  return (
    <>
      <GoogleTag />
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <main
        role="main"
        aria-labelledby="contact-hero-title"
        className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 pb-24 pt-28 dark:from-surface-dark dark:via-surface-dark/95 dark:to-brand-blue/20"
      >
        <div className="glow-orb glow-orb--primary left-0 top-0 h-[26rem] w-[26rem] opacity-60" aria-hidden />
        <div className="glow-orb glow-orb--primary-soft right-0 top-1/2 h-[22rem] w-[22rem] opacity-50" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center vt-hero-visual">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-brand-teal"
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.7 }}
            id="contact-hero-title"
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl vt-hero-title focus:outline-none"
            data-focus-target
            tabIndex={-1}
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.16, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {copy.hero.description}
          </motion.p>
          <motion.ul
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.24, duration: 0.7 }}
            className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3 text-sm text-neutral-600 dark:text-gray-300"
          >
            {copy.hero.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <Suspense fallback={<SectionFallback label={language === "nl" ? "Contact" : "Contact"} />}>
            <Contact />
          </Suspense>
        </div>
      </main>
    </>
  );
}
