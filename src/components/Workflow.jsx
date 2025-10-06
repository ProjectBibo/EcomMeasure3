import React from "react";

export default function Workflow() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-brand-blue">
        Meer weten = minder gokken
      </h2>
      <p className="text-neutral-700 mb-12 max-w-3xl">
        Onze workflows zijn op maat gemaakt om websites én mensen te helpen groeien. 
        We nemen je bij de hand, als we samen onderweg zijn naar online succes.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
          <img src="/icons/analytics.svg" alt="Analytics" className="h-10 mb-4" />
          <h3 className="text-lg font-semibold text-brand-blue mb-2">Ontdek quick wins</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Voor je webshop of site dankzij Google Analytics 4, SEO en trend-research.
          </p>
          <a href="#ga4" className="text-brand-blue hover:underline text-sm">
            Lees meer over onze GA4 werkwijze
          </a>
        </div>

        <div className="flex flex-col items-start bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
          <img src="/icons/ux.svg" alt="UX" className="h-10 mb-4" />
          <h3 className="text-lg font-semibold text-brand-blue mb-2">Verbeter de gebruikerservaring</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Gericht User Experience research geeft je inzichten die conversie verhogen.
          </p>
          <a href="#ux" className="text-brand-blue hover:underline text-sm">
            Lees meer hoe wij sites verbeteren
          </a>
        </div>

        <div className="flex flex-col items-start bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
          <img src="/icons/brain.svg" alt="Co-creatie" className="h-10 mb-4" />
          <h3 className="text-lg font-semibold text-brand-blue mb-2">Verzilver je klantenkennis</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Met behulp van ons co-creatieproces en marketinginzichten.
          </p>
          <a href="#co-create" className="text-brand-blue hover:underline text-sm">
            Meer over co-creatie en marketing
          </a>
        </div>
      </div>
    </section>
  );
}

