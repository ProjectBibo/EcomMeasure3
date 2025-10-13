// src/components/Hero.jsx
import React, { useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MoveDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import DataFunnelScene from "./DataFunnelScene";

const STATIC_FUNNEL_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232563eb'/%3E%3Cstop offset='50%25' stop-color='%2314b8a6'/%3E%3Cstop offset='100%25' stop-color='%23facc15'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M20 40 C120 10 160 110 300 70' stroke='url(%23a)' stroke-width='6' stroke-linecap='round' fill='none' opacity='0.7'/%3E%3Cpath d='M40 130 C110 100 200 150 300 120' stroke='url(%23a)' stroke-width='6' stroke-linecap='round' fill='none' opacity='0.5'/%3E%3Ccircle cx='240' cy='120' r='26' fill='url(%23a)' opacity='0.6'/%3E%3C/svg%3E";

const HERO_PREFETCHERS = {
  contact: () => import("../pages/ContactPage"),
  measurement: () => import("../pages/Measurement"),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].hero;
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  const prefetched = useRef(new Set());

  const prefetch = useCallback((key) => {
    const loader = HERO_PREFETCHERS[key];
    if (!loader || prefetched.current.has(key)) return;
    loader();
    prefetched.current.add(key);
  }, []);

  const resetMagnet = useCallback((element) => {
    if (!element) return;
    element.style.setProperty("--magnet-x", "0px");
    element.style.setProperty("--magnet-y", "0px");
  }, []);

  const applyMagnet = useCallback(
    (element, event) => {
      if (!element || shouldReduceMotion) return;
      const rect = element.getBoundingClientRect();
      const strength = 18;
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
      element.style.setProperty("--magnet-x", `${x}px`);
      element.style.setProperty("--magnet-y", `${y}px`);
    },
    [shouldReduceMotion]
  );

  const createMagnetHandlers = useCallback(
    (ref) => ({
      onPointerMove: (event) => applyMagnet(ref.current, event),
      onPointerLeave: () => resetMagnet(ref.current),
      onBlur: () => resetMagnet(ref.current),
    }),
    [applyMagnet, resetMagnet]
  );

  const primaryHandlers = createMagnetHandlers(primaryRef);
  const secondaryHandlers = createMagnetHandlers(secondaryRef);

  return (
    <section id="hero" data-snap-section className="relative isolate overflow-hidden">
      <div className="story-stripe" aria-hidden />
      <div className="glow-orb glow-orb--blue -top-32 -left-24 h-[36rem] w-[36rem]" aria-hidden />
      <div className="glow-orb glow-orb--teal top-1/3 -right-20 h-[30rem] w-[30rem]" aria-hidden />
      <div className="glow-orb glow-orb--yellow bottom-0 left-1/4 h-[22rem] w-[22rem]" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 py-28 text-center sm:py-32">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white"
        >
          <Sparkles size={14} /> {t.badge}
        </motion.span>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl">
            {t.sequence.map((word, index) => (
              <motion.span
                key={word}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.6, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-[3.5rem]"
          >
            {t.headline}
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.35 }}
            className="keyword-row"
            aria-label="Technologieën"
          >
            {t.keywords.map((keyword) => (
              <span key={keyword} className="keyword-token">
                {keyword}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.45 }}
            className="max-w-xl text-lg text-neutral-700 dark:text-gray-300"
          >
            {t.subheadline}
          </motion.p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.75, delay: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[var(--radius-2xl)] border border-white/60 bg-white/70 p-6 shadow-[24px_38px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[24px_40px_90px_rgba(2,6,23,0.55)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10" aria-hidden />
          {shouldReduceMotion ? (
            <img
              src={STATIC_FUNNEL_IMAGE}
              alt={t.funnelAlt}
              className="relative mx-auto h-56 w-full max-w-xl object-contain"
            />
          ) : (
            <DataFunnelScene className="relative mx-auto h-56 w-full max-w-xl" />
          )}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.55, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            ref={primaryRef}
            to="/contact?schedule=true"
            className="magnet-btn magnet-btn--primary"
            {...primaryHandlers}
            onMouseEnter={() => prefetch("contact")}
            onFocus={() => prefetch("contact")}
          >
            {t.primaryCta}
            <ArrowRight size={18} />
          </Link>
          <Link
            ref={secondaryRef}
            to="/measurement"
            className="magnet-btn magnet-btn--ghost"
            {...secondaryHandlers}
            onMouseEnter={() => prefetch("measurement")}
            onFocus={() => prefetch("measurement")}
          >
            {t.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.65, duration: 0.7 }}
          className="grid w-full gap-6 sm:grid-cols-3"
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
                  boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.6), inset -8px -12px 24px rgba(148,163,184,0.25)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/65 via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/15 dark:via-transparent dark:to-transparent" aria-hidden />
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-brand-blue/10 blur-xl transition group-hover:scale-125" aria-hidden />
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500 dark:text-gray-400">{item.label}</div>
              <div className="mt-3 text-3xl font-bold text-brand-blue dark:text-brand-teal">{item.value}</div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.helper}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.7, duration: 0.7 }}
          className="relative w-full rounded-3xl border border-white/60 bg-white/70 px-6 py-8 text-left shadow-[24px_38px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[24px_40px_90px_rgba(2,6,23,0.55)]"
        >
          <div className="absolute -left-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand-blue/30 md:block" style={{ animation: shouldReduceMotion ? "none" : "pulse-ring 3.5s infinite" }} aria-hidden />
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            {t.storyline.map((story) => (
              <div key={story.title} className="relative pl-5">
                <span className="absolute left-0 top-1 h-8 w-0.5 rounded-full bg-gradient-to-b from-brand-blue via-brand-teal to-brand-yellow" aria-hidden />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{story.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-300">{story.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-gray-400"
        >
          {t.scrollLabel}
          <motion.div
            animate={shouldReduceMotion ? { opacity: 0.7 } : { y: [0, 8, 0] }}
            transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex h-10 w-6 items-center justify-center rounded-full border border-neutral-400/50 bg-white/60 backdrop-blur dark:border-white/30 dark:bg-white/5"
          >
            <MoveDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
