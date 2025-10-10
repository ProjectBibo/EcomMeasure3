import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer data-snap-section className="relative mt-16 overflow-hidden bg-surface-soft dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-700 py-14">
      <motion.div
        animate={shouldReduceMotion ? { backgroundPosition: "0% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-teal to-brand-yellow bg-[length:200%_200%]"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="story-stripe" aria-hidden />
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">EcomMeasure</h4>
          <p className="text-neutral-600 dark:text-gray-400 text-sm">{t.intro}</p>
          <a href="#contact" className="mt-4 inline-block px-4 py-2 bg-brand-yellow text-neutral-900 rounded-md font-medium hover:opacity-90">
            {t.cta}
          </a>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">{t.columns.measurement.title}</h4>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
            {t.columns.measurement.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">{t.columns.cro.title}</h4>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
            {t.columns.cro.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-blue">{t.columns.contact.title}</h4>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-gray-400">
            {t.columns.contact.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-neutral-500 dark:text-gray-500 text-xs">
        © {new Date().getFullYear()} EcomMeasure. {t.rights}
      </div>
    </footer>
  );
}
