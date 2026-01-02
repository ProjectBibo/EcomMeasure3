// src/components/Hero.jsx
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { AnimatedParagraph } from "./ExpressiveText";

const gradientHeadlineClass = "bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrasesFromLocale = t.rotatingPhrases ?? [];
  const rotatingPhrases = phrasesFromLocale.length > 0 ? phrasesFromLocale : [""];
  const leadWords = useMemo(() => t.titleLead.trim().split(/\s+/), [t.titleLead]);

  useEffect(() => {
    setPhraseIndex(0);
  }, [rotatingPhrases]);

  useEffect(() => {
    if (shouldReduceMotion || rotatingPhrases.length <= 1) {
      setPhraseIndex(0);
      return undefined;
    }

    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % rotatingPhrases.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [rotatingPhrases, shouldReduceMotion]);

  const activePhrase = rotatingPhrases[phraseIndex] ?? "";

  return (
    <section
      id="hero"
      data-snap-section
      className="relative isolate overflow-hidden lg:overflow-visible"
    >
      <div className="story-stripe" aria-hidden />
      <div className="glow-orb glow-orb--primary -top-32 -left-24 h-[30rem] w-[30rem]" aria-hidden />
      <div className="glow-orb glow-orb--primary-soft top-1/3 -right-20 h-[26rem] w-[26rem]" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="relative section-shell">
        <div className="site-container relative z-10 flex flex-col gap-6 lg:gap-9 min-h-[78vh] lg:min-h-[82vh] lg:pr-[28rem] xl:pr-[34rem]">
          <div className="relative max-w-3xl flex flex-col items-start gap-8 text-left vt-hero-visual">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
              className="pill-badge shadow-sm"
            >
              {t.badge}
            </motion.span>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
              className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-neutral-900  vt-hero-title focus:outline-none"
              data-focus-target
              tabIndex={-1}
            >
              {shouldReduceMotion ? (
                <span className="block">{t.titleLead}</span>
              ) : (
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.9 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.1,
                        staggerChildren: 0.08,
                        ease: [0.33, 1, 0.68, 1],
                      },
                    },
                  }}
                  className="block overflow-hidden"
                >
                  {leadWords.map((word, index) => (
                    <Fragment key={`${word}-${index}`}>
                      <motion.span className="inline-block px-0.5" variants={{ hidden: { opacity: 0, y: "100%" }, visible: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } } }}>
                        {word}
                      </motion.span>
                      {index < leadWords.length - 1 ? " " : null}
                    </Fragment>
                  ))}
                </motion.span>
              )}
              <span className="relative mt-3 grid justify-items-start text-left">
                <span
                  aria-live={shouldReduceMotion ? undefined : "polite"}
                  className="col-start-1 row-start-1 flex items-start justify-start text-left"
                >
                  <span className="rotating-text-wrapper">
                    {shouldReduceMotion ? (
                      <span className={gradientHeadlineClass}>
                        {rotatingPhrases[0] ?? ""}
                      </span>
                    ) : (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={activePhrase}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                          className={gradientHeadlineClass}
                        >
                          {activePhrase}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                </span>
              </span>
            </motion.h1>

            <AnimatedParagraph
              text={t.description}
              language={language}
              highlight
              delay={0.18}
              className="max-w-2xl text-lg sm:text-xl text-neutral-700  text-max-width"
            />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
              className="w-full max-w-xl"
            >
              <div className="rounded-2xl bg-brand-yellow p-5 shadow-lg sm:p-6">
                <div className="flex items-center gap-3 text-base font-semibold text-neutral-900 sm:text-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-blue">
                    <Mail size={18} aria-hidden />
                  </span>
                  <span>Gratis CRO-tips direct in je inbox:</span>
                </div>
                <form className="mt-4 space-y-4" onSubmit={(event) => event.preventDefault()}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <label className="sr-only" htmlFor="hero-email">
                      E-mailadres
                    </label>
                    <div className="relative flex-1">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" aria-hidden>
                        <Mail size={16} />
                      </span>
                      <input
                        id="hero-email"
                        type="email"
                        inputMode="email"
                        placeholder="je@email.nl"
                        className="w-full rounded-xl border border-neutral-200/70 bg-white px-4 py-3 pl-10 text-base text-neutral-900 placeholder:text-neutral-500 shadow-sm focus:outline-none"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow-dark px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-md transition hover:bg-brand-yellow focus:outline-none sm:px-6"
                    >
                      Meld je aan!
                      <ArrowRight size={16} aria-hidden />
                    </motion.button>
                  </div>
                  <ul className="space-y-2 text-sm font-semibold text-neutral-900">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" aria-hidden />
                      5.000+ mensen ontvangen mijn CRO tips
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" aria-hidden />
                      Max één e-mail per maand
                    </li>
                  </ul>
                </form>
              </div>
            </motion.div>

            <div className="pb-4" aria-hidden />
          </div>
        </div>

        <div className="relative mt-10 flex justify-center bg-white lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:flex lg:items-center">
          <div
            className="absolute inset-y-0 right-0 hidden w-screen bg-white lg:block"
            aria-hidden
          />
          <img
            src="/Ik.svg"
            alt="Portret van [naam], oprichter van EcomMeasure"
            className="relative z-10 max-w-none w-56 sm:w-72 md:w-[21rem] lg:w-[480px] xl:w-[560px]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
