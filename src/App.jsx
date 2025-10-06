// src/App.jsx
import React from "react";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/Header";
import Hero from "./components/Hero";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import ErrorBoundary from "./ErrorBoundary";
import SnakeBackground from "./components/SnakeBackground";
import ScrollyPortal from "./components/ScrollyPortal";

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SEO />

        {/* Hele site dark/light achtergrond */}
        <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
          <Header />

          {/* Decoratieve background kan blijven (zit -z idx) */}
          <SnakeBackground />

          {/* --- BELANGRIJK: eerst de content (Hero bovenaan) --- */}
          <main>
            <Hero />

            {/* Jouw contentsecties */}
            <USP />
            <Workflow />
            <Insights />
            <CaseHighlight />
            <Testimonial />

            {/* --- PAS HIER de scrollytelling/portal-scenes --- */}
            <ScrollyPortal />
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
