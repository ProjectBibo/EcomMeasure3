import React from "react";

export default function PilotCTA() {
  return (
    <section id="pilot" className="max-w-6xl mx-auto px-6 py-20">
      <div data-tilt-card className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
        <h2 className="vt-heading text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">Ben jij mijn eerste pilot-klant?</h2>
        <p className="mt-3 text-neutral-700 dark:text-gray-200 max-w-2xl">
          Transparant, scherp geprijsd, en binnen 30 dagen live met betrouwbare metingen.
          Jij krijgt focus en momentum — ik lever resultaat en duidelijke rapportages.
        </p>
        <div className="mt-6">
          <a
            href="#contact"
            data-magnetic
            data-variant="primary"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Plan een gratis kennismaking
          </a>
        </div>
      </div>
    </section>
  );
}
