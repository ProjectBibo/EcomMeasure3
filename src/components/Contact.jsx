import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const checklist = t.options || [];
  const checklistHighlights = [
    "Geheel vrijblijvende kennismaking",
    "Krijg gratis conversie tips",
    "Ontdek waar ik je mee kan helpen",
  ];
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
      console.error("Form submission failed", error);
    }
  };

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden bg-[#e9f2ff] py-20 sm:py-24"
    >
      <div className="relative site-container">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl space-y-4"
        >
          <span className="pill-badge shadow-sm">{t.badge}</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">{t.heading}</h2>
          <p className="text-lg text-neutral-800">{t.intro}</p>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_18px_40px_rgba(12,18,38,0.12)]"
            action="https://formspree.io/f/mpqzpevp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-neutral-900">
                  <span>{language === "nl" ? "Naam" : "Name"}</span>
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                    placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-neutral-900">
                  <span>{language === "nl" ? "E-mailadres" : "Email"}</span>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}</span>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded border border-neutral-400 bg-white" aria-hidden />
                  <span>Ik ben geen robot</span>
                </div>
                <span className="text-xs font-medium text-neutral-500">reCAPTCHA</span>
              </div>
            </div>
            <button
              type="submit"
              id="cta-primary"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-6 py-4 text-base font-semibold uppercase tracking-wide text-neutral-900 shadow-lg transition hover:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
            >
              Plan vrijblijvend gesprek
              <ArrowRight size={18} aria-hidden />
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
            className="flex h-full flex-col gap-6 rounded-2xl bg-transparent"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-blue shadow-lg ring-8 ring-[#dbe8ff]">
                <img
                  src="/Ik.svg"
                  alt="Portret van [naam], oprichter van EcomMeasure"
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="space-y-3 text-base font-semibold text-neutral-900">
                {checklistHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-600" aria-hidden />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-md">
              <div className="space-y-4">
                {checklist.slice(0, 3).map((item) => (
                  <div key={item.title} className="space-y-1">
                    <p className="text-base font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
