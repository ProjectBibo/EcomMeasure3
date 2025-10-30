// src/ErrorBoundary.jsx
import React from "react";
import LanguageContext from "./context/LanguageContext";
import { translations } from "./i18n/content";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }

  static contextType = LanguageContext;
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    // Zorgt dat je altijd iets in de console ziet
    console.error("UI crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      const { language = "nl" } = this.context ?? {};
      const fallbackCopy =
        translations[language]?.errorBoundary ?? translations.nl.errorBoundary;
      return (
        <div className="min-h-screen grid place-items-center p-6 bg-surface-light dark:bg-surface-dark">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-2 text-red-600">{fallbackCopy.title}</h1>
            <p className="text-sm text-neutral-600 dark:text-gray-300">
              {fallbackCopy.description}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
