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
      <div className="relative page-shell section-shell flex flex-col items-center text-center gap-10 vt-hero-visual">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] shadow-sm"
        >
          <Sparkles size={14} /> {t.badge}
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
          className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-[color:var(--text)] vt-hero-title focus:outline-none"
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
                <span className="text-[color:var(--primary)]">
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
                    className="text-[color:var(--primary)]"
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
          className="mx-auto max-w-2xl text-lg sm:text-xl text-[color:var(--muted)]"
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
            className="btn-primary"
            onClick={handlePrimaryCtaClick}
          >
            {t.primaryCta} <ArrowRight size={18} />
          </MotionLink>
          <Link
            to="/measurement"
            className="btn-secondary"
            onClick={handleSecondaryCtaClick}
          >
            {t.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }}
          className="grid w-full gap-6 sm:grid-cols-3"
        >
          {t.stats.map((item) => (
            <div
              key={item.label}
              className="card relative flex h-full flex-col gap-2 px-6 py-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">{item.label}</div>
                {item.badge ? (
                  <div className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    {item.badge}
                  </div>
                ) : null}
              </div>
              <div className="text-3xl font-bold text-[color:var(--text)]">{item.value}</div>
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">{item.helper}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.7 }}
          className="vt-hero-media card w-full text-left p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {t.storyline.map((story) => (
              <div key={story.title} className="relative pl-5">
                <span className="absolute left-0 top-1 h-10 w-px rounded-full bg-brand-blue/70" aria-hidden />
                <h3 className="text-lg font-semibold text-[color:var(--text)]">{story.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{story.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.35, duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]"
        >
          {t.scrollLabel}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex h-10 w-6 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]"
          >
            <MoveDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
