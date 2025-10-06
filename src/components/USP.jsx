import React from "react";

export default function USP() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Meer weten = minder gokken",
          text: "Onze workflows zijn op maat gemaakt om websites en mensen te helpen groeien.",
        },
        {
          title: "Ontdek quick wins",
          text: "Snelle verbeteringen dankzij GA4, SEO en trend-research.",
        },
        {
          title: "Verbeter de gebruikservaring",
          text: "Gericht UX research geeft je inzichten die conversie verhogen.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-3 text-brand-blue">
            {item.title}
          </h3>
          <p className="text-neutral-600 text-sm">{item.text}</p>
        </div>
      ))}
    </section>
  );
}

