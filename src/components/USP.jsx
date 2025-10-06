import React from "react";
import { motion } from "framer-motion";

const items = [
  { title: "Meer weten = minder gokken", text: "Onze workflows zijn op maat gemaakt om websites en mensen te helpen groeien." },
  { title: "Ontdek quick wins", text: "Snelle verbeteringen dankzij GA4, SEO en trend-research." },
  { title: "Verbeter de gebruikservaring", text: "Gericht UX research geeft je inzichten die conversie verhogen." },
];

export default function USP() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 12px 30px rgba(0,0,0,0.1)" }}
          className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl p-8 transition"
        >
          <h3 className="text-lg font-semibold mb-3 text-brand-blue">{item.title}</h3>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">{item.text}</p>
        </motion.div>
      ))}
    </section>
  );
}
