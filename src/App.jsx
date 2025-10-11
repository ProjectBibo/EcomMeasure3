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
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-light transition-colors dark:bg-surface-dark">
      <Header />
      <Suspense fallback={<SectionFallback label="Pagina" />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="measurement" element={<Measurement />} />
          <Route path="consent-mode" element={<ConsentMode />} />
          <Route path="cro" element={<Cro />} />
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
