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

import ScrollyPortal from "./components/ScrollyPortal";
import SnakeBackground from "./components/SnakeBackground";

export default function App() {
  return (
    <>
      <SEO />
      {/* Hele site wrapper */}
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors relative overflow-hidden">
        {/* Navigatie + darkmode toggle */}
        <Header />

        {/* Main content */}
        <main className="relative z-10">
          {/* Hero altijd bovenaan */}
          <Hero />

          {/* Scroll-animatie secties */}
          <ScrollyPortal />

          {/* Overige secties */}
          <USP />
          <Workflow />
          <Insights />
          <CaseHighlight />
          <Testimonial />
        </main>

        {/* Footer */}
        <Footer />

        {/* Snake-achtergrond, achter alles (-z-10) */}
        <SnakeBackground />
      </div>
    </>
  );
}
