import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      data-snap-section
      className="relative mt-16 overflow-hidden bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 py-14"
    >
      {/* Animated gradient bar */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent2 to-accent3 bg-[length:200%_200%]"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="story-stripe" aria-hidden />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-accent">EcomMeasure</h4>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">
            Samen komen we altijd tot een voorstel op maat dat aansluit bij jouw doelstellingen en budget.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-block px-4 py-2 bg-accent3 text-neutral-900 rounded-md font-medium hover:opacity-90"
          >
            Laten we kennismaken
          </a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Meer Meten</h4>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
            <li>Google Analytics 4</li>
            <li>Consent Mode</li>
            <li>Dashboarding</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Optimaliseer je site</h4>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
            <li>UX Audit</li>
            <li>Conversion Research</li>
            <li>Strategische verbeteringen</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-accent">Contact</h4>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">info@ecommeasure.com</p>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">+31 6 12345678</p>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">Deventer, Nederland</p>
        </div>
      </div>
      <div className="mt-8 text-center text-neutral-500 dark:text-gray-500 text-xs">
        © {new Date().getFullYear()} EcomMeasure. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
