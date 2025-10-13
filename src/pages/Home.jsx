import React, { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import FocusAreas from "../components/FocusAreas";
import SectionFallback from "../components/SectionFallback";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const Hero = lazy(() => import("../components/Hero"));
const USP = lazy(() => import("../components/USP"));
const Contact = lazy(() => import("../components/Contact"));

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <SEO title={t.seo.title} description={t.seo.description} />
      <motion.main
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.45, ease: "easeOut" }}
        className="relative flex min-h-screen flex-col overflow-x-hidden"
        role="main"
      >
        <Suspense fallback={<SectionFallback label="Hero" />}>
          <Hero />
        </Suspense>
        <FocusAreas />
        <Suspense fallback={<SectionFallback label="USP" />}>
          <USP />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Contact" />}>
          <Contact />
        </Suspense>
      </motion.main>
    </>
  );
}
