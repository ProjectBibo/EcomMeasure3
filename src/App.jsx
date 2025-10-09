// src/App.jsx
import React, { useLayoutEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import ThemeDock from "./components/ThemeDock";

const LEGACY_SELECTORS = [
  ".scrolly-portal",
  ".portal-layer",
  ".scene",
  ".progress-rail",
  ".progress-bar",
];

const removeLegacyPortal = () => {
  if (typeof document === "undefined") return;

  LEGACY_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      const parent = node.parentElement;
      if (parent?.contains(node)) {
        parent.removeChild(node);
      } else {
        node.remove();
      }
    });
  });
};

export default function App() {
  useLayoutEffect(() => {
    removeLegacyPortal();

    if (typeof MutationObserver !== "undefined" && typeof document !== "undefined" && document.body) {
      const observer = new MutationObserver(() => removeLegacyPortal());
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    return undefined;
  }, []);

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
        <Header />
        <main className="relative flex flex-col">
          <Hero />
          <USP />
          <Workflow />
          <Insights />
          <CaseHighlight />
          <Testimonial />
          <Contact />
        </main>
        <Footer />
        <ThemeDock />
      </div>
    </>
  );
}
