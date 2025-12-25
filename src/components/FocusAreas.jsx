import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedHeading, AnimatedParagraph } from "./ExpressiveText";
import { useLanguage } from "../context/LanguageContext";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

const content = {
  nl: {
    badge: "Expertises",
    title: "Kies de verdieping die jouw groei versnelt",
    description:
      "Elk traject start met een heldere focus. Verken de pijlers van measurement, consent en CRO en ontdek welke stap jouw e-commerce versnelt.",
    cards: [
      {
        title: "Measurement",
        subtitle: "GA4 & GTM events",
        description:
          "Een schaalbare datastructuur met enhanced e-commerce events, server-side tagging en dashboards die dagelijks vertrouwen geven.",
        to: "/measurement",
      },
      {
        title: "Consent Mode v2",
        subtitle: "AVG/GDPR proof",
        description:
          "Consent Mode v2, CMP-integraties en duidelijke documentatie zodat marketing- en legalteams met zekerheid kunnen sturen.",
        to: "/consent-mode",
      },
      {
        title: "CRO",
        subtitle: "A/B-tests & hypotheses",
        description:
          "Onderzoek, experimenteer en leer sneller met een strak proces voor hypotheses, validatie en implementatie.",
        to: "/cro",
      },
    ],
  },
  en: {
    badge: "Expertise",
    title: "Pick the focus area that accelerates growth",
    description:
      "Every engagement starts with clarity. Explore the pillars of measurement, consent and CRO to see which track unlocks your next stage.",
    cards: [
      {
        title: "Measurement",
        subtitle: "GA4 & GTM events",
        description:
          "A scalable data foundation with enhanced e-commerce events, server-side tagging and dashboards that inspire daily confidence.",
        to: "/measurement",
      },
      {
        title: "Consent Mode v2",
        subtitle: "GDPR compliant",
        description:
          "Consent Mode v2, CMP integrations and transparent documentation so marketing and legal teams can operate with certainty.",
        to: "/consent-mode",
      },
      {
        title: "CRO",
        subtitle: "A/B tests & hypotheses",
        description:
          "Research, experiment and learn faster with a focused workflow for hypotheses, validation and implementation.",
        to: "/cro",
      },
    ],
  },
};

export default function FocusAreas() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const copy = content[language];
  const navigateWithTransition = useViewTransitionNavigate();

  return (
    <section className="relative overflow-hidden bg-surface-soft/70 dark:bg-surface-dark section-block">
      <div className="absolute inset-0 pointer-events-none">
        <div className="story-stripe" aria-hidden />
      </div>
      <div className="relative content-shell">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
          className="eyebrow shadow-sm backdrop-blur bg-white/90 dark:bg-white/10"
        >
          {copy.badge}
        </motion.span>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-3xl space-y-4"
        >
          <AnimatedHeading className="vt-heading text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {copy.title}
          </AnimatedHeading>
          <AnimatedParagraph
            text={copy.description}
            language={language}
            highlight
            className="text-base text-neutral-600 dark:text-gray-400"
            delay={0.16}
          />
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={shouldReduceMotion ? undefined : { delay: 0.12 * index, duration: 0.55 }}
              className="card-surface group relative flex h-full flex-col overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-blue/80 dark:text-brand-teal/80">
                    {card.subtitle}
                  </p>
                  <h3 className="typography-subheading mt-2 text-2xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-brand-blue dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-gray-300">{card.description}</p>
              </div>
              <div className="mt-8 flex flex-1 items-end">
                <Link
                  to={card.to}
                  className="btn-secondary text-sm"
                  onClick={createViewTransitionClickHandler(navigateWithTransition, card.to)}
                >
                  {language === "nl" ? "Bekijk de pagina" : "View details"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
