// src/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    // Zorgt dat je altijd iets in de console ziet
    console.error("UI crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-6 bg-surface-light dark:bg-surface-dark">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-2 text-red-600">Er ging iets mis</h1>
            <p className="text-sm text-neutral-600 dark:text-gray-300">
              Probeer de pagina te verversen. Als dit blijft gebeuren, kijk in de console/logs.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
