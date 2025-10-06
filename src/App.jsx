import React from "react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import USP from "./components/USP";
import Testimonial from "./components/Testimonial";
import CaseHighlight from "./components/CaseHighlight";
import Insights from "./components/Insights";
import Footer from "./components/Footer";
import SnakeBackground from "./components/SnakeBackground";

export default function App() {
  return (
    <HelmetProvider>
      <SEO
        title="EcomMeasure – Data-gedreven website optimalisatie"
        description="EcomMeasure helpt webshops en websites groeien met GA4, Consent Mode v2 en UX optimalisaties."
        url="https://www.ecommeasure.com"
        image="/og-image.png"
      />

      <div className="relative bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-gray-100 font-sans min-h-screen overflow-hidden">
        {/* 🔹 Achtergrond */}
        <SnakeBackground />

        {/* 🔹 Alle content boven de background */}
        <div className="relative z-10">
          <Header />
          <Hero />
          <Workflow />
          <USP />
          <Testimonial />
          <CaseHighlight />
          <Insights />
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

