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
    <section id="hero" data-snap-section className="relative isolate overflow-hidden section-shell">
      <div className="story-stripe" aria-hidden />
      <div className="glow-orb glow-orb--primary -top-32 -left-24 h-[28rem] w-[28rem] opacity-70" aria-hidden />
      <div className="glow-orb glow-orb--primary-soft top-1/3 -right-20 h-[26rem] w-[26rem] opacity-70" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="layout-shell relative flex flex-col items-center text-center gap-12">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
          className="eyebrow shadow-sm ring-1 ring-white/70 backdrop-blur dark:ring-white/10"
        >
          <Sparkles size={14} /> {t.badge}
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
          className="text-balance font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white vt-hero-title focus:outline-none"
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
          className="mx-auto max-w-3xl text-lg sm:text-xl text-neutral-700 dark:text-gray-300 prose-limiter"
        />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MotionLink
            whileHover={shouldReduceMotion ? undefined : { scale: 1.005 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            to="/contact"
            className="button-primary"
            onClick={handlePrimaryCtaClick}
          >
            {t.primaryCta} <ArrowRight size={18} />
          </MotionLink>
          <Link
            to="/measurement"
            className="button-secondary"
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
              className="group relative overflow-hidden card-surface px-6 py-6 text-left bg-white/95 dark:bg-white/5"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
                style={{
                  boxShadow:
                    "inset 2px 2px 6px rgba(255,255,255,0.6), inset -8px -12px 24px rgba(148,163,184,0.25)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/75 via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10 dark:via-transparent dark:to-transparent" aria-hidden />
              <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-brand-blue/10 blur-xl" aria-hidden />
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
          className="vt-hero-media relative w-full card-surface bg-white/90 px-6 py-8 text-left shadow-lg dark:bg-white/5"
        >
          <div className="absolute -left-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand-blue/30 md:block" style={{ animation: "pulse-ring 3.5s infinite" }} aria-hidden />
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            {t.storyline.map((story) => (
              <div key={story.title} className="relative pl-5">
                <span className="absolute left-0 top-1 h-8 w-0.5 rounded-full bg-gradient-to-b from-brand-blue to-brand-teal" aria-hidden />
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
