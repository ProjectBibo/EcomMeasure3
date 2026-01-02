import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
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
  const primaryCta = translations[language].header.cta;
  const checklist = t.options || [];
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
      className="relative overflow-hidden bg-[#e8f1ff] py-20 sm:py-24"
    >
      <div className="relative site-container space-y-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="space-y-4 text-left"
        >
          <span className="pill-badge shadow-sm">{t.badge}</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">{t.heading}</h2>
          <p className="text-lg text-neutral-800">{t.intro}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.14)]"
            action="https://formspree.io/f/mpqzpevp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-3 text-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-neutral-900">
                <Mail size={22} aria-hidden />
              </div>
              <p className="text-xl font-semibold">Plan een kennismaking</p>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "Naam" : "Name"}</span>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/15"
                  placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                  required
                />
              </label>

              <label className="block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "E-mailadres" : "Email"}</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/15"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}</span>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/15"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>

              <label className="block space-y-2 text-sm font-semibold text-neutral-800">
                <span>{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/15"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-neutral-300 bg-neutral-100/80 px-4 py-3 text-sm font-semibold text-neutral-700">
                <div className="h-10 w-10 rounded bg-neutral-300" aria-hidden />
                <span>reCAPTCHA</span>
              </div>

              <button
                type="submit"
                id="cta-primary"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-yellow px-6 py-3 text-base font-semibold text-neutral-900 shadow-[0_12px_34px_rgba(0,0,0,0.12)] transition hover:bg-brand-yellow-dark"
              >
                {primaryCta}
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
            {status === "success" && (
              <p className="mt-4 text-sm text-neutral-800">Bedankt, we nemen contact met je op.</p>
            )}
          </motion.form>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.55, delay: 0.12 }}
            className="flex flex-col items-center gap-6 rounded-3xl bg-white/70 p-8 text-left shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur lg:items-start"
          >
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#c8dcff] shadow-inner">
              <img
                src="/Ik.svg"
                alt="Portret van [naam], oprichter van EcomMeasure"
                className="h-40 w-40 rounded-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="w-full space-y-4">
              {checklist.slice(0, 3).map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
                  <CheckCircle2 size={20} className="mt-1 text-green-600" aria-hidden />
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
