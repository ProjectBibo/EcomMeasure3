import React from "react";

export default function Insights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
          Insight #1
        </span>
        <h3 className="font-semibold mb-2 text-brand-blue">
          Ontwerpkeuzes maken met data
        </h3>
        <p className="text-neutral-600 mb-4">
          We helpen je betere beslissingen te nemen met betrouwbare data en
          UX-onderzoek.
        </p>
      </div>
      <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
          Insight #2
        </span>
        <h3 className="font-semibold mb-2 text-brand-blue">
          Co-creatie met klanten
        </h3>
        <p className="text-neutral-600 mb-4">
          Met co-creatie processen verzilver je kennis en inzichten uit je
          doelgroep.
        </p>
      </div>
    </section>
  );
}

