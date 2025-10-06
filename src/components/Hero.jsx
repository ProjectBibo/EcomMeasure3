import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center"
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

      {/* Tekst */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h1 mb-6"
        >
          Bereik een geoptimaliseerde website dankzij een{" "}
          <span className="text-brand-blue">data- én mens-gedreven</span> aanpak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-neutral-600 dark:text-gray-400 mb-8 max-w-lg"
        >
          Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat je er het volledige potentieel uit kunt halen.
        </motion.p>

        {/* CTA's */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-md shadow hover:shadow-lg transition"
          >
            Zijn wij een goede match? <ArrowRight size={18} />
          </motion.a>

          <a
            href="#results"
            className="inline-flex items-center px-6 py-3 border border-brand-blue text-brand-blue rounded-md font-medium hover:bg-brand-blue/5 transition"
          >
            Bekijk hoe wij resultaat halen
          </a>
        </motion.div>
      </div>

      {/* Afbeelding */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex justify-center"
      >
        <img
  src="https://i.postimg.cc/x8w89fFC/18ea172b-1632-4e40-86ac-088dca1b90a8.png"
  alt="EcomMeasure hero afbeelding"
  className="rounded-xl shadow-lg"
/>
      </motion.div>
    </section>
  );
}
