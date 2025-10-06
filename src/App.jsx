// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import SEO from "./components/SEO";

// Nieuwe secties (jouw versies die je net stuurde)
import HowIWork from "./components/HowIWork";
import BeforeAfter from "./components/BeforeAfter";
import Skills from "./components/Skills";
import PilotCTA from "./components/PilotCTA";

// BELANGRIJK: ScrollyPortal nu NIET importeren of renderen
// import ScrollyPortal from "./components/ScrollyPortal";

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
        <Header />
        <main>
          {/* 1) Hero bovenaan */}
          <Hero />

          {/* 2) DIRECT GEEN ScrollyPortal totdat we crash gevonden hebben */}
          {/* <ScrollyPortal /> */}

          {/* 3) Jouw nieuwe secties */}
          <HowIWork />
          <BeforeAfter />
          <Skills />
          <PilotCTA />

          {/* 4) Bestaande secties */}
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
