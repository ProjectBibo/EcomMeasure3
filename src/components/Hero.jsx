// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden max-w-7xl mx-auto px-6 py-20"
    >
      {/* Achtergrond blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-blue/20 dark:bg-brand-blue/40 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-60 -right-40 w-[500px] h-[500px] bg-brand-teal/20 dark:bg-brand-teal/40 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Bereik een geoptimaliseerde website dankzij een{" "}
          <span className="text-brand-blue">data- én mens-gedreven</span> aanpak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-neutral-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
        >
          Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat je er het volledige potentieel uit kunt halen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-full shadow hover:shadow-lg transition"
          >
            Zijn wij een goede match? <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
