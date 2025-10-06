// src/App.jsx
import React, { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import SEO from "./components/SEO";
import HowIWork from "./components/HowIWork";
import BeforeAfter from "./components/BeforeAfter";
import Skills from "./components/Skills";
import PilotCTA from "./components/PilotCTA";

const ScrollyPortal = React.lazy(() => import("./components/ScrollyPortal"));

export default function App() {
  return (
    <>
      <SEO />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <ScrollyPortal />
        </Suspense>

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
    </>
  );
}
