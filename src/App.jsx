// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
        <Header />
        <main>
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
}
