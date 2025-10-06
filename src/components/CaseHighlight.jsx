import React from "react";

export default function CaseHighlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      {/* Left block */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <h3 className="font-semibold mb-2 text-brand-blue">
          Welke problemen ervaren klanten bij hun webshop?
        </h3>
        <p className="text-neutral-600 mb-4">
          Inzichten uit cases geven antwoord op echte klantproblemen en
          oplossingen.
        </p>
        <a
          href="#cases"
          className="px-4 py-2 bg-brand-yellow text-neutral-900 rounded-md font-medium hover:opacity-90"
        >
          Bekijk de case
        </a>
      </div>

      {/* Right block (e.g. phone mockup or image) */}
      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm flex items-center justify-center">
        <img
          src="https://dummyimage.com/300x500/eeeeee/004aad&text=Case+Image"
          alt="Case voorbeeld"
          className="rounded-lg shadow"
        />
      </div>
    </section>
  );
}

