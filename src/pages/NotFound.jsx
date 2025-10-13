import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    title: "Pagina niet gevonden",
    description: "Deze URL levert geen data meer op. Gebruik het menu om terug te keren naar inzichten.",
    cta: "Terug naar start",
  },
  en: {
    title: "Page not found",
    description: "This URL returns no signal. Use the menu to jump back to insights.",
    cta: "Back to overview",
  },
};

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <>
      <SEO title={t.title} description={t.description} />
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-surface-light px-6 py-20 text-center dark:bg-surface-dark">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
        >
          404
        </motion.div>
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.6 }}
          className="max-w-md text-neutral-600 dark:text-gray-300"
        >
          {t.description}
        </motion.p>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.24, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(59,130,246,0.45)]"
          >
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </>
  );
}
