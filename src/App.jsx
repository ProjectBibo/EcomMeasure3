// src/App.jsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionFallback from "./components/SectionFallback";
import CookieNoticeLoader from "./components/CookieNoticeLoader";
import { LanguageProvider } from "./context/LanguageContext";
import { scrollToContactSection } from "./utils/scrollToContact";
import { isViewTransitionActive, resetPageView } from "./utils/viewTransition";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Measurement = lazy(() => import("./pages/Measurement"));
const Cro = lazy(() => import("./pages/Cro"));
const ConversionFunnelCalculator = lazy(() => import("./pages/ConversionFunnelCalculator"));
const CroRoiCalculator = lazy(() => import("./pages/CroRoiCalculator"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GA4GTM = lazy(() => import("./pages/GA4GTM"));
const LookerStudio = lazy(() => import("./pages/LookerStudio"));
const BehaviorAnalysis = lazy(() => import("./pages/BehaviorAnalysis"));
const HypothesesAbTests = lazy(() => import("./pages/HypothesesAbTests"));
const Implementation = lazy(() => import("./pages/Implementation"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Werkwijze = lazy(() => import("./pages/Werkwijze"));

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

  useEffect(() => {
    if (!location.hash) return;
    if (location.hash === "#contact") {
      scrollToContactSection();
      return;
    }

    const target = document.querySelector(location.hash);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location]);

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
          <Route path="tools/conversion-funnel-calculator" element={<ConversionFunnelCalculator />} />
          <Route path="tools/funnel-impact-calculator" element={<CroRoiCalculator />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="werkwijze" element={<Werkwijze />} />
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
