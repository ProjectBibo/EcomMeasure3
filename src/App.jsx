import React from "react";
import { HelmetProvider } from "react-helmet-async";

// SEO
import SEO from "./components/SEO";

// Sections (jouw bestaande)
import Header from "./components/Header";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import USP from "./components/USP";
// import Testimonial from "./components/Testimonial"; // reviews weggelaten
import CaseHighlight from "./components/CaseHighlight";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

// Animations
import SnakeBackground from "./components/SnakeBackground"; // jouw verlengde slang
import ScrollyAirElite from "./components/ScrollyAirElite"; // nieuwe ultra scrolly

export default function App() {
  return (
    <HelmetProvider>
      <SEO
        title="EcomMeasure – Data-gedreven website optimalisatie"
        description="EcomMeasure helpt webshops en websites groeien met GA4, Consent Mode v2 en UX optimalisaties."
        url="https://www.ecommeasure.com"
        image="/og-image.png"
      />

      <div className="relative text-gray-100 font-sans min-h-screen overflow-hidden">
        {/* Achtergrond: puzzel-slang (gaat nu veel langer door) */}
        <SnakeBackground />

        {/* (Optioneel) Luxe film grain */}
        {/* <div className="grain-overlay" /> */}

        {/* Contentlaag */}
        <div className="relative z-10">
          <Header />
          <Hero />

          {/* ✨ Ultra scrolly story met kleur-wipes, kinetic type, KPI, video, case reveal, magnetische CTA */}
          <ScrollyAirElite />

          {/* Jouw bestaande secties */}
          <Workflow />
          <USP />
          {/* <Testimonial /> */}
          <CaseHighlight />
          <Insights />
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}
