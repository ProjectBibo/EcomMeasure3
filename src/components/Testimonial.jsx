import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <section
      id="reviews"
      data-snap-section
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 via-transparent to-brand-yellow/10 dark:from-brand-blue/15 dark:via-transparent dark:to-brand-yellow/15" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900">
            Klanten aan het woord
          </span>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 space-y-4 text-neutral-700 dark:text-gray-200"
          >
            <Quote className="text-brand-blue" size={28} />
            <p className="text-lg leading-relaxed">
              “Goede communicatie en samenwerking. Duidelijke rapportages en verbeterpunten. Je voelt dat alles is doordacht vanuit de klant.”
            </p>
            <footer className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-gray-400">
              Joey Tuinstra — Offenga BMW Onderdelen
            </footer>
          </motion.blockquote>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs uppercase tracking-[0.2em] text-neutral-600 dark:text-gray-400">
            <div className="rounded-xl border border-white/70 bg-white/70 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
              4.9/5 <span className="block text-[10px]">Gemiddelde reviewscore</span>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/70 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
              18 <span className="block text-[10px]">UX & data trajecten</span>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/70 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
              100% <span className="block text-[10px]">Aanbevelen ons door</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-video overflow-hidden rounded-3xl border border-white/50 shadow-2xl"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Klantvideo"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-neutral-800 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
            Scroll voor meer verhalen
          </div>
        </motion.div>
      </div>
    </section>
  );
}
