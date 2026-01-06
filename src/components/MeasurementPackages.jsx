import React from "react";

function PackageCard({ pkg }) {
  return (
    <div className="glass-card flex h-full flex-col gap-5 text-neutral-900">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffcc02] shadow-[0_8px_18px_rgba(255,204,2,0.25)]">
          {pkg.badge}
        </span>
        {pkg.tag && (
          <span className="text-xs font-semibold text-neutral-600">{pkg.tag}</span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold leading-tight text-neutral-900">{pkg.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-700">{pkg.subtitle}</p>
      </div>

      <ul className="space-y-2 text-sm leading-relaxed text-neutral-800">
        {pkg.bullets.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="mt-2 h-px w-6 flex-shrink-0 bg-neutral-300" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>

      {pkg.extra && (
        <div className="grid gap-3 rounded-xl bg-white/70 p-4 text-sm text-neutral-900 shadow-[0_12px_28px_rgba(15,23,42,0.04)] sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffcc02]">{pkg.extra.getsTitle}</p>
            <ul className="space-y-1.5 text-neutral-800">
              {pkg.extra.gets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-5 flex-shrink-0 bg-neutral-300" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffcc02]">{pkg.extra.resultTitle}</p>
            <ul className="space-y-1.5 text-neutral-800">
              {pkg.extra.results.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-5 flex-shrink-0 bg-neutral-300" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {pkg.note && <p className="text-xs text-neutral-600">{pkg.note}</p>}

      <div className="mt-auto border-t border-white/60 pt-4">
        <p className="text-base font-semibold text-neutral-900">{pkg.price}</p>
      </div>
    </div>
  );
}

export default function MeasurementPackages({ section }) {
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

          <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {section.packages.map((pkg) => (
              <PackageCard key={pkg.title} pkg={pkg} />
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-700">{section.note}</p>
      </div>
    </section>
  );
}
