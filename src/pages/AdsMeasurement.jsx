import React from "react";
import { Helmet } from "react-helmet-async";
import AdsLeadForm from "../components/AdsLeadForm";

export default function AdsMeasurement() {
  const pageTitle = "Meten zonder ruis voor snelle beslissingen";
  const pageDescription =
    "Kapotte of onduidelijke GA4-data? In één sessie bepalen we wat er misgaat, wat er moet worden gemeten en wie wat doet.";

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
              Meten zonder ruis voor snelle beslissingen
            </h1>
            <p className="text-lg text-slate-700">
              Kapotte of onduidelijke GA4-data? In één sessie bepalen we wat er misgaat, wat er moet worden gemeten en wie wat doet.
            </p>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 probleem</p>
              <p className="text-lg font-semibold text-slate-900">Je cijfers kloppen niet, dus beslissingen vertragen.</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 oplossing</p>
              <p className="text-lg font-semibold text-slate-900">
                We brengen de meetketen in kaart, repareren events en consent-koppeling en leveren een strak meetplan op.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">1 actie</p>
              <p className="text-lg font-semibold text-slate-900">Plan gratis kennismaking en ontvang binnen 48 uur een plan van aanpak.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Meetplan zonder ruis", "Consent en tags in sync", "Controlelijst met fixes", "Dashboard met kerncijfers"].map(
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

        <AdsLeadForm source="ads-measurement" />
      </section>
    </main>
  );
}
