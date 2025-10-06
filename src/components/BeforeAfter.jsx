// src/components/BeforeAfter.jsx
import React from "react";

export default function BeforeAfter({
  before = "/case-demo-before.jpg",
  after = "/case-demo-after.jpg",
  title = "Voorbeeld-case",
  note = "*Voorbeeld om het effect van kleine optimalisaties te illustreren.",
}) {
  return (
    <section id="case" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-gray-400">{note}</p>
      </div>

      <div className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-black/5 dark:border-white/10 mx-auto">
        <img src={before} alt="Voor optimalisaties" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0">
          <img
            src={after}
            alt="Na optimalisaties"
            className="w-full h-full object-cover [clip-path:inset(0_var(--x,50%)_0_0)] transition-[clip-path] duration-150"
          />
        </div>
        <input
          type="range"
          defaultValue="50"
          aria-label="Vergelijk voor en na"
          onInput={(e) =>
            e.currentTarget.parentElement.style.setProperty("--x", `${100 - e.currentTarget.value}%`)
          }
          className="absolute left-1/2 -translate-x-1/2 bottom-4 w-3/4 accent-brand-blue"
        />
      </div>
    </section>
  );
}
