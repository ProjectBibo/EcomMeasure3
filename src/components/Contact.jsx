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

    try {
      const response = await fetch("https://formspree.io/f/mpqzpevp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      }
    } catch (error) {
      console.error("Form submission failed", error);
    }
  };

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
  className="button-primary mt-6 w-full justify-center"
>
              {primaryCta}
            </button>
            {status === "success" && (
              <p className="mt-4 text-sm text-neutral-800">Bedankt, we nemen contact met je op.</p>
            )}
          </motion.form>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.55, delay: 0.12 }}
            className="relative h-full rounded-3xl border border-neutral-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="space-y-4">
              {checklist.slice(0, 4).map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 flex-shrink-0 rounded-full bg-brand-blue" aria-hidden />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-white shadow-lg ring-8 ring-white/70">
              <span className="text-xl font-bold">R</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
