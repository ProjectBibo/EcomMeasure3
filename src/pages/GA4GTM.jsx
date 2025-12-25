import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const copyByLocale = {
  nl: {
    seo: {
      title: "GA4 & GTM – Volledige meetinrichting voor e-commerce",
      description:
        "Van datalayer tot event tracking: ontdek hoe een schaalbare GA4 en GTM setup ervoor zorgt dat elk besluit op data is gebaseerd.",
    },
    hero: {
      eyebrow: "GA4 & GTM",
      title: "Een datastack die elke klantactie vastlegt",
      description:
        "We ontwerpen een datalayer die aansluit op je funnel, richten events in binnen Google Tag Manager en zorgen voor governance zodat teams zelfstandig blijven doorontwikkelen.",
    },
    sections: [
      {
        title: "Datalayer architectuur",
        bullets: [
          "Blueprint voor alle e-commerce events: product, checkout, loyaliteit en customer service.",
          "Naming conventions en documentatie zodat developers precies weten wat ze bouwen.",
          "Debuggen van datalayer pushes met automatische QA-scripts en versiebeheer.",
        ],
      },
      {
        title: "Tag management workflows",
        bullets: [
          "Containerstructuur met duidelijke scheiding tussen productie, test en server-side omgevingen.",
          "Triggers, variabelen en templates afgestemd op GA4, advertentieplatformen en interne tools.",
          "Releaseproces inclusief preview- en publish-checklists zodat niets ongezien live gaat.",
        ],
      },
      {
        title: "Beheer & overdracht",
        bullets: [
          "Governance model met rollen, rechten en changelog voor stakeholders.",
          "Training voor marketing- en developmentteams zodat iedereen begrijpt hoe de setup werkt.",
          "Maandelijkse health checks en alerts die afwijkingen in eventdata direct signaleren.",
        ],
      },
    ],
  },
  en: {
    seo: {
      title: "GA4 & GTM – A complete measurement foundation",
      description:
        "From datalayer to event tracking: see how a scalable GA4 and GTM setup turns every decision into a data-driven one.",
    },
    hero: {
      eyebrow: "GA4 & GTM",
      title: "A data stack that captures every customer action",
      description:
        "We design a datalayer that mirrors your funnel, configure events in Google Tag Manager and create governance so teams keep iterating with confidence.",
    },
    sections: [
      {
        title: "Datalayer architecture",
        bullets: [
          "Blueprint for every commerce event: product, checkout, loyalty and customer service.",
          "Naming conventions and documentation so developers know exactly what to ship.",
          "Debugging datalayer pushes with automated QA scripts and version control.",
        ],
      },
      {
        title: "Tag management workflows",
        bullets: [
          "Container structure separating production, testing and server-side environments.",
          "Triggers, variables and templates tailored to GA4, ad platforms and internal tools.",
          "Release process with preview and publish checklists so nothing slips through.",
        ],
      },
      {
        title: "Operations & enablement",
        bullets: [
          "Governance model with roles, permissions and a changelog for stakeholders.",
          "Training sessions for marketing and development teams to understand the setup.",
          "Monthly health checks and alerts that surface anomalies in event data immediately.",
        ],
      },
    ],
  },
};

export default function GA4GTM() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = copyByLocale[language];

  return (
    <>
      <SEO title={copy.seo.title} description={copy.seo.description} />
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-surface-soft to-brand-teal/10 pb-24 pt-28   ">
        <div className="grain-overlay" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue shadow-sm backdrop-blur   "
          >
            {copy.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.7 }}
            className="mt-7 text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { delay: 0.18, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg text-neutral-700 "
          >
            {copy.hero.description}
          </motion.p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {copy.sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={shouldReduceMotion ? undefined : { once: true }}
                transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.55 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[20px_30px_80px_rgba(15,23,42,0.18)] backdrop-blur   "
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 4px 4px 12px rgba(255,255,255,0.5), inset -14px -18px 34px rgba(148,163,184,0.18)",
                  }}
                />
                <h2 className="text-2xl font-semibold text-neutral-900 ">{section.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-600 ">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
