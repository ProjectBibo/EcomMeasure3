import React, { useMemo, useState } from "react";

export default function VideoAnalysisSection({ copy }) {
  const [formValues, setFormValues] = useState({ website: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const placeholders = useMemo(
    () => ({
      website: "https://",
      email: copy.emailPlaceholder || "jij@bedrijf.nl",
      message: copy.messagePlaceholder || copy.optional,
    }),
    [copy.emailPlaceholder, copy.messagePlaceholder, copy.optional],
  );

  const validate = () => {
    const nextErrors = {};
    if (!formValues.website.trim()) {
      nextErrors.website = copy.errors.urlRequired;
    }
    if (!formValues.email.trim()) {
      nextErrors.email = copy.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      nextErrors.email = copy.errors.emailInvalid;
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    fetch(event.currentTarget.action, {
      method: event.currentTarget.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setStatus("success");
          setFormValues({ website: "", email: "", message: "" });
        } else {
          return response.json().then(() => Promise.reject());
        }
      })
      .catch(() => {
        setStatus("idle");
      });
  };

  const onChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="section-shell border-t border-neutral-200 bg-white">
      <div className="site-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{copy.eyebrow}</p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{copy.title}</h2>
          <p className="text-neutral-700">{copy.description}</p>
          <div className="rounded-[6px] border border-dashed border-neutral-300 bg-neutral-50/70 p-6 text-sm text-neutral-600">
            {copy.previewNote}
          </div>
        </div>

        <div className="space-y-4 rounded-[6px] border border-neutral-200 bg-neutral-50/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xjgvydnj"
            method="POST"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-semibold text-neutral-900">
                {copy.fields.url.label}
              </label>
              <input
                id="website"
                name="website"
                type="url"
                required
                placeholder={placeholders.website}
                value={formValues.website}
                onChange={onChange("website")}
                className="w-full rounded-[4px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              />
              {errors.website && <p className="text-sm text-red-600">{errors.website}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-neutral-900">
                {copy.fields.email.label}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={placeholders.email}
                value={formValues.email}
                onChange={onChange("email")}
                className="w-full rounded-[4px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-neutral-900">
                {copy.fields.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={placeholders.message}
                value={formValues.message}
                onChange={onChange("message")}
                className="w-full rounded-[4px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              />
              <p className="text-xs text-neutral-500">{copy.optional}</p>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="inline-flex w-full justify-center rounded-[4px] border border-neutral-900/10 bg-[#ffcc02] px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e6b700] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900/40"
            >
              {status === "loading" ? copy.loading : copy.cta}
            </button>

            {status === "success" && (
              <div className="rounded-[4px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                Aanvraag ontvangen. Je krijgt een video-analyse.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
