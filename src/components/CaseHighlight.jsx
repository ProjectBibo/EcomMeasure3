import React from "react";
import { motion } from "framer-motion";

export default function CaseHighlight() {
  return (
    <section
      id="case"
      data-snap-section
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent3/10 dark:from-accent/15 dark:via-transparent dark:to-accent3/15" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Case spotlight
          </span>
          <h3 className="mt-4 text-3xl font-semibold text-neutral-900 dark:text-white">
            Hoe Offenga BMW onderdelen 27% meer conversie zag
          </h3>
          <p className="mt-4 text-base text-neutral-600 dark:text-gray-300">
            Door drie hoofdstukken in de journey te herschrijven – ontdekken, vergelijken en afrekenen – ontstond een verhaal dat klanten vanzelf verder liet scrollen.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-gray-300">
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden />Nieuwe "snelle vergelijking" module met realtime voorraad.
            </li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-accent2" aria-hidden />Check-out flow met microcopy die bezwaren wegneemt.
            </li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-accent3" aria-hidden />Dashboards die resultaten per sprint terugkoppelen.
            </li>
          </ul>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-neutral-900"
          >
            Plan jouw case
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/50 shadow-2xl backdrop-blur"
        >
          <img
            src="/case-after.jpg"
            alt="Case resultaat"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/70">Story beat</p>
              <p className="text-lg font-semibold">Vergelijken voelt als een persoonlijke aanbeveling</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.2em]">
              <div className="rounded-xl border border-white/30 bg-white/10 p-3 text-center">
                +27% <span className="block text-[10px]">Conversie</span>
              </div>
              <div className="rounded-xl border border-white/30 bg-white/10 p-3 text-center">
                -32% <span className="block text-[10px]">Bounce</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
