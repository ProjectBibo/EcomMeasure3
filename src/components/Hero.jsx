// src/components/Hero.jsx
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";
import { AnimatedParagraph } from "./ExpressiveText";

const MotionLink = motion(Link);

const gradientHeadlineClass = "bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const navigateWithTransition = useViewTransitionNavigate();
  const handlePrimaryCtaClick = useMemo(
    () => createViewTransitionClickHandler(navigateWithTransition, "/contact"),
    [navigateWithTransition]
  );
  const handleSecondaryCtaClick = useMemo(
    () => createViewTransitionClickHandler(navigateWithTransition, "/measurement"),
    [navigateWithTransition]
  );
  const phrasesFromLocale = t.rotatingPhrases ?? [];
  const rotatingPhrases = phrasesFromLocale.length > 0 ? phrasesFromLocale : [""];
  const longestPhrase = useMemo(
    () =>
      rotatingPhrases.reduce(
        (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
        ""
      ),
    [rotatingPhrases]
  );
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
        <div className="site-container relative z-10 flex flex-col gap-8 lg:gap-10 lg:min-h-[78vh] lg:pr-[28rem] xl:pr-[34rem]">
          <div className="relative max-w-3xl flex flex-col items-start gap-8 text-left vt-hero-visual">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
              className="pill-badge shadow-sm"
            >
              <Sparkles size={14} /> {t.badge}
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
                <span aria-hidden className="pointer-events-none block select-none opacity-0">
                  {longestPhrase}
                </span>
                <span
                  aria-live={shouldReduceMotion ? undefined : "polite"}
                  className="col-start-1 row-start-1 flex items-start justify-start text-left"
                >
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
              className="flex flex-wrap items-center justify-start gap-3"
            >
              <MotionLink
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                to="/contact"
                className="button-primary text-sm uppercase tracking-wide"
                onClick={handlePrimaryCtaClick}
              >
                {t.primaryCta} <ArrowRight size={18} />
              </MotionLink>
              <Link
                to="/measurement"
                className="button-secondary text-sm"
                onClick={handleSecondaryCtaClick}
              >
                {t.secondaryCta}
              </Link>
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
