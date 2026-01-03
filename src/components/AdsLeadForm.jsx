import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const budgetOptions = [
  { value: "", label: "Selecteer budget" },
  { value: "<5k", label: "Tot €5.000" },
  { value: "5-15k", label: "€5.000 - €15.000" },
  { value: ">15k", label: "Meer dan €15.000" },
];

export default function AdsLeadForm({ source }) {
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

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
    }
  };

  return (
    <div
      id="lead-form"
      className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10"
    >
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

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Naam</span>
          <input
            type="text"
            name="name"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
            placeholder="Jouw naam"
            required
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>E-mailadres</span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Project of vraag (optioneel)</span>
          <textarea
            name="message"
            rows="4"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
            placeholder="Vertel kort over je website of vraag"
          />
        </label>

        <label className="block space-y-2 text-sm font-semibold text-slate-900">
          <span>Indicatief budget</span>
          <select
            name="budget"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
            defaultValue=""
          >
            {budgetOptions.map((option) => (
              <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-slate-600">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
            <span className="text-xs font-bold">re</span>
          </div>
          <span>reCAPTCHA</span>
        </div>

        <button
          type="submit"
          className="button-primary w-full justify-center text-base font-semibold"
        >
          Plan gratis kennismaking
        </button>

        {status === "success" && (
          <p className="text-sm text-slate-800">Bedankt, we nemen contact met je op.</p>
        )}
      </form>
    </div>
  );
}
