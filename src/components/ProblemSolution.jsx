import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { AnimatedHeading, AnimatedParagraph } from "./ExpressiveText";

export default function ProblemSolution() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = translations[language].problemSolution;

  return (
    <section className="section-shell bg-white" aria-labelledby="problem-solution-heading">
      <div className="site-container">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-left">
            <AnimatedHeading
              id="problem-solution-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl"
            >
              {copy.headline}
            </AnimatedHeading>
            <motion.ul
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
              className="grid gap-3 text-sm text-neutral-700 sm:grid-cols-3 sm:text-base"
            >
              {copy.pains.map((item) => (
                <li key={item} className="card-surface border border-neutral-100/60 p-4 shadow-sm">
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="space-y-5 rounded-2xl bg-surface-soft/70 p-6 shadow-sm md:p-8">
            <AnimatedParagraph
              text={copy.solution}
              language={language}
              highlight
              className="text-base leading-relaxed text-neutral-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
