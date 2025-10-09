// src/App.jsx
import React, { useEffect } from "react";
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
import { stripLegacyScrollyPortal } from "./utils/legacyPortal";

export default function App() {
  useEffect(() => {
    const disconnect = stripLegacyScrollyPortal();
    return () => {
      if (typeof disconnect === "function") {
        disconnect();
      }
    };
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
