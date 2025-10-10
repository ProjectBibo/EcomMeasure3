// src/components/Hero.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MoveDown } from "lucide-react";

const heroHighlights = [
  {
    label: "Experimenten per jaar",
    value: "120+",
    helper: "Hypotheses gevalideerd met echte gebruikersdata",
  },
  {
    label: "Conversiestijging",
    value: "18%",
    helper: "Gemiddelde uplift bij nieuwe trajecten",
  },
  {
    label: "Doorlooptijd",
    value: "30 dagen",
    helper: "Van inzicht naar live verbeteringen",
  },
];

const heroStoryline = [
  {
    title: "Begin met een scherpe vraag",
    copy: "We onderzoeken waar klanten afhaken en koppelen die inzichten aan de juiste metrics.",
  },
  {
    title: "Vertaal signalen naar experimenten",
    copy: "Samen prioriteren we verbeteringen en testen we ze gericht op conversie én merkbeleving.",
  },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      data-snap-section
      className="relative isolate overflow-hidden"
    >
      <div className="story-stripe" aria-hidden />
      <div className="glow-orb glow-orb--blue -top-32 -left-24 h-[36rem] w-[36rem]" aria-hidden />
      <div className="glow-orb glow-orb--teal top-1/3 -right-20 h-[30rem] w-[30rem]" aria-hidden />
      <div className="glow-orb glow-orb--yellow bottom-0 left-1/4 h-[22rem] w-[22rem]" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 py-28 sm:py-32 flex flex-col items-center text-center gap-12">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 0.7, ease: "easeOut" }
          }
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white"
        >
          <Sparkles size={14} /> Datagedreven storytelling
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 0.8, ease: "easeOut" }
          }
          className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white"
        >
          Laat bezoekers meebewegen met een <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-yellow bg-clip-text text-transparent">magnetische customer journey</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 0.9, delay: 0.1 }
          }
          className="max-w-2xl text-lg sm:text-xl text-neutral-700 dark:text-gray-300"
        >
          We combineren inzichten uit UX-onderzoek, GA4 en live experimenten tot een verhalend geheel. Elke scroll geeft bezoekers een volgende reden om door te lezen — én jou meer grip op groei.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion ? undefined : { delay: 0.15, duration: 0.6 }
          }
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            data-cursor="accent"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_18px_35px_rgba(59,130,246,0.35)] transition hover:shadow-[0_28px_55px_rgba(59,130,246,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-yellow"
          >
            Plan een kennismaking <ArrowRight size={18} />
          </motion.a>
          <a
            href="#workflow"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/80 px-6 py-3 text-sm font-semibold text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_55px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_50px_rgba(2,6,23,0.55)]"
          >
            Bekijk de aanpak
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }
          }
          className="grid gap-6 w-full sm:grid-cols-3"
        >
          {heroHighlights.map((item) => (
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
          transition={
            shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.7 }
          }
          className="relative w-full rounded-3xl border border-white/60 bg-white/70 px-6 py-8 text-left shadow-[24px_38px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[24px_40px_90px_rgba(2,6,23,0.55)]"
        >
          <div className="absolute -left-10 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand-blue/30 md:block" style={{ animation: "pulse-ring 3.5s infinite" }} aria-hidden />
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            {heroStoryline.map((story) => (
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
          transition={
            shouldReduceMotion ? undefined : { delay: 0.35, duration: 0.6 }
          }
          className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-gray-400"
        >
          Scroll verder
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
