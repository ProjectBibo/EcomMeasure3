// src/App.jsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionFallback from "./components/SectionFallback";
import CookieNoticeLoader from "./components/CookieNoticeLoader";
import { LanguageProvider } from "./context/LanguageContext";
import { isViewTransitionActive, resetPageView } from "./utils/viewTransition";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Measurement = lazy(() => import("./pages/Measurement"));
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
const Confirmation = lazy(() => import("./pages/Confirmation"));

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setPrefersReduced(event.matches);
    setPrefersReduced(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}

function ViewTransitionRoutes({ children }) {
  const location = useLocation();
  const prefersReduced = usePrefersReducedMotion();
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location === displayLocation) return;

    const supported = typeof document !== "undefined" && "startViewTransition" in document;
    if (!supported || prefersReduced) {
      setDisplayLocation(location);
      return;
    }

    let transition;
    try {
      transition = document.startViewTransition(() => {
        setDisplayLocation(location);
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("View transition failed", error);
      }
      setDisplayLocation(location);
    }

    return () => {
      transition?.finished?.catch(() => {});
    };
  }, [location, displayLocation, prefersReduced]);

  return <Routes location={displayLocation}>{children}</Routes>;
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) return;
    if (isViewTransitionActive()) return;
    resetPageView();
  }, [location.hash, location.pathname, location.search]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-light transition-colors ">
      <CookieNoticeLoader />
      <Header />
      <Suspense fallback={<SectionFallback label="Pagina" />}>
        <ViewTransitionRoutes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="measurement" element={<Measurement />} />
          <Route path="measurement/ga4-gtm" element={<GA4GTM />} />
          <Route path="measurement/looker-studio" element={<LookerStudio />} />
          <Route path="cro" element={<Cro />} />
          <Route path="cro/gedragsanalyse" element={<BehaviorAnalysis />} />
          <Route path="cro/hypotheses-ab-tests" element={<HypothesesAbTests />} />
          <Route path="cro/implementatie" element={<Implementation />} />
          <Route path="tools/bayesian-ab-test" element={<BayesianCalculator />} />
          <Route path="tools/cro-roi" element={<CroRoiCalculator />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </ViewTransitionRoutes>
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
