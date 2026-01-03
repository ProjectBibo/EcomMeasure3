import React from "react";
import { Helmet } from "react-helmet-async";
import AdsLeadForm from "../components/AdsLeadForm";

export default function AdsCro() {
  const pageTitle = "Conversie-optimalisatie zonder omwegen";
  const pageDescription =
    "Laag conversiepercentage? We leggen in één sessie de knelpunten bloot, prioriteren experimenten en starten de eerste test.";

  return (
    <main className="min-h-screen bg-surface-light text-slate-900">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="site-container grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="pill-badge bg-brand-blue/10 text-brand-blue">Google Ads landing</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Conversie-optimalisatie zonder omwegen
            </h1>
            <p className="text-lg text-slate-700">
              Laag conversiepercentage? We leggen in één sessie de knelpunten bloot, prioriteren experimenten en starten de eerste test.
            </p>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 probleem</p>
              <p className="text-lg font-semibold text-slate-900">Geld gaat verloren in funnelstappen die niemand eigent.</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 oplossing</p>
              <p className="text-lg font-semibold text-slate-900">
                We analyseren gedrag, formuleren een scherpe hypothese en starten een test of verbetering die omzet laat zien.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 actie</p>
              <p className="text-lg font-semibold text-slate-900">Plan gratis kennismaking en ontvang een concreet testplan binnen 48 uur.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Analyse van gedrag en data", "Hypothese met verwachte uplift", "Snelle test of implementatie", "Heldere opvolging en rapport"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                >
                  {item}
                </div>
              )
            )}
          </div>

          <a className="button-primary inline-flex w-full justify-center text-base font-semibold sm:w-auto" href="#lead-form">
            Plan gratis kennismaking
          </a>
        </div>

        <AdsLeadForm source="ads-cro" />
      </section>
    </main>
  );
}
