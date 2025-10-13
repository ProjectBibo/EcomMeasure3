// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionFallback from "./components/SectionFallback";
import { LanguageProvider } from "./context/LanguageContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Measurement = lazy(() => import("./pages/Measurement"));
const ConsentMode = lazy(() => import("./pages/ConsentMode"));
const Cro = lazy(() => import("./pages/Cro"));
const BayesianCalculator = lazy(() => import("./pages/BayesianCalculator"));
const CroRoiCalculator = lazy(() => import("./pages/CroRoiCalculator"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GA4GTM = lazy(() => import("./pages/GA4GTM"));
const LookerStudio = lazy(() => import("./pages/LookerStudio"));
const BehaviorAnalysis = lazy(() => import("./pages/BehaviorAnalysis"));
const HypothesesAbTests = lazy(() => import("./pages/HypothesesAbTests"));
const Implementation = lazy(() => import("./pages/Implementation"));

function AppContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-light transition-colors dark:bg-surface-dark">
      <Header />
      <Suspense fallback={<SectionFallback label="Pagina" />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="measurement" element={<Measurement />} />
          <Route path="measurement/ga4-gtm" element={<GA4GTM />} />
          <Route path="measurement/looker-studio" element={<LookerStudio />} />
          <Route path="consent-mode" element={<ConsentMode />} />
          <Route path="cro" element={<Cro />} />
          <Route path="cro/gedragsanalyse" element={<BehaviorAnalysis />} />
          <Route path="cro/hypotheses-ab-tests" element={<HypothesesAbTests />} />
          <Route path="cro/implementatie" element={<Implementation />} />
          <Route path="tools/bayesian-ab-test" element={<BayesianCalculator />} />
          <Route path="tools/cro-roi" element={<CroRoiCalculator />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
