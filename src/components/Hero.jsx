// src/components/Hero.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MoveDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { useExperience } from "../context/ExperienceContext";

const MotionLink = motion(Link);

const gradientHeadlineClass = "bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { prefersReducedMotion, celebrate } = useExperience();
  const shouldReduceMotion = reducedMotion || prefersReducedMotion;
  const { language } = useLanguage();
  const t = translations[language].hero;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const heroRef = useRef(null);
  const primaryOrbRef = useRef(null);
  const secondaryOrbRef = useRef(null);
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

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    if (typeof window === "undefined") return undefined;
    const hero = heroRef.current;
    if (!hero) return undefined;
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!supportsFinePointer.matches) return undefined;

    const layers = [primaryOrbRef.current, secondaryOrbRef.current].filter(Boolean);
    if (layers.length === 0) return undefined;

    const previousTransitions = layers.map((layer) => layer.style.transition);
    layers.forEach((layer) => {
      layer.style.transition = "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)";
    });

    let raf = null;
    let pointer = null;

    const apply = () => {
      if (!pointer) {
        raf = null;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const relativeX = (pointer.x - (rect.left + rect.width / 2)) / rect.width;
      const relativeY = (pointer.y - (rect.top + rect.height / 2)) / rect.height;

      layers.forEach((layer, index) => {
        if (!layer) return;
        const depth = index === 0 ? 24 : 16;
        layer.style.transform = `translate3d(${relativeX * depth}px, ${relativeY * depth}px, 0)`;
      });

      pointer = null;
      raf = null;
    };

    const reset = () => {
      layers.forEach((layer) => {
        if (!layer) return;
        layer.style.transform = "translate3d(0, 0, 0)";
      });
    };

    const onPointerMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!raf) {
        raf = window.requestAnimationFrame(apply);
      }
    };

    const onPointerLeave = () => {
      pointer = null;
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = null;
      }
      reset();
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      layers.forEach((layer, index) => {
        if (!layer) return;
        layer.style.transform = "translate3d(0, 0, 0)";
        layer.style.transition = previousTransitions[index] ?? "";
      });
    };
  }, [shouldReduceMotion]);

  const handlePrimaryClick = useCallback(
    (event) => {
      celebrate({ id: "hero-primary-cta", source: event.currentTarget });
    },
    [celebrate]
  );

  return (
    <section ref={heroRef} id="hero" data-snap-section className="relative isolate overflow-hidden">
      <div className="story-stripe" aria-hidden />
      <div
        ref={primaryOrbRef}
        className="glow-orb glow-orb--primary -top-32 -left-24 h-[36rem] w-[36rem]"
        aria-hidden
      />
      <div
        ref={secondaryOrbRef}
        className="glow-orb glow-orb--primary-soft top-1/3 -right-20 h-[30rem] w-[30rem]"
        aria-hidden
      />
      <div className="grain-overlay" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 py-28 sm:py-32 flex flex-col items-center text-center gap-12">
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
          className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white"
        >
          <span className="block">{t.titleLead}</span>
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

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.9, delay: 0.1 }}
          className="max-w-2xl text-lg sm:text-xl text-neutral-700 dark:text-gray-300"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MotionLink
            to="/contact"
            onClick={handlePrimaryClick}
            className="magnetic-cta inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_22px_44px_rgba(255,204,2,0.35)] transition-colors duration-200 hover:bg-brand-yellow-dark hover:shadow-[0_24px_55px_rgba(255,204,2,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2"
          >
            {t.primaryCta} <ArrowRight size={18} />
          </MotionLink>
          <Link
            to="/measurement"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300/70 bg-white/80 px-6 py-3 text-sm font-semibold text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_55px_rgba(15,23,42,0.16)] dark:border-white/15 dark:bg-white/10 dark:text-gray-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_rgba(2,6,23,0.5)]"
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
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 px-6 py-6 text-left shadow-[12px_24px_50px_rgba(15,23,42,0.12)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-[18px_32px_70px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-white/10 dark:shadow-[12px_24px_55px_rgba(2,6,23,0.6)]"
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
          transition={shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.7 }}
          className="relative w-full rounded-3xl border border-white/60 bg-white/70 px-6 py-8 text-left shadow-[24px_38px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[24px_40px_90px_rgba(2,6,23,0.55)]"
        >
          <div className="absolute -left-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand-blue/30 md:block" style={{ animation: "pulse-ring 3.5s infinite" }} aria-hidden />
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            {t.storyline.map((story) => (
              <div key={story.title} className="relative pl-5">
                <span className="absolute left-0 top-1 h-8 w-0.5 rounded-full bg-gradient-to-b from-brand-blue to-brand-teal" aria-hidden />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{story.title}</h3>
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
