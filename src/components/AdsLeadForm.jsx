import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdsLeadForm({ source }) {
  const [status, setStatus] = useState("idle");
  const [pagePath, setPagePath] = useState("/ads");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPagePath(window.location.pathname || "/ads");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mpqzpevp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        navigate("/confirmation");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Form submission failed", error);
      setStatus("error");
    }
  };

  const isDisabled = status === "loading";

  return (
    <div id="lead-form" className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">Plan gratis kennismaking</p>
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Laten we kort schakelen</h2>
        <p className="text-base text-slate-700">
          Deel je gegevens, dan plannen we een 30-minuten call om je situatie te bespreken en de eerste acties te bepalen.
        </p>
      </div>
      <form
        className="space-y-4"
        action="https://formspree.io/f/mpqzpevp"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="page_path" value={pagePath} />

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Naam</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Jouw naam"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Zakelijk e-mailadres</span>
          <input
            type="email"
            name="email"
            required
            placeholder="naam@bedrijf.nl"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Website</span>
          <input
            type="url"
            name="url"
            required
            placeholder="https://"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Waar loop je nu op vast? (kort)</span>
          <textarea
            name="message"
            rows="3"
            placeholder="Bijvoorbeeld: data klopt niet in GA4, of checkout verliest conversie"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
          />
        </label>

        <button
          type="submit"
          disabled={isDisabled}
          className="button-primary w-full justify-center text-base font-semibold"
        >
          Plan gratis kennismaking
        </button>

        {status === "error" ? (
          <p className="text-sm font-medium text-rose-600">Versturen mislukt. Probeer het later opnieuw.</p>
        ) : null}
      </form>
    </div>
  );
}
