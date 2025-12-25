import React from "react";

export default function PilotCTA() {
  return (
    <section id="pilot" className="max-w-7xl mx-auto px-6 py-20">
      <div data-tilt-card className="rounded-3xl border border-black/5 bg-gradient-to-br from-brand-blue/12 to-brand-teal/10 p-10 shadow-lg transition-[box-shadow,transform] duration-500 focus-visible:shadow-[0_26px_80px_rgba(15,23,42,0.22)]   ">
        <h2 className="vt-heading text-3xl font-extrabold tracking-tight text-neutral-900  md:text-4xl">Ben jij mijn eerste pilot-klant?</h2>
        <p className="mt-3 text-neutral-700  max-w-2xl">
          Transparant, scherp geprijsd, en binnen 30 dagen live met betrouwbare metingen.
          Jij krijgt focus en momentum — ik lever resultaat en duidelijke rapportages.
        </p>
        <div className="mt-6">
          <a
            href="#contact"
            data-magnetic
            data-variant="primary"
            className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition-colors duration-200"
          >
            Plan een gratis kennismaking
          </a>
        </div>
      </div>
    </section>
  );
}
