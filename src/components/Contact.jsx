import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const formCopy = {
  nl: {
    name: "Naam",
    email: "E-mailadres",
    message: "Waarmee kan ik helpen? (optioneel)",
    budget: "Budgetindicatie",
    budgetPlaceholder: "Selecteer een budget",
    budgets: ["< €2.500", "€2.500 - €7.500", "> €7.500"],
    submit: "Plan vrijblijvend gesprek",
  },
  en: {
    name: "Name",
    email: "Email address",
    message: "How can I help? (optional)",
    budget: "Budget range",
    budgetPlaceholder: "Choose a budget",
    budgets: ["< €2,500", "€2,500 - €7,500", "> €7,500"],
    submit: "Plan an intro call",
  },
};

const primaryButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const copy = formCopy[language];

  const bulletPoints = [
    t.options[0].title,
    t.options[1].title,
    t.options[2].title,
    t.fast.title,
  ];

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden bg-surface-soft py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/8 via-white to-brand-yellow/5" aria-hidden />
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-yellow/30 blur-3xl" aria-hidden />
      <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue shadow-sm">
            {t.badge}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {t.heading}
          </h2>
          <p className="text-base text-neutral-600 sm:text-lg">{t.intro}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-white/95 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] ring-1 ring-neutral-200/70 backdrop-blur">
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-800" htmlFor="name">
                  {copy.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-800" htmlFor="email">
                  {copy.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-800" htmlFor="budget">
                  {copy.budget}
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="w-full appearance-none rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  <option value="" disabled>
                    {copy.budgetPlaceholder}
                  </option>
                  {copy.budgets.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-800" htmlFor="message">
                  {copy.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                />
              </div>

              <button type="submit" className={primaryButtonClass}>
                {copy.submit}
              </button>
            </form>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] ring-1 ring-neutral-200/70 backdrop-blur">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-blue">
                {t.badge}
              </p>
              <p className="text-xl font-semibold text-neutral-900">{t.fast.description}</p>
              <ul className="mt-4 space-y-3 text-neutral-700">
                {bulletPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-blue" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-gradient-to-br from-brand-blue to-brand-yellow opacity-80" aria-hidden />
            <div className="absolute bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-lg font-semibold text-neutral-900 shadow-lg ring-2 ring-white/80">
              EM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
