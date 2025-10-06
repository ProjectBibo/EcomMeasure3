import React from "react";
import { HelmetProvider } from "react-helmet-async";

// SEO
import SEO from "./components/SEO";

// Sections (alle componenten die je hebt aangemaakt)
import Header from "./components/Header";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import USP from "./components/USP";
import Testimonial from "./components/Testimonial";
import CaseHighlight from "./components/CaseHighlight";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

export default function App() {
  return (
    <HelmetProvider>
      {/* SEO instellingen */}
      <SEO
        title="EcomMeasure – Data-gedreven website optimalisatie"
        description="EcomMeasure helpt webshops en websites groeien met GA4, Consent Mode v2 en UX optimalisaties."
        url="https://www.ecommeasure.com"
        image="/og-image.png"
      />

      {/* Hier zet je de pagina-layout in de juiste volgorde */}
      <div className="bg-white text-neutral-900 font-sans">
        <Header />
        <Hero />
        <Workflow />
        <USP />
        <Testimonial />
        <CaseHighlight />
        <Insights />
        <Footer />
      </div>
    </HelmetProvider>
  );
}
