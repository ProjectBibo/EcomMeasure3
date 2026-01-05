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
  const croTipsBenefits = [
    "Max één e-mail per maand",
    "Uitschrijven kan op elk moment.",
  ];

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
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
              className="w-full max-w-2xl"
            >
              <div className="flex flex-wrap items-center gap-3 sm:items-start">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Mail size={20} aria-hidden />
                </div>
                <p className="text-base font-semibold leading-tight text-neutral-900 sm:text-lg">
                  Gratis CRO- en GA4-tips direct in je inbox
                </p>
              </div>
              <form
                className="mt-4 space-y-4"
                action="https://formspree.io/f/xaqnjwkv"
                method="POST"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    name="email"
                    placeholder="je@email.nl"
                    className="w-full flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#e2b200] bg-[#ffcc02] px-5 py-3 text-base font-semibold text-neutral-900 shadow-[0_10px_24px_rgba(255,204,2,0.28)] transition hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c400]"
                  >
                    Meld je aan!
                    <ArrowRight size={18} aria-hidden />
                  </button>
                </div>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {croTipsBenefits.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={16} aria-hidden />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </form>
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
