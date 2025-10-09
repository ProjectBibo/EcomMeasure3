import React from "react";
import { motion } from "framer-motion";

const insights = [
  {
    tag: "Insight #1",
    title: "Ontwerpkeuzes maak je met data én empathie",
    text: "Kwalitatief onderzoek geeft context bij analytics. Zo weet je niet alleen wat er gebeurt, maar ook waarom.",
    stat: "62%",
    detail: "van klanten verwacht persoonlijke begeleiding tijdens hun aankoop",
  },
  {
    tag: "Insight #2",
    title: "Co-creatie levert blijvende verbetering op",
    text: "Met sessies met echte klanten verzamel je ideeën die direct in de roadmap landen.",
    stat: "4.8",
    detail: "gemiddelde waardering voor onze co-creatie workshops",
  },
];

export default function Insights() {
  return (
    <section
      data-snap-section
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/80 dark:from-surface-dark/90 dark:via-surface-dark/70 dark:to-surface-dark/90" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            Inzichten die de scroll-story kracht geven
          </motion.h2>
          <p className="max-w-lg text-sm text-neutral-600 dark:text-gray-300">
            Elk inzicht vormt een mini cliffhanger. We tonen bezoekers het effect van hun keuze, voordat ze scrollen naar het volgende hoofdstuk.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {insights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <span className="inline-flex items-center rounded-full bg-accent3/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900 dark:text-neutral-900">
                {item.tag}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.text}</p>
              <div className="mt-8 flex items-end gap-4">
                <span className="text-5xl font-black text-accent dark:text-accent2">{item.stat}</span>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-gray-400">{item.detail}</p>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
