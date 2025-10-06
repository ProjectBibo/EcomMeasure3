import React from "react";
import { motion } from "framer-motion";

export default function CaseHighlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      {/* Tekstblok */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-xl p-8 shadow"
      >
        <h3 className="font-semibold mb-2 text-brand-blue">Welke problemen ervaren klanten bij hun webshop?</h3>
        <p className="text-neutral-600 dark:text-gray-400 mb-4">
          Inzichten uit cases geven antwoord op echte klantproblemen en oplossingen.
        </p>
        <a
          href="#cases"
          className="px-4 py-2 bg-brand-yellow text-neutral-900 rounded-md font-medium hover:opacity-90"
        >
          Bekijk de case
        </a>
      </motion.div>

      {/* Afbeelding met overlay */}
      <div className="relative rounded-xl overflow-hidden shadow">
        <img
          src="https://dummyimage.com/400x500/eeeeee/004aad&text=Case+Image"
          alt="Case voorbeeld"
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 text-white"
        >
          <p className="text-lg font-semibold">Bekijk de case</p>
        </motion.div>
      </div>
    </section>
  );
}
