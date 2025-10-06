// src/App.jsx
import React from "react";

// Bestaande onderdelen
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import SEO from "./components/SEO";

// Nieuwe onderdelen (let op hoofdletters!)
import HowIWork from "./components/HowIWork";
import BeforeAfter from "./components/BeforeAfter";
import Skills from "./components/Skills";
import PilotCTA from "./components/PilotCTA";

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
        <Header />
        <main>
          {/* Hero bovenaan */}
          <Hero />

          {/* Nieuwe secties */}
          <HowIWork />
          <BeforeAfter />
          <Skills />
          <PilotCTA />

          {/* Bestaande secties */}
          <USP />
          <Workflow />
          <Insights />
          <CaseHighlight />
          <Testimonial />
        </main>
        <Footer />
      </div>
    </>
  );
}
