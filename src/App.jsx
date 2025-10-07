// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollyPortal from "./components/ScrollyPortal";
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors relative overflow-hidden">
        {/* ✅ geef content een hogere z-index dan Snake */}
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <ScrollyPortal />
            <USP />
            <Workflow />
            <Insights />
            <CaseHighlight />
            <Testimonial />
          </main>
          <Footer />
        </div>
