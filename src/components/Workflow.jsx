import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Workflow() {
  const items = [
    { title: "Ontdek quick wins", text: "Voor je webshop of site dankzij Google Analytics 4, SEO en trend-research." },
    { title: "Verbeter de gebruikservaring", text: "Gericht User Experience research geeft je inzichten die conversie verhogen." },
    { title: "Verzilver je klantenkennis", text: "Met behulp van ons co-creatieproces en marketinginzichten." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="h2 text-brand-blue mb-12">Meer weten = minder gokken</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow transition"
          >
            <h3 className="text-lg font-semibold text-brand-blue mb-2">{item.title}</h3>
            <p className="text-neutral-600 dark:text-gray-400 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
