import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
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
      className="relative overflow-hidden bg-[#E6F0FF] py-20 sm:py-24"
    >
      <div className="relative site-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="space-y-3 text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">{t.badge}</p>
          <h2 className="text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">{t.heading}</h2>
          <p className="text-base text-neutral-800 sm:text-lg">{t.intro}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:col-span-2">
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            action="https://formspree.io/f/mpqzpevp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Naam" : "Name"}</span>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                  required
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "E-mailadres" : "Email"}</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}</span>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-neutral-900">
                <span>{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-6 text-sm text-neutral-600">
                reCAPTCHA
              </div>
            </div>
            <button
              type="submit"
              id="cta-primary"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFD447] px-6 py-3.5 text-base font-semibold text-neutral-900 shadow-md transition hover:shadow-lg"
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
            className="flex flex-col items-center gap-6 rounded-3xl bg-[#DCE9FF] p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#1E3A8A] p-4 shadow-lg">
              <img
                src="/Ik.svg"
                alt="Portret van [naam], oprichter van EcomMeasure"
                className="h-full w-full rounded-full object-contain"
                loading="lazy"
              />
            </div>
            <ul className="w-full space-y-3 text-left text-base text-neutral-900">
              {["Geheel vrijblijvende kennismaking", "Krijg gratis conversie tips", "Ontdek waar ik je mee kan helpen"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <CheckCircle className="mt-0.5 text-green-600" size={20} aria-hidden />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
