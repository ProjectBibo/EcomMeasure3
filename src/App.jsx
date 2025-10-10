// src/App.jsx
import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import CustomCursor from "./components/CustomCursor";

const Hero = lazy(() => import("./components/Hero"));
const USP = lazy(() => import("./components/USP"));
const Workflow = lazy(() => import("./components/Workflow"));
const HorizontalScrollShowcase = lazy(
  () => import("./components/HorizontalScrollShowcase")
);
const Insights = lazy(() => import("./components/Insights"));
const CaseHighlight = lazy(() => import("./components/CaseHighlight"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const Contact = lazy(() => import("./components/Contact"));

function SectionFallback({ label }) {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_rgba(2,6,23,0.4)]">
        {label} laden...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen overflow-x-hidden bg-surface-light dark:bg-surface-dark transition-colors">
        <CustomCursor />
        <Header />
        <main className="relative flex flex-col">
          <Suspense fallback={<SectionFallback label="Hero" />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<SectionFallback label="USP" />}>
            <USP />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Workflow" />}>
            <Workflow />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Showcase" />}>
            <HorizontalScrollShowcase />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Insights" />}>
            <Insights />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Cases" />}>
            <CaseHighlight />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Reviews" />}>
            <Testimonial />
          </Suspense>
          <Suspense fallback={<SectionFallback label="Contact" />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
