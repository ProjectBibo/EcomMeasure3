// src/App.jsx
import React, { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Je bestaande secties (laat ze staan zoals je ze hebt)
import USP from "./components/USP";
import Workflow from "./components/Workflow";
import Insights from "./components/Insights";
import CaseHighlight from "./components/CaseHighlight";
import Testimonial from "./components/Testimonial";
import SEO from "./components/SEO";

// NIEUW: defensieve lazy import, zodat een fout in ScrollyPortal nooit de hele pagina breekt
const ScrollyPortal = React.lazy(() =>
  import("./components/ScrollyPortal").then(mod => ({ default: mod.default })).catch(() => ({ default: () => null }))
);

export default function App() {
  return (
    <>
      <SEO />

      {/* Hele site krijgt achtergrondkleur via Tailwind dark-mode */}
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors">
        <Header />

        <main>
          {/* 1) Eerst je hero (tekst) */}
          <Hero />

          {/* 2) Direct daarna de scrollytelling — maar nooit blocking door Suspense + catch */}
          <Suspense fallback={null}>
            <ScrollyPortal />
          </Suspense>

          {/* 3) Daarna de rest van je content-secties */}
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
