import React from "react";
import { motion } from "framer-motion";
import { Radar, Compass, Sparkles } from "lucide-react";

const uspItems = [
  {
    icon: Radar,
    title: "Diepgaand meten zonder frictie",
    text: "We zetten GA4, Consent Mode en events strak neer zodat data betrouwbaar én privacy proof blijft.",
    detail: "Inclusief dashboards die direct bruikbaar zijn voor marketeers.",
  },
  {
    icon: Compass,
    title: "Prioriteiten die aanvoelen als een verhaal",
    text: "Elke stap krijgt een duidelijke rol in de journey. Zo weet je welke verbeteringen de meeste impact maken.",
    detail: "Van quick wins tot strategische herontwerpen.",
  },
  {
    icon: Sparkles,
    title: "UX die klanten verrast",
    text: "We testen en valideren concepten met echte gebruikers zodat je team vol vertrouwen kan lanceren.",
    detail: "Ondersteund met prototypes, copy en visuele richtlijnen.",
  },
];

export default function USP() {
  return (
    <section
      id="diensten"
      data-snap-section
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80 dark:from-surface-dark/90 dark:via-surface-dark/70 dark:to-surface-dark/90" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)] items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-neutral-200/70 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Kompas
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
              Meer weten = minder gokken
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-gray-300">
              Bouw aan een magnetische flow die bezoekers stap voor stap meeneemt. Wij koppelen meetpunten aan het verhaal van je merk zodat strategie, creatie en development dezelfde taal spreken.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-600 dark:text-gray-300">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden />Inzicht in waar bezoekers afhaken en waarom.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />Roadmaps die teams helpen focussen op impact.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-yellow" aria-hidden />Visuals en copy die consistent blijven door de journey.</li>
            </ul>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {uspItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur transition dark:border-white/10 dark:bg-white/5"
              >
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-blue/10 blur-3xl transition group-hover:scale-125" aria-hidden />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-gray-300">{item.text}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-gray-400">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
