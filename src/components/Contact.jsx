import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const budgetOptions = [
  { value: "", label: { nl: "Selecteer budget", en: "Select budget" } },
  { value: "<5k", label: { nl: "Tot €5.000", en: "Up to €5,000" } },
  { value: "5-15k", label: { nl: "€5.000 - €15.000", en: "€5,000 - €15,000" } },
  { value: ">15k", label: { nl: "Meer dan €15.000", en: "Above €15,000" } },
];

const trustPoints = {
  nl: [
    "Vrijblijvende kennismaking",
    "Gratis advies / inzichten",
    "Helder vervolgstappen",
  ],
  en: ["Intro call without obligation", "Free advice and insights", "Clear next steps"],
};

const successContent = {
  nl: {
    heading: "Gelukt. Je bericht is verstuurd.",
    subheading: "Je hoort binnen 1-3 werkdagen van ons. In de tussentijd kun je je verdiepen in CRO met deze artikelen:",
    resources: [
      { label: "Wat is conversie-optimalisatie?", href: "/blog/wat-is-conversie-optimalisatie" },
      { label: "Bureau, freelancer of zelf doen?", href: "/blog/cro-bureau-freelancer-of-zelf-doen" },
      { label: "Conversie-optimalisatie KPI's", href: "/blog/conversie-optimalisatie-kpis" },
    ],
    fastTitle: "Wil je snel antwoord?",
    callLabel: "Bel direct",
    linkedinLabel: "Connect op LinkedIn",
    fastDescription:
      "Bel direct of stuur een connectieverzoek zodat we sneller kunnen schakelen over je vraag of traject.",
  },
  en: {
    heading: "Success. Your message has been sent.",
    subheading:
      "Expect a reply within 1-3 business days. Meanwhile, explore these CRO articles for practical guidance:",
    resources: [
      { label: "What is conversion rate optimisation?", href: "/blog/wat-is-conversie-optimalisatie" },
      { label: "Agency, freelancer or in-house?", href: "/blog/cro-bureau-freelancer-of-zelf-doen" },
      { label: "Conversion optimisation KPIs", href: "/blog/conversie-optimalisatie-kpis" },
    ],
    fastTitle: "Need a quick reply?",
    callLabel: "Call now",
    linkedinLabel: "Connect on LinkedIn",
    fastDescription:
      "Call directly or send a LinkedIn request so we can align on your question or engagement faster.",
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language].contact;
  const primaryCta = translations[language].header.cta;
  const checklist = t.options || [];
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mpqzpevp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      setStatus("idle");
    } catch (error) {
      console.error("Form submission failed", error);
      setStatus("idle");
    }
  };

  const successCopy = successContent[language];

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-blue/10 py-20 sm:py-24"
    >
      <div className="grain-overlay" aria-hidden />
      <div className="glow-orb glow-orb--primary left-0 top-0 h-64 w-64 opacity-40" aria-hidden />

      <div className="relative site-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="pill-badge shadow-sm">{t.badge}</span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{t.heading}</h2>
          <p className="text-lg text-neutral-700">{t.intro}</p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="grid gap-8 rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className="pill-badge inline-flex">{language === "nl" ? "Bedankt" : "Thank you"}</p>
                  <h3 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">{successCopy.heading}</h3>
                  <p className="text-lg text-neutral-700">{successCopy.subheading}</p>
                </div>
                <ul className="space-y-2 text-base text-brand-blue">
                  {successCopy.resources.map((resource) => (
                    <li key={resource.href}>
                      <a className="font-semibold underline decoration-brand-blue/40 underline-offset-4 transition hover:text-brand-blue/80" href={resource.href}>
                        {resource.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3 rounded-2xl bg-surface-soft p-4">
                  <p className="text-base font-semibold text-neutral-900">{successCopy.fastTitle}</p>
                  <p className="text-sm text-neutral-700">{successCopy.fastDescription}</p>
                  <div className="flex flex-wrap gap-3">
                    <a className="button-primary" href="tel:+31612345678">
                      {successCopy.callLabel}
                    </a>
                    <a
                      className="button-secondary"
                      href="https://www.linkedin.com/company/ecommeasure/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {successCopy.linkedinLabel}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <img
                  src="/Ik.svg"
                  alt={language === "nl" ? "Rens van EcomMeasure" : "Rens from EcomMeasure"}
                  className="h-56 w-auto"
                />
                <ul className="w-full space-y-3">
                  {trustPoints[language].map((point) => (
                    <li key={point} className="flex items-center gap-3 rounded-xl bg-surface-soft px-4 py-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                        ✓
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:col-span-2 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.form
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
              action="https://formspree.io/f/mpqzpevp"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-neutral-800">
                  <span>{language === "nl" ? "Naam" : "Name"}</span>
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
                    placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-neutral-800">
                  <span>{language === "nl" ? "E-mailadres" : "Email"}</span>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label className="mt-4 block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}</span>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>
              <label className="mt-4 block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-full rounded-xl border border-neutral-200/80 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                id="cta-primary"
                className="button-primary mt-6 w-full justify-center disabled:opacity-80"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (language === "nl" ? "Versturen..." : "Sending...") : primaryCta}
              </button>
            </motion.form>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.55, delay: 0.12 }}
              className="relative h-full rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <img
                    src="/Ik.svg"
                    alt={language === "nl" ? "Rens van EcomMeasure" : "Rens from EcomMeasure"}
                    className="h-52 w-auto"
                  />
                </div>
                <div className="space-y-3">
                  {trustPoints[language].map((point) => (
                    <div key={point} className="flex items-center gap-3 rounded-xl bg-surface-soft px-4 py-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                        ✓
                      </span>
                      <p className="text-sm font-semibold text-neutral-900">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm">
                  {checklist.slice(0, 3).map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-3 w-3 flex-shrink-0 rounded-full bg-brand-blue" aria-hidden />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
