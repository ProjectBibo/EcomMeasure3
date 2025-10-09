import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    title: "Ontdek de quick wins",
    text: "We analyseren bestaande data, heatmaps en customer journeys om de grootste kansen boven water te krijgen.",
    deliverable: "Een snelle prioriteitenlijst met impactscore.",
  },
  {
    title: "Onderzoek & concept",
    text: "Met interviews, usability tests en prototyping toetsen we assumpties voordat er gebouwd wordt.",
    deliverable: "Valide concepten die klaar zijn voor experimenten.",
  },
  {
    title: "Experiment & implementatie",
    text: "Samen met je team lanceren we A/B-tests of releases. De resultaten vertalen we direct naar roadmap keuzes.",
    deliverable: "Een meetbaar effect en concrete vervolgstappen.",
  },
];

export default function Workflow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="workflow"
      data-snap-section
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-brand-teal/4 to-brand-yellow/6 dark:from-brand-blue/10 dark:via-brand-teal/10 dark:to-brand-yellow/10" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
            Zo stroomt een project
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Elke fase is een hoofdstuk in je verhaal
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-gray-300">
            De magnetische scroll flow vertaalt zich naar je projectplanning. Terwijl bezoekers verder lezen, bouwt je team aan verbeteringen die elkaar logisch opvolgen.
          </p>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute left-[22px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-brand-blue via-brand-teal to-brand-yellow md:block" aria-hidden />
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { delay: index * 0.08, duration: 0.6 }
                }
                className="relative grid gap-5 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5 md:grid-cols-[auto_1fr]"
              >
                <div className="relative flex h-full items-start justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white font-semibold">
                    0{index + 1}
                  </div>
                  <div className="absolute left-1/2 top-12 hidden h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-brand-blue/20 md:block" aria-hidden />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{step.text}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                    {step.deliverable}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
