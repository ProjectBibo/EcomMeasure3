import React from "react";
import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section id="testimonial" className="bg-surface.soft dark:bg-surface.dark py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Klantvideo"
            allowFullScreen
          ></iframe>
        </motion.div>

        <div>
          <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
            KLANTEN AAN HET WOORD
          </span>
          <motion.blockquote
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white dark:bg-surface.dark border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 mb-4 shadow"
          >
            <p className="mb-3 text-neutralInk/80 dark:text-gray-400">
              “Goede communicatie en samenwerking. Duidelijke rapportages en verbeterpunten.”
            </p>
            <footer className="text-sm text-neutral-500">— Joey Tuinstra, Offenga BMW Onderdelen</footer>
          </motion.blockquote>
          <a href="#reviews" className="text-brand-blue hover:underline font-medium">
            Bekijk alle reviews
          </a>
        </div>
      </div>
    </section>
  );
}
