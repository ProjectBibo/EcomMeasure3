import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const checklistHighlights = [
    "Geheel vrijblijvende kennismaking",
    "Krijg gratis conversie tips",
    "Ontdek hoe we je kunnen helpen tijdens een gratis adviesgesprek",
  ];
  const submitLabel = language === "nl" ? "Plan vrijblijvend gesprek" : primaryCta;

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
      console.error("Form submission failed", error);
    }
  };

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden bg-[#e7f0fb] py-20 sm:py-24"
    >
      <div className="relative site-container space-y-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="space-y-3"
        >
          <span className="pill-badge bg-white/80 text-brand-blue shadow-sm">{t.badge}</span>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            {t.heading}
          </h2>
          <p className="max-w-3xl text-lg text-neutral-800">{t.intro}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="rounded-[28px] border border-[#d8e2f1] bg-white p-7 shadow-[0_22px_48px_rgba(15,23,42,0.12)] sm:p-8"
            action="https://formspree.io/f/mpqzpevp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Naam" : "Name"}</span>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-base text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                  required
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "E-mailadres" : "Email"}</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-base text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}</span>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-base text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-base text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500">
                  <span className="text-xs font-bold">re</span>
                </div>
                <span>reCAPTCHA</span>
              </div>
              <button
                type="submit"
                id="cta-primary"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e2b200] bg-[#ffcc02] px-6 py-4 text-base font-semibold text-neutral-900 shadow-[0_14px_28px_rgba(255,204,2,0.32)] transition hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c400]"
              >
                {submitLabel}
                <ArrowRight size={18} aria-hidden />
              </button>
              {status === "success" && (
                <p className="text-sm text-neutral-800">Bedankt, we nemen contact met je op.</p>
              )}
            </div>
          </motion.form>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.55, delay: 0.12 }}
            className="flex flex-col items-center gap-6 lg:pt-4"
          >
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#c9ddff] shadow-lg ring-8 ring-[#e7f0fb]">
              <img
                src="/Ik.svg"
                alt="Portret van de consultant"
                className="h-36 w-36 object-contain drop-shadow"
                loading="lazy"
              />
            </div>
            <div className="w-full max-w-md space-y-3">
              {checklistHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={18} aria-hidden />
                  </span>
                  <p className="text-base font-semibold text-neutral-900">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
