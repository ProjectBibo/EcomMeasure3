import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  nl: {
    title: "🎉 Gelukt! Je bericht is verzonden",
    subtitle: "We nemen binnen 1–2 werkdagen contact met je op om een gratis adviesgesprek in te plannen.",
    sectionTitle: "Wat gebeurt er nu?",
    steps: [
      "Je ontvangt een reactie per mail om een moment te plannen",
      "In het gesprek kijken we samen waar kansen liggen in meting en conversie",
    ],
    cta: "Terug naar home →",
  },
  en: {
    title: "🎉 Success! Your message has been sent",
    subtitle: "We will contact you within 1–2 business days to schedule a free consultation call.",
    sectionTitle: "What happens next?",
    steps: [
      "You will receive an email to schedule a time",
      "During the call we explore opportunities in measurement and conversion",
    ],
    cta: "Back to home →",
  },
};

export default function Confirmation() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const copy = content[language];

  return (
    <>
      <SEO title={copy.title} description={copy.subtitle} />
      <main className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 py-20 sm:py-24">
        <div className="glow-orb glow-orb--primary left-0 top-0 h-64 w-64 opacity-40" aria-hidden />
        <div className="glow-orb glow-orb--primary-soft right-0 top-1/2 h-56 w-56 opacity-30" aria-hidden />
        <div className="grain-overlay" aria-hidden />

        <div className="relative mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.08, duration: 0.6, ease: "easeOut" }}
            className="max-w-xl text-lg text-neutral-700"
          >
            {copy.subtitle}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.12, duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-xl flex-col gap-4 text-left text-neutral-800"
          >
            <h2 className="text-xl font-semibold">{copy.sectionTitle}</h2>
            <ol className="list-decimal space-y-2 pl-6 text-base text-neutral-700">
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.16, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(59,130,246,0.45)]"
            >
              {copy.cta}
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
