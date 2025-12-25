import React, { useState } from "react";

const baseButtonClasses =
  "inline-flex items-center justify-center px-4 py-2.5 font-semibold tracking-tight transition-colors duration-150";

const PrimaryButton = ({ href, children }) => (
  <a
    href={href}
    className={`${baseButtonClasses} rounded-[6px] border border-amber-500 bg-amber-400 text-neutral-900 hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500`}
  >
    {children}
  </a>
);

const SecondaryButton = ({ href, children }) => (
  <a
    href={href}
    className={`${baseButtonClasses} rounded-[6px] border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500`}
  >
    {children}
  </a>
);

export const HeroSplit = ({ title, intro, primaryCta, secondaryCta, imageAlt }) => (
  <section className="border-b border-neutral-200 bg-white">
    <div className="site-container grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">Analytics & CRO studio</p>
          <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl">{title}</h1>
          <div className="space-y-2 text-lg leading-relaxed text-neutral-700">
            {intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href={primaryCta.href}>{primaryCta.label}</PrimaryButton>
          <SecondaryButton href={secondaryCta.href}>{secondaryCta.label}</SecondaryButton>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 bg-neutral-50" aria-hidden />
        <span className="sr-only">{imageAlt}</span>
      </div>
    </div>
  </section>
);

export const TrustStrip = ({ bullets }) => (
  <section className="border-b border-neutral-200 bg-white">
    <div className="site-container flex flex-wrap items-center gap-4 py-6 text-sm text-neutral-700 md:gap-8">
      {bullets.map((item, index) => (
        <div key={item} className="flex items-center gap-3">
          <span className="h-[1px] w-6 bg-neutral-300" aria-hidden />
          <span>{item}</span>
          {index < bullets.length - 1 && <span className="hidden h-[1px] w-6 bg-neutral-200 sm:block" aria-hidden />} 
        </div>
      ))}
    </div>
  </section>
);

export const AlternatingSections = ({ sections }) => (
  <section className="border-b border-neutral-200 bg-white">
    <div className="site-container space-y-14 py-14">
      {sections.map((section, index) => {
        const isReversed = index % 2 === 1;
        return (
          <div
            key={section.title}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}
          >
            <div className={`space-y-4 ${isReversed ? "lg:col-start-2" : ""}`}>
              <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Zo helpen we</p>
              <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">{section.title}</h2>
              <p className="text-lg leading-relaxed text-neutral-700">{section.description}</p>
              <ul className="space-y-2 text-neutral-800">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-3 w-3 rounded-[3px] border border-neutral-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-700"
              >
                Plan kennismaking
              </a>
            </div>
            <div className={`${isReversed ? "lg:col-start-1" : ""}`}>
              <div className="aspect-[4/3] w-full rounded-[6px] border border-neutral-200 bg-neutral-50" aria-hidden />
              <span className="sr-only">{section.imageAlt}</span>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const ServiceRow = ({ title, description, deliverables, outcomes }) => (
  <div className="grid gap-6 border-b border-neutral-200 pb-8 pt-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="text-neutral-700">{description}</p>
    </div>
    <div className="grid gap-4 rounded-[6px] border border-neutral-200 bg-neutral-50/60 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Wat je ontvangt</p>
        <ul className="mt-2 space-y-2 text-neutral-800">
          {deliverables.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-sm bg-neutral-900" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Resultaat</p>
        <ul className="mt-2 space-y-2 text-neutral-800">
          {outcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-sm bg-neutral-900" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const ServicesList = ({ title, intro, services, ctaLabel }) => (
  <section className="border-b border-neutral-200 bg-white">
    <div className="site-container py-14">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Diensten</p>
        <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h2>
        <p className="text-lg text-neutral-700">{intro}</p>
      </div>
      <div className="mt-10 divide-y divide-neutral-200 border border-neutral-200">
        {services.map((service) => (
          <ServiceRow key={service.title} {...service} />
        ))}
      </div>
      <div className="mt-8">
        <PrimaryButton href="#contact">{ctaLabel}</PrimaryButton>
      </div>
    </div>
  </section>
);

const validateEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

export const VideoAnalysisSection = ({ title, description, labels }) => {
  const [form, setForm] = useState({ website: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.website.trim()) nextErrors.website = labels.required;
    if (!form.email.trim() || !validateEmail(form.email)) nextErrors.email = labels.validEmail;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  const isLoading = status === "loading";

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="site-container grid gap-10 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Video-analyse</p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h2>
          <p className="text-lg text-neutral-700">{description}</p>
          {status === "success" && (
            <div className="rounded-[6px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              {labels.success}
            </div>
          )}
        </div>
        <div className="space-y-4 rounded-[6px] border border-neutral-200 bg-neutral-50/70 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-neutral-900" htmlFor="website">
                {labels.website}
              </label>
              <input
                id="website"
                type="url"
                required
                value={form.website}
                onChange={onChange("website")}
                className="w-full rounded-[6px] border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                placeholder="https://"
              />
              {errors.website && <p className="text-xs text-red-600">{errors.website}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-neutral-900" htmlFor="email">
                {labels.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={onChange("email")}
                className="w-full rounded-[6px] border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                placeholder="naam@bedrijf.nl"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-neutral-900" htmlFor="message">
                {labels.message}
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={onChange("message")}
                className="min-h-[110px] w-full rounded-[6px] border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none"
                placeholder={labels.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[6px] border border-amber-500 bg-amber-400 px-4 py-2.5 text-center font-semibold text-neutral-900 transition-colors hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              disabled={isLoading}
            >
              {isLoading ? labels.loading : labels.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = ({ title, description, cta }) => (
  <section className="bg-white">
    <div className="site-container items-center justify-between gap-6 border-t border-neutral-200 py-14 lg:flex">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">Volgende stap</p>
        <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h2>
        <p className="text-lg text-neutral-700">{description}</p>
      </div>
      <PrimaryButton href={cta.href}>{cta.label}</PrimaryButton>
    </div>
  </section>
);
