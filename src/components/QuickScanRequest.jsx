import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const FREEMAIL_DOMAINS = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];

const encode = (data) => new URLSearchParams(data).toString();

const validateUrl = (value) => {
  if (!value) {
    return false;
  }

  try {
    new URL(value.trim());
    return true;
  } catch (error) {
    return false;
  }
};

const validateEmail = (value, copy) => {
  if (!value) {
    return copy.emailError;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return copy.emailError;
  }

  const domain = value.split("@")[1]?.toLowerCase();
  if (domain && FREEMAIL_DOMAINS.includes(domain)) {
    return copy.emailFreemailError;
  }

  return "";
};

export default function QuickScanRequest() {
  const { language } = useLanguage();
  const copy = translations[language].aiDemo;

  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailField, setShowEmailField] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({ url: "", email: "", submit: "" });
  const [pagePath, setPagePath] = useState("/");

  const emailRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPagePath(window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (showEmailField) {
      emailRef.current?.focus();
    }
  }, [showEmailField]);

  const handleRevealEmail = (event) => {
    event.preventDefault();
    const isValid = validateUrl(url);

    setErrors((prev) => ({ ...prev, url: isValid ? "" : copy.urlError }));

    if (isValid) {
      setShowEmailField(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasValidUrl = validateUrl(url);
    const emailError = validateEmail(email.trim(), copy);

    setErrors({
      url: hasValidUrl ? "" : copy.urlError,
      email: emailError,
      submit: "",
    });

    if (!hasValidUrl) {
      setShowEmailField(false);
      return;
    }

    setShowEmailField(true);

    if (emailError) {
      return;
    }

    setStatus("loading");

    const formData = {
      "form-name": "quickscan",
      url: url.trim(),
      email: email.trim(),
      source: "quickscan",
      page_path: pagePath,
    };

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors((prev) => ({ ...prev, submit: copy.submitError }));
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <section className="relative w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-xl backdrop-blur md:p-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal/70 via-brand-blue to-brand-yellow"
          aria-hidden="true"
        />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{copy.title}</h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600">{copy.description}</p>
          </div>
        </div>

        <form
          name="quickscan"
          data-netlify="true"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="quickscan" />
          <input type="hidden" name="source" value="quickscan" />
          <input type="hidden" name="page_path" value={pagePath} />

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label htmlFor="quickscan-url" className="text-sm font-medium text-slate-800">
                {copy.urlLabel}
              </label>
              <input
                id="quickscan-url"
                name="url"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder={copy.urlPlaceholder}
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                disabled={isSuccess}
                className="mt-2 w-full rounded-xl border border-slate-300/60 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60 disabled:cursor-not-allowed disabled:bg-slate-100"
                aria-invalid={Boolean(errors.url)}
              />
              <p className="mt-2 text-sm text-slate-500">{copy.urlHelper}</p>
              {errors.url && <p className="mt-2 text-sm font-medium text-red-600">{errors.url}</p>}
            </div>
            <div className="md:w-auto md:self-end">
              <button
                type="button"
                onClick={handleRevealEmail}
                disabled={isSuccess}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-base font-semibold text-neutral-900 shadow-lg shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-80"
              >
                {copy.primaryCta}
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              showEmailField ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {showEmailField && (
              <div className="rounded-2xl border border-slate-200/70 bg-white/95 p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <div className="flex-1">
                    <label htmlFor="quickscan-email" className="text-sm font-medium text-slate-800">
                      {copy.emailLabel}
                    </label>
                    <input
                      ref={emailRef}
                      id="quickscan-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={copy.emailPlaceholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={isSuccess}
                      className="mt-2 w-full rounded-xl border border-slate-300/60 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/60 disabled:cursor-not-allowed disabled:bg-slate-100"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email}</p>}
                  </div>
                  <div className="md:w-auto md:self-end">
                    <button
                      type="submit"
                      disabled={isLoading || isSuccess}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow px-5 py-3 text-base font-semibold text-neutral-900 shadow-lg shadow-[0_18px_40px_rgba(255,204,2,0.35)] transition hover:translate-y-0.5 hover:bg-brand-yellow-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {isLoading ? copy.submitButtonLoading : copy.submitButton}
                    </button>
                  </div>
                </div>
                {errors.submit && <p className="mt-3 text-sm font-medium text-red-600">{errors.submit}</p>}
              </div>
            )}
          </div>
        </form>

        <div className="mt-6" role="status" aria-live="polite">
          {isSuccess && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-slate-800">
              <p className="text-sm font-semibold text-emerald-800">{copy.successTitle}</p>
              <p className="mt-1 text-sm text-emerald-900">{copy.successBody}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
