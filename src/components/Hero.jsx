// src/components/Hero.jsx
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MoveDown } from "lucide-react";
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
    <section id="hero" data-snap-section className="relative isolate overflow-hidden bg-surface-light">
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 flex flex-col items-center text-center gap-12 vt-hero-visual">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
          className="eyebrow"
        >
          <Sparkles size={14} /> {t.badge}
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
          className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white vt-hero-title focus:outline-none"
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
          <span className="relative mt-3 grid justify-items-center text-center">
            <span aria-hidden className="pointer-events-none block select-none opacity-0">
              {longestPhrase}
            </span>
            <span
              aria-live={shouldReduceMotion ? undefined : "polite"}
              className="col-start-1 row-start-1 flex items-start justify-center text-center"
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
          className="mx-auto max-w-2xl text-lg sm:text-xl text-neutral-700 dark:text-gray-300"
        />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MotionLink
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            to="/contact"
            className="btn btn-primary px-7"
            onClick={handlePrimaryCtaClick}
          >
            {t.primaryCta} <ArrowRight size={18} />
          </MotionLink>
          <Link
            to="/measurement"
            className="btn btn-secondary px-6"
            onClick={handleSecondaryCtaClick}
          >
            {t.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }}
          className="grid gap-6 w-full sm:grid-cols-3"
        >
          {t.stats.map((item) => (
            <div
              key={item.label}
              data-tilt-card
              className="card relative overflow-hidden px-6 py-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-gray-400">{item.label}</div>
              <div className="mt-3 text-3xl font-bold text-brand-blue dark:text-brand-blue">{item.value}</div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.helper}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.7 }}
          data-tilt-card
          className="vt-hero-media card relative w-full px-6 py-8 text-left transition hover:-translate-y-1"
        >
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            {t.storyline.map((story) => (
              <div key={story.title} className="relative pl-5">
                <span className="absolute left-0 top-1 h-8 w-0.5 rounded-full bg-brand-blue/60" aria-hidden />
                <h3 className="typography-subheading text-lg font-semibold text-neutral-900 dark:text-white">{story.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-300">{story.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.35, duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-gray-400"
        >
          {t.scrollLabel}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex h-10 w-6 items-center justify-center rounded-full border border-neutral-400/50 bg-white/60 backdrop-blur dark:border-white/30 dark:bg-white/5"
          >
            <MoveDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
