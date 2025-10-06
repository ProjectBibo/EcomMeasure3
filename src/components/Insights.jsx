import React from "react";
import { motion } from "framer-motion";

const insights = [
  {
    title: "Ontwerpkeuzes maken met data",
    tag: "Insight #1",
    text: "We helpen je betere beslissingen te nemen met betrouwbare data en UX-onderzoek.",
  },
  {
    title: "Co-creatie met klanten",
    tag: "Insight #2",
    text: "Met co-creatie processen verzilver je kennis en inzichten uit je doelgroep.",
  },
];

export default function Insights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      {insights.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 8px 20px rgba(0,74,173,0.15)",
          }}
          className="bg-white border border-neutral-200 rounded-xl p-8 shadow transition"
        >
          <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
            {item.tag}
          </span>
          <h3 className="font-semibold mb-2 text-brand-blue">{item.title}</h3>
          <p className="text-neutralInk/80">{item.text}</p>
        </motion.div>
      ))}
    </section>
  );
}
