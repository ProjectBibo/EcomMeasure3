// src/components/HowIWork.jsx
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Luisteren & Diagnose",
    desc: "We starten met een scherpe intake: doelen, pijnpunten, en nulmeting.",
    icon: "🔎",
  },
  {
    title: "Meten & Inrichten",
    desc: "GA4 + Consent Mode v2 goed gezet, SEO-basis op orde, tracking waterdicht.",
    icon: "📈",
  },
  {
    title: "Verbeteren & Leren",
    desc: "Snelle quick wins + UX-inzichten. We testen, meten, en schalen wat werkt.",
    icon: "⚙️",
  },
];

export default function HowIWork() {
  return (
    <section id="how" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Hoe ik werk
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-gray-400 max-w-2xl">
          Een simpel proces met resultaat: eerst begrijpen, dan meten, dan verbeteren.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur shadow-lg border border-black/5 dark:border-white/10"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{s.title}</h3>
            <p className="mt-2 text-neutral-600 dark:text-gray-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
