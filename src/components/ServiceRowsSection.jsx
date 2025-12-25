import React from "react";

function DetailList({ title, items }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <ul className="space-y-1.5 text-sm text-neutral-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <span aria-hidden className="mt-2 h-px flex-1 max-w-[12px] bg-neutral-300" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceRowsSection({
  eyebrow,
  title,
  intro,
  services,
  ctaLabel,
  ctaHref,
}) {
  return (
    <section className="section-shell border-t border-neutral-200 bg-white">
      <div className="site-container space-y-8">
        <div className="section-heading space-y-3">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h2>
          {intro && <p className="text-lg text-neutral-700">{intro}</p>}
        </div>

        <div className="overflow-hidden rounded-[6px] border border-neutral-200 bg-white">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="grid gap-6 border-neutral-200 p-6 transition-colors hover:bg-neutral-50/60 md:grid-cols-[1.05fr_0.95fr]"
              style={index !== services.length - 1 ? { borderBottomWidth: 1 } : undefined}
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {service.label}
                </p>
                <h3 className="text-2xl font-semibold text-neutral-900">{service.title}</h3>
                <p className="text-neutral-700">{service.description}</p>
              </div>

              <div className="grid gap-4 border-neutral-200 md:grid-cols-2 md:gap-6">
                <DetailList title={service.deliverableTitle} items={service.deliverables} />
                <DetailList title={service.resultTitle} items={service.results} />
              </div>
            </div>
          ))}
        </div>

        {ctaLabel && (
          <div>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
