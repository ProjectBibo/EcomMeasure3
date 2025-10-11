import React, { useState } from "react";
import {
  runBayesianSimulation,
  formatPercentage,
  formatCurrency,
  formatCompactNumber,
} from "../utils/bayesianCalculator";

const DEFAULT_VARIANTS = [
  {
    id: "variant-0",
    name: "Origineel",
    visitors: "",
    conversions: "",
    transactions: "",
    revenue: "",
    productsPerOrder: "",
  },
  {
    id: "variant-1",
    name: "Variant A",
    visitors: "",
    conversions: "",
    transactions: "",
    revenue: "",
    productsPerOrder: "",
  },
];

const GOAL_OPTIONS = [
  "Registratie",
  "Klik",
  "Download",
  "Lead",
  "Add-to-cart",
];

const DURATION_OPTIONS = [
  { value: "days", label: "Dagen" },
  { value: "weeks", label: "Weken" },
  { value: "months", label: "Maanden" },
];

function getPtbbTone(ptbb) {
  if (ptbb >= 0.9) return "bg-emerald-100 text-emerald-700";
  if (ptbb <= 0.1) return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
}

function VariantHistogram({ histogram }) {
  const width = 280;
  const height = 120;

  if (!histogram?.bins?.length) {
    return (
      <div className="h-24 w-full rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-neutral-500">
        Onvoldoende data voor grafiek
      </div>
    );
  }

  const maxY = Math.max(...histogram.bins.map((bin) => bin.y)) || 1;
  const points = histogram.bins
    .map((bin, index) => {
      const x = (index / (histogram.bins.length - 1 || 1)) * width;
      const y = height - (bin.y / maxY) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      role="img"
      aria-label="Verdeling van uplift"
      viewBox={`0 0 ${width} ${height}`}
      className="h-24 w-full rounded-md bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 p-1"
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth="3"
        className="stroke-brand-blue"
        strokeLinecap="round"
      />
      <line
        x1={width / 2}
        x2={width / 2}
        y1={0}
        y2={height}
        className="stroke-neutral-200 dark:stroke-neutral-700"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export default function BayesianAbCalculator() {
  const [mode, setMode] = useState("goals");
  const [variants, setVariants] = useState(DEFAULT_VARIANTS);
  const [goalType, setGoalType] = useState(GOAL_OPTIONS[0]);
  const [averageOrderValue, setAverageOrderValue] = useState("150");
  const [businessPeriodMonths, setBusinessPeriodMonths] = useState(6);
  const [trafficShare, setTrafficShare] = useState(50);
  const [testDurationValue, setTestDurationValue] = useState(4);
  const [testDurationUnit, setTestDurationUnit] = useState("weeks");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasEcommerceFields = mode === "ecommerce";

  const disableAddVariant = variants.length >= 5;

  function handleVariantChange(index, field, value) {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  }

  function addVariant() {
    if (disableAddVariant) return;
    setVariants((prev) => [
      ...prev,
      {
        id: `variant-${prev.length}`,
        name: `Variant ${String.fromCharCode(65 + prev.length - 1)}`,
        visitors: "",
        conversions: "",
        transactions: "",
        revenue: "",
        productsPerOrder: "",
      },
    ]);
  }

  function removeVariant(index) {
    if (index === 0 || variants.length <= 2) return;
    setVariants((prev) => prev.filter((_, idx) => idx !== index));
  }

  function validateInputs() {
    if (variants.length < 2) {
      return "Voeg minimaal één variatie toe.";
    }

    const baseline = variants[0];
    if (!baseline.visitors || !baseline.conversions) {
      return "Vul bezoekers en conversies voor het origineel in.";
    }

    for (const variant of variants) {
      if (Number(variant.conversions) > Number(variant.visitors)) {
        return `Conversies mogen niet hoger zijn dan bezoekers voor ${variant.name}.`;
      }
    }

    if (hasEcommerceFields) {
      for (const variant of variants) {
        if (variant.revenue && !variant.transactions) {
          return `Vul ook transacties in voor ${variant.name} om omzet te gebruiken.`;
        }
      }
    }

    return "";
  }

  function handleCalculate(event) {
    event.preventDefault();
    const validationMessage = validateInputs();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const simulation = runBayesianSimulation({
        mode,
        variants,
        averageOrderValue: Number(averageOrderValue || 0),
        businessPeriodMonths: Number(businessPeriodMonths || 0),
        testDurationValue: Number(testDurationValue || 0),
        testDurationUnit,
        trafficShare: Number(trafficShare || 0),
      });
      setResults(simulation);
      setLoading(false);
    }, 50);
  }

  function handleExportCsv() {
    if (!results) return;

    const headers = [
      "Variant",
      "Bezoekers",
      "Conversies",
      "Conversie%",
      "Uplift",
      "PTBB",
      "CI_low",
      "CI_high",
      "Omzetimpact_mean",
      "Omzetimpact_low",
      "Omzetimpact_high",
    ];

    const rows = results.variants.map((variant) => [
      variant.name,
      variant.visitors,
      variant.conversions,
      (variant.conversionMean * 100).toFixed(2),
      (variant.upliftMean * 100).toFixed(2),
      (variant.ptbb * 100).toFixed(2),
      (variant.credibleInterval.low * 100).toFixed(2),
      (variant.credibleInterval.high * 100).toFixed(2),
      Math.round(variant.revenueImpact.mean),
      Math.round(variant.revenueImpact.low),
      Math.round(variant.revenueImpact.high),
    ]);

    const csvContent = [headers, ...rows]
      .map((line) => line.join(";"))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bayesiaanse-ab-calculator.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleExportPdf() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  return (
    <section className="mt-12 rounded-3xl bg-white/90 p-6 shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-blue">
            Bayesian CRO toolkit
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            A/B-test calculator
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Analyseer Goals of Ecommerce data met 100.000 Monte Carlo-iteraties. Ontvang direct de kans dat een variant beter is,
            credible intervals en de business case.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("goals")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "goals"
                ? "bg-brand-blue text-white shadow"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            Goals-modus
          </button>
          <button
            type="button"
            onClick={() => setMode("ecommerce")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === "ecommerce"
                ? "bg-brand-teal text-white shadow"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            Ecommerce-modus
          </button>
        </div>
      </header>

      <form onSubmit={handleCalculate} className="mt-6 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {variants.map((variant, index) => (
            <div
              key={variant.id}
              className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {variant.name || `Variant ${index}`}
                </h3>
                {index > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700"
                  >
                    Verwijder
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Variantnaam
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(event) => handleVariantChange(index, "name", event.target.value)}
                    className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Bezoekers
                  <input
                    required={index === 0}
                    type="number"
                    min="0"
                    value={variant.visitors}
                    onChange={(event) => handleVariantChange(index, "visitors", event.target.value)}
                    className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Conversies
                  <input
                    required={index === 0}
                    type="number"
                    min="0"
                    value={variant.conversions}
                    onChange={(event) => handleVariantChange(index, "conversions", event.target.value)}
                    className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </label>
                {hasEcommerceFields ? (
                  <>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Transacties
                      <input
                        type="number"
                        min="0"
                        value={variant.transactions}
                        onChange={(event) => handleVariantChange(index, "transactions", event.target.value)}
                        className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Totale omzet
                      <input
                        type="number"
                        min="0"
                        value={variant.revenue}
                        onChange={(event) => handleVariantChange(index, "revenue", event.target.value)}
                        className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                      />
                    </label>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Producten per order (optioneel)
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={variant.productsPerOrder}
                        onChange={(event) => handleVariantChange(index, "productsPerOrder", event.target.value)}
                        className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                      />
                    </label>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="rounded-2xl border border-dashed border-brand-blue/40 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Testduur
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={testDurationValue}
                  onChange={(event) => setTestDurationValue(event.target.value)}
                  className="w-20 rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                />
                <select
                  value={testDurationUnit}
                  onChange={(event) => setTestDurationUnit(event.target.value)}
                  className="rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  {DURATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-brand-blue/40 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Business case periode
              </label>
              <div className="mt-1 flex items-center gap-2">
                {[6, 12].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setBusinessPeriodMonths(period)}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      businessPeriodMonths === period
                        ? "bg-brand-yellow text-neutral-900"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    {period} mnd
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-brand-blue/40 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                % verkeer in test
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={trafficShare}
                onChange={(event) => setTrafficShare(event.target.value)}
                className="mt-1 w-24 rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            {mode === "goals" && (
              <>
                <div className="rounded-2xl border border-dashed border-brand-blue/40 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Doeltype
                  </label>
                  <select
                    value={goalType}
                    onChange={(event) => setGoalType(event.target.value)}
                    className="mt-1 rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    {GOAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-2xl border border-dashed border-brand-blue/40 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Gemiddelde orderwaarde (optioneel)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={averageOrderValue}
                    onChange={(event) => setAverageOrderValue(event.target.value)}
                    className="mt-1 w-32 rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 self-end">
            <button
              type="button"
              onClick={addVariant}
              disabled={disableAddVariant}
              className="rounded-full border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue transition hover:bg-brand-blue/10 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400"
            >
              Variant toevoegen
            </button>
            <button
              type="submit"
              className="rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:bg-brand-blue/90"
            >
              {loading ? "Berekenen..." : "Bereken resultaten"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      {results && !loading && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-brand-blue">
                Monte Carlo output ({results.iterations.toLocaleString()} iteraties)
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Baseline: {results.variants[0].name} – {formatPercentage(results.variants[0].conversionMean)} conversie
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Modus: {mode === "goals" ? `Goals (${goalType})` : "Ecommerce"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExportCsv}
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-700 hover:border-brand-blue hover:text-brand-blue dark:border-neutral-700 dark:text-neutral-300"
              >
                Exporteer CSV
              </button>
              <button
                type="button"
                onClick={handleExportPdf}
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-700 hover:border-brand-blue hover:text-brand-blue dark:border-neutral-700 dark:text-neutral-300"
              >
                Exporteer PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 text-left">Variant</th>
                  <th className="px-4 py-3 text-left">Conversie</th>
                  <th className="px-4 py-3 text-left">Uplift vs. baseline</th>
                  <th className="px-4 py-3 text-left">PTBB</th>
                  <th className="px-4 py-3 text-left">95% CI</th>
                  <th className="px-4 py-3 text-left">Omzet / bezoeker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {results.variants.map((variant, index) => {
                  const ptbbLabel = `${(variant.ptbb * 100).toFixed(1)}%`;
                  const badgeTone = index === 0 ? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300" : getPtbbTone(variant.ptbb);
                  const upliftDisplay = `${(variant.upliftMean * 100).toFixed(2)}%`;
                  const intervalLabel = index === 0
                    ? "0,00% – 0,00%"
                    : `${(variant.credibleInterval.low * 100).toFixed(2)}% – ${(variant.credibleInterval.high * 100).toFixed(2)}%`;
                  return (
                    <tr key={variant.id || variant.name} className="text-sm">
                      <td className="px-4 py-3 font-medium text-neutral-900 dark:text-white">
                        <div>{variant.name}</div>
                        <p className="text-xs text-neutral-500">
                          {variant.conversions} conversies van {variant.visitors} bezoekers
                        </p>
                      </td>
                      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">
                        {formatPercentage(variant.conversionMean)}
                      </td>
                      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">
                        <span className={
                          variant.upliftMean > 0
                            ? "text-emerald-600"
                            : variant.upliftMean < 0
                            ? "text-rose-600"
                            : "text-neutral-600"
                        }>
                          {upliftDisplay}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeTone}`}>
                          {ptbbLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">
                        <span title="95% credible interval voor uplift">{intervalLabel}</span>
                      </td>
                      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">
                        {formatCurrency(variant.revenuePerVisitorMean)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {results.variants.map((variant, index) => (
              <div key={`${variant.name}-viz`} className="rounded-2xl border border-neutral-200/80 bg-white/80 p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {variant.name}
                  </h4>
                  {index !== 0 && (
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPtbbTone(variant.ptbb)}`}>
                      PTBB {Math.round(variant.ptbb * 100)}%
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Uplift distributie op basis van {formatCompactNumber(results.iterations)} runs.
                </p>
                <div className="mt-4">
                  <VariantHistogram histogram={variant.histogram} />
                </div>
                {index !== 0 && (
                  <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                    95% van de simulaties valt tussen <strong>{(variant.credibleInterval.low * 100).toFixed(2)}%</strong> en
                    <strong> {(variant.credibleInterval.high * 100).toFixed(2)}%</strong> uplift.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {results.variants.map((variant, index) => (
              <div key={`${variant.name}-business`} className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-5 dark:border-brand-teal/20 dark:bg-brand-teal/10">
                <h5 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Business case – {variant.name}
                </h5>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-300">
                  Verwachte omzetimpact over {results.metadata.businessPeriodMonths} maanden.
                </p>
                <p className="mt-3 text-2xl font-semibold text-brand-teal">
                  {formatCurrency(variant.revenueImpact.mean)}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  CI95: {formatCurrency(variant.revenueImpact.low)} – {formatCurrency(variant.revenueImpact.high)}
                </p>
                {index === 0 ? (
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Baseline referentie op basis van huidige data.
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Inclusief traffic share van {trafficShare}% en extrapolatie van testperiode ({testDurationValue} {DURATION_OPTIONS.find((option) => option.value === testDurationUnit)?.label}).
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

