// src/components/Hero.jsx
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MoveDown } from "lucide-react";
import HeroGlobe from "./HeroGlobe";
import { AnimatedParagraph } from "./ExpressiveText";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

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
      <div className="glow-orb glow-orb--primary -top-32 -left-24 h-[36rem] w-[36rem]" aria-hidden />
      <div className="glow-orb glow-orb--primary-soft top-1/3 -right-20 h-[30rem] w-[30rem]" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 sm:py-32">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col items-center gap-12 text-center lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:items-start lg:gap-16 lg:text-left">
            <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white"
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
                <span className="relative mt-3 grid justify-items-center text-center lg:justify-items-start lg:text-left">
                  <span aria-hidden className="pointer-events-none block select-none opacity-0">
                    {longestPhrase}
                  </span>
                  <span
                    aria-live={shouldReduceMotion ? undefined : "polite"}
                    className="col-start-1 row-start-1 flex items-start justify-center text-center lg:justify-start lg:text-left"
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
                className="mx-auto max-w-2xl text-lg sm:text-xl text-neutral-700 dark:text-gray-300 lg:mx-0"
              />

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              >
                <MotionLink
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_22px_44px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2"
                  onClick={handlePrimaryCtaClick}
                >
                  {t.primaryCta} <ArrowRight size={18} />
                </MotionLink>
                <Link
                  to="/measurement"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300/70 bg-white/80 px-6 py-3 text-sm font-semibold text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_55px_rgba(15,23,42,0.16)] dark:border-white/15 dark:bg-white/10 dark:text-gray-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_rgba(2,6,23,0.5)]"
                  onClick={handleSecondaryCtaClick}
                >
                  {t.secondaryCta}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.8 }}
              className="flex w-full justify-center lg:justify-end"
            >
              <HeroGlobe />
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.7 }}
            className="grid w-full gap-6 sm:grid-cols-3"
          >
            {t.stats.map((item) => (
              <div
                key={item.label}
              data-tilt-card
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 px-6 py-6 text-left shadow-[12px_24px_50px_rgba(15,23,42,0.12)] backdrop-blur transition-[box-shadow,transform] duration-500 hover:shadow-[18px_32px_70px_rgba(15,23,42,0.24)] focus-visible:shadow-[18px_32px_70px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-white/10 dark:shadow-[12px_24px_55px_rgba(2,6,23,0.6)] dark:hover:shadow-[16px_28px_70px_rgba(2,6,23,0.68)]"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
                style={{
                  boxShadow:
                    "inset 2px 2px 6px rgba(255,255,255,0.6), inset -8px -12px 24px rgba(148,163,184,0.25)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/65 via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/15 dark:via-transparent dark:to-transparent" aria-hidden />
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-brand-blue/12 blur-xl transition group-hover:scale-125" aria-hidden />
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-gray-400">{item.label}</div>
              <div className="mt-3 text-3xl font-bold text-brand-blue dark:text-brand-blue">{item.value}</div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.helper}</p>
            </div>
          ))}
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.3, duration: 0.7 }}
            data-tilt-card
            className="vt-hero-media relative w-full rounded-3xl border border-white/60 bg-white/70 px-6 py-8 text-left shadow-[24px_38px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-[box-shadow,transform] duration-500 focus-visible:shadow-[26px_40px_96px_rgba(15,23,42,0.22)] dark:border-white/10 dark:bg-white/5 dark:shadow-[24px_40px_90px_rgba(2,6,23,0.55)]"
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
      </div>
    </section>
  );
}
