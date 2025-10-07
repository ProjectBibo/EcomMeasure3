// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden max-w-7xl mx-auto px-6 py-20 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white leading-tight"
      >
        Bereik een geoptimaliseerde website dankzij een{" "}
        <span className="text-brand-blue">data- én mens-gedreven</span> aanpak
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-neutral-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
      >
        Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat je
        er het volledige potentieel uit kunt halen.
      </motion.p>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#contact"
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-md shadow hover:shadow-lg transition"
      >
        Zijn wij een goede match? <ArrowRight size={18} />
      </motion.a>
    </section>
  );
}
