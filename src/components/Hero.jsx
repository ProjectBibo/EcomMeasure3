// src/components/Hero.jsx
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
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

            <div className="w-full max-w-xl rounded-2xl border border-neutral-200/80 bg-white/90 p-5 shadow-[0_16px_36px_rgba(15,23,42,0.14)] backdrop-blur">
              <p className="text-sm font-semibold text-neutral-900">Gratis CRO-tips direct in je inbox:</p>
              <form className="mt-4 space-y-3" onSubmit={(event) => event.preventDefault()}>
                <label className="block space-y-2 text-sm font-semibold text-neutral-800">
                  <span className="sr-only">E-mailadres</span>
                  <div className="relative flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-2.5 shadow-sm">
                    <Mail size={18} className="text-neutral-500" aria-hidden />
                    <input
                      type="email"
                      placeholder="je@email.nl"
                      className="ml-3 w-full border-0 bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    />
                  </div>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <MotionLink
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFD447] px-5 py-3 text-sm font-semibold text-neutral-900 shadow-md transition hover:shadow-lg"
                    onClick={handlePrimaryCtaClick}
                  >
                    Meld je aan!
                    <ArrowRight size={18} aria-hidden />
                  </MotionLink>
                </div>
                <ul className="space-y-2 pt-1 text-sm text-neutral-700">
                  {["5.000+ mensen ontvangen mijn CRO tips", "Max één e-mail per maand"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={18} className="mt-0.5 text-green-600" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </form>
            </div>

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
