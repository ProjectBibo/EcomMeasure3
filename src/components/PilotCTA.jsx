import React from "react";

export default function PilotCTA() {
  return (
    <section id="pilot" className="section-shell section-padding">
      <div data-tilt-card className="surface-card p-10">
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
            className="primary-btn text-sm uppercase tracking-wide"
          >
            Plan een gratis kennismaking
          </a>
        </div>
      </div>
    </section>
  );
}
