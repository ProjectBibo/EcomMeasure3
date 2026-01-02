import React, { useEffect, useRef, useState } from "react";
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
  const [captchaToken, setCaptchaToken] = useState("");
  const navigate = useNavigate();
  const recaptchaContainerRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const checklistHighlights = [
    "Geheel vrijblijvende kennismaking",
    "Krijg gratis conversie tips",
    "Ontdek waar ik je mee kan helpen",
  ];
  const submitLabel = language === "nl" ? "Plan vrijblijvend gesprek" : primaryCta;
  const headlineText =
    language === "nl"
      ? "Ontdek hoe ik je kan helpen tijdens een gratis adviesgesprek"
      : t.heading;
  const recaptchaSiteKey =
    import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  useEffect(() => {
    if (window.grecaptcha) {
      setRecaptchaReady(true);
      return undefined;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js?render=explicit"]',
    );

    const onLoad = () => setRecaptchaReady(true);

    if (existingScript) {
      existingScript.addEventListener("load", onLoad);
      return () => existingScript.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = onLoad;
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (
      recaptchaReady &&
      recaptchaContainerRef.current &&
      window.grecaptcha &&
      recaptchaWidgetId.current === null
    ) {
      recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainerRef.current, {
        sitekey: recaptchaSiteKey,
        callback: (token) => {
          setCaptchaToken(token || "");
          setStatus("idle");
        },
        "expired-callback": () => {
          setCaptchaToken("");
        },
        "error-callback": () => {
          setStatus("captcha-error");
          setCaptchaToken("");
        },
      });
    }
  }, [recaptchaReady, recaptchaSiteKey]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!captchaToken) {
      setStatus("captcha-error");
      return;
    }

    formData.append("g-recaptcha-response", captchaToken);

    try {
      const response = await fetch("https://formspree.io/f/mpqzpevp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        setCaptchaToken("");
        if (window.grecaptcha && recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        }
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
      <div className="relative site-container space-y-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold leading-snug tracking-tight text-neutral-900 sm:text-4xl">
            {headlineText}
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-14 lg:gap-16">
          <motion.form
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.1 }}
            className="flex w-full max-w-[560px] flex-col items-center gap-8"
            action="https://formspree.io/f/mpqzpevp"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col items-center gap-7">
              <label className="block text-sm font-semibold text-neutral-900">
                <span className="sr-only">{language === "nl" ? "Naam" : "Name"}</span>
                <input
                  type="text"
                  name="name"
                  className="w-[480px] max-w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder={language === "nl" ? "Jouw naam" : "Your name"}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-neutral-900">
                <span className="sr-only">{language === "nl" ? "E-mailadres" : "Email"}</span>
                <input
                  type="email"
                  name="email"
                  className="w-[480px] max-w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-neutral-900">
                <span className="sr-only">
                  {language === "nl" ? "Project of vraag (optioneel)" : "Project or question (optional)"}
                </span>
                <textarea
                  name="message"
                  rows="3"
                  className="w-[480px] max-w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  placeholder={language === "nl" ? "Vertel kort over je website of vraag" : "Share a bit about your site or question"}
                />
              </label>
              <label className="block text-sm font-semibold text-neutral-900">
                <span className="sr-only">{language === "nl" ? "Indicatief budget" : "Estimated budget"}</span>
                <select
                  name="budget"
                  className="w-[480px] max-w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-800 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25"
                  defaultValue=""
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value} disabled={option.value === ""}>
                      {option.label[language]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-3 pt-2">
                <div ref={recaptchaContainerRef} className="g-recaptcha" aria-label="reCAPTCHA" />
                {status === "captcha-error" && (
                  <p className="text-sm text-red-600">
                    {language === "nl"
                      ? "Bevestig de reCAPTCHA voordat je verzendt."
                      : "Please complete the reCAPTCHA before submitting."}
                  </p>
                )}
              </div>
              <div className="pt-6" />
              <button
                type="submit"
                id="cta-primary"
                className="inline-flex min-w-[320px] max-w-[480px] items-center justify-center gap-2 rounded-xl border border-[#e2b200] bg-[#ffcc02] px-7 py-4 text-lg font-semibold text-neutral-900 transition hover:bg-[#e6b700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c400]"
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
            className="flex w-full max-w-[480px] flex-col items-start gap-6"
          >
            {checklistHighlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 text-emerald-600">
                  <CheckCircle2 size={20} aria-hidden />
                </span>
                <p className="text-base font-semibold text-neutral-900">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
