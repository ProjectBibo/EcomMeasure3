import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function ConfirmationKennismaking() {
  return (
    <main className="min-h-screen bg-surface-light">
      <SEO title="Aanvraag ontvangen" description="Bevestiging van je kennismakingsaanvraag." />
      <section className="section-shell">
        <div className="site-container grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="pill-badge">Bevestiging</p>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Aanvraag ontvangen</h1>
            <p className="text-lg text-neutral-700">
              Bedankt voor je aanvraag. Ik neem binnen 1–3 werkdagen contact met je op.
            </p>
            <p className="text-neutral-600">
              In de tussentijd kun je alvast verder lezen of contact opnemen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="button-primary inline-flex items-center justify-center">
                Terug naar homepage
              </Link>
              <Link to="/cro" className="button-secondary inline-flex items-center justify-center">
                Lees meer over CRO
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-200/70 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="space-y-3 text-neutral-700">
              <p className="text-sm font-semibold text-neutral-900">Wat kun je verwachten?</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                  Een reactie binnen 1–3 werkdagen met beschikbare momenten.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                  Heldere volgende stap richting een kennismaking.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
