// src/components/Skills.jsx
import React from "react";

const skills = [
  "Google Analytics 4",
  "Consent Mode v2",
  "SEO & keyword research",
  "UX research",
  "Experimenten / A/B",
  "Dashboards & rapportages",
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        Waar ik mee werk
      </h2>
      <ul className="mt-6 flex gap-3 flex-wrap">
        {skills.map((s) => (
          <li
            key={s}
            className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 text-sm text-neutral-700 dark:text-gray-200 border border-black/5 dark:border-white/10"
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
