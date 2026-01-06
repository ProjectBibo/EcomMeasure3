import React from "react";
import { scrollToContactSection } from "../utils/scrollToContact";

function PackageCard({ pkg }) {
  return (
    <div className="glass-card flex h-full flex-col gap-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffcc02]">
          {pkg.badge}
        </span>
        {pkg.tag && (
          <span className="text-xs font-semibold text-white/80">{pkg.tag}</span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold leading-tight text-white">{pkg.title}</h3>
        <p className="text-sm text-neutral-100/90">{pkg.subtitle}</p>
      </div>

      <ul className="space-y-2 text-sm text-neutral-100">
        {pkg.bullets.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <span aria-hidden className="mt-2 h-px w-6 flex-shrink-0 bg-white/40" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>

      {pkg.extra && (
        <div className="grid gap-3 rounded-xl bg-white/5 p-4 text-sm text-neutral-100 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffcc02]">
              {pkg.extra.getsTitle}
            </p>
            <ul className="space-y-1.5 text-neutral-100/90">
              {pkg.extra.gets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-5 flex-shrink-0 bg-white/30" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffcc02]">
              {pkg.extra.resultTitle}
            </p>
            <ul className="space-y-1.5 text-neutral-100/90">
              {pkg.extra.results.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-px w-5 flex-shrink-0 bg-white/30" />
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {pkg.note && <p className="text-xs text-neutral-200/90">{pkg.note}</p>}

      <div className="mt-auto space-y-3 border-t border-white/15 pt-4">
        <p className="text-base font-semibold text-white">{pkg.price}</p>
        <button
          type="button"
          onClick={() => scrollToContactSection()}
          className="inline-flex w-full justify-center rounded-[10px] border border-[#e2b200] bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_10px_24px_rgba(255,204,2,0.3)] transition hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c400]"
        >
          Plan een gratis adviesgesprek
        </button>
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {section.packages.map((pkg) => (
            <PackageCard key={pkg.title} pkg={pkg} />
          ))}
        </div>

        <p className="text-sm text-neutral-700">{section.note}</p>
      </div>
    </section>
  );
}
