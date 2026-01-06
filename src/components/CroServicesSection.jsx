import React from "react";

function CroServiceCard({ service }) {
  return (
    <div className="glass-card flex h-full flex-col gap-4 text-neutral-900">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffcc02] shadow-[0_8px_18px_rgba(255,204,2,0.25)]">
          {service.badge}
        </span>
        {service.tag && <span className="text-xs font-semibold text-neutral-600">{service.tag}</span>}
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold leading-tight text-neutral-900">{service.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-700">{service.description}</p>
      </div>

      <div className="grid gap-3 text-sm leading-relaxed text-neutral-800">
        {service.blocks.map((block) => (
          <div key={block.title} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{block.title}</p>
            <ul className="space-y-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-6 flex-shrink-0 bg-neutral-300" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CroServicesSection({ section }) {
  return (
    <section className="section-shell border-t border-neutral-200 bg-white">
      <div className="site-container space-y-10">
        <div className="section-heading space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{section.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{section.title}</h2>
          <p className="text-lg text-neutral-700">{section.intro}</p>
        </div>

        <div className="pricing-section relative overflow-hidden rounded-[28px] px-4 py-10 sm:px-8 sm:py-12">
          <div aria-hidden className="pricing-blob pricing-blob-1" />
          <div aria-hidden className="pricing-blob pricing-blob-2" />
          <div aria-hidden className="pricing-blob pricing-blob-3" />

          <div className="relative z-10 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
            {section.services.map((service) => (
              <CroServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
