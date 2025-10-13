import React from "react";

export default function PilotCTA() {
  return (
    <section id="pilot" className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl p-10 bg-gradient-to-br from-brand-blue/12 to-brand-teal/10 dark:from-brand-blue/25 dark:to-brand-teal/20 border border-black/5 dark:border-white/10 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Ben jij mijn eerste pilot-klant?</h2>
        <p className="mt-3 text-neutral-700 dark:text-gray-200 max-w-2xl">
          Transparant, scherp geprijsd, en binnen 30 dagen live met betrouwbare metingen.
          Jij krijgt focus en momentum — ik lever resultaat en duidelijke rapportages.
        </p>
        <div className="mt-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2"
          >
            Plan een gratis kennismaking
          </a>
        </div>
      </div>
    </section>
  );
}
