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
    <section id="hero" data-snap-section className="relative isolate overflow-hidden">
      <div className="story-stripe" aria-hidden />
      <div className="glow-orb glow-orb--primary -top-32 -left-24 h-[30rem] w-[30rem]" aria-hidden />
      <div className="glow-orb glow-orb--primary-soft top-1/3 -right-20 h-[26rem] w-[26rem]" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="relative site-container section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-16">
          <div className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-center lg:min-h-[30rem] gap-8">
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
              <span className="relative mt-3 grid justify-items-center text-center lg:justify-items-start lg:text-left">
                <span aria-hidden className="pointer-events-none block select-none opacity-0">
                  {longestPhrase}
                </span>
                <span
                  aria-live={shouldReduceMotion ? undefined : "polite"}
                  className="col-start-1 row-start-1 flex items-start justify-center text-center lg:justify-start"
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
              className="mx-auto max-w-2xl text-lg sm:text-xl text-neutral-700  text-max-width lg:mx-0 lg:text-left"
            />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
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
          </div>

          <div className="order-2 relative flex justify-center lg:justify-end lg:-mr-[12vw]">
            <div className="flex justify-center lg:hidden">
              <img
                src="/Ik.png"
                alt="Portretfoto van de expert achter EcomMeasure"
                className="h-72 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none relative hidden lg:flex w-full justify-end">
              <img
                src="/Ik.png"
                alt="Portretfoto van de expert achter EcomMeasure"
                className="absolute -bottom-8 right-0 h-[34rem] w-auto max-w-none object-contain"
              />
            </div>
          </div>
        </div>
        <div className="pb-6 lg:pb-10" aria-hidden />
      </div>
    </section>
  );
}
