import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const copy = {
  nl: {
    inputs: {
      heading: "Jouw maandelijkse cijfers",
      visits: "Maandelijkse bezoeken",
      aov: "Gemiddelde orderwaarde",
      productPage: "% dat de productpagina ziet",
      addToCart: "Add to cart rate",
      checkoutProgression: "Add to cart → checkout progression",
      checkoutConversion: "Checkout → conversie",
    },
    outputs: {
      heading: "Impact per funnelstap",
      conversionRate: "Totale conversieratio",
      orders: "Bestellingen per maand",
      revenue: "Omzet per maand",
      dropOff: "Grootste lek",
      dropLabel: (from, to) => `${from} → ${to}`,
    },
    funnel: {
      labels: ["Bezoeken", "Productpagina", "Winkelwagen", "Checkout", "Conversie"],
    },
    helper: {
      leakNote: "Dit model volgt de GA4-logica: iedere stap bouwt voort op de vorige.",
    },
  },
  en: {
    inputs: {
      heading: "Your monthly numbers",
      visits: "Monthly visits",
      aov: "Average order value",
      productPage: "% of visits seeing product page",
      addToCart: "Add to cart rate",
      checkoutProgression: "Add to cart → checkout progression",
      checkoutConversion: "Checkout → conversion",
    },
    outputs: {
      heading: "Impact by funnel step",
      conversionRate: "Overall conversion rate",
      orders: "Orders per month",
      revenue: "Revenue per month",
      dropOff: "Largest leak",
      dropLabel: (from, to) => `${from} → ${to}`,
    },
    funnel: {
      labels: ["Visits", "Product page", "Cart", "Checkout", "Conversion"],
    },
    helper: {
      leakNote: "This model mirrors GA4-style funnels: every step depends on the previous one.",
    },
  },
};

function formatNumber(value, language, options = {}) {
  return new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}

function formatCurrency(value, language) {
  return new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function CroRoiCalculator() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const text = copy[language];

  const [visits, setVisits] = useState(100000);
  const [averageOrderValue, setAverageOrderValue] = useState(49.99);
  const [productPagePercent, setProductPagePercent] = useState(80);
  const [addToCartPercent, setAddToCartPercent] = useState(10);
  const [checkoutProgressPercent, setCheckoutProgressPercent] = useState(50);
  const [checkoutConversionPercent, setCheckoutConversionPercent] = useState(75);

  const funnel = useMemo(() => {
    const productPageViews = (visits * productPagePercent) / 100;
    const addToCarts = (productPageViews * addToCartPercent) / 100;
    const checkouts = (addToCarts * checkoutProgressPercent) / 100;
    const conversions = (checkouts * checkoutConversionPercent) / 100;
    const revenue = conversions * averageOrderValue;
    const conversionRate = visits > 0 ? conversions / visits : 0;

    const steps = [
      { key: "visits", label: text.funnel.labels[0], value: visits },
      { key: "product", label: text.funnel.labels[1], value: productPageViews },
      { key: "cart", label: text.funnel.labels[2], value: addToCarts },
      { key: "checkout", label: text.funnel.labels[3], value: checkouts },
      { key: "conversion", label: text.funnel.labels[4], value: conversions },
    ];

    const drops = steps.slice(0, -1).map((step, index) => {
      if (step.value <= 0) return { index, percent: 0 };
      const next = steps[index + 1].value;
      const percent = (step.value - next) / step.value;
      return { index, percent };
    });

    const largestDrop = drops.reduce(
      (current, candidate) => (candidate.percent > current.percent ? candidate : current),
      { index: 0, percent: 0 }
    );

    return {
      productPageViews,
      addToCarts,
      checkouts,
      conversions,
      revenue,
      conversionRate,
      steps,
      largestDrop,
    };
  }, [
    visits,
    averageOrderValue,
    productPagePercent,
    addToCartPercent,
    checkoutProgressPercent,
    checkoutConversionPercent,
    text.funnel.labels,
  ]);

  const handlePercentChange = (setter) => (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) {
      setter(0);
      return;
    }
    const clamped = Math.max(0, Math.min(100, value));
    setter(clamped);
  };

  return (
    <div className="grid gap-8 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[22px_34px_90px_rgba(15,23,42,0.14)] backdrop-blur md:grid-cols-2 md:p-8  ">
      <div className="space-y-6">
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.4 }}
          className="text-xl font-semibold text-neutral-900 "
        >
          {text.inputs.heading}
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.visits}</span>
            <input
              type="number"
              min="0"
              step="1"
              value={visits}
              onChange={(event) => setVisits(Math.max(0, Number(event.target.value) || 0))}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.aov}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={averageOrderValue}
              onChange={(event) => setAverageOrderValue(Math.max(0, Number(event.target.value) || 0))}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.productPage}</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={productPagePercent}
              onChange={handlePercentChange(setProductPagePercent)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.addToCart}</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={addToCartPercent}
              onChange={handlePercentChange(setAddToCartPercent)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.checkoutProgression}</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={checkoutProgressPercent}
              onChange={handlePercentChange(setCheckoutProgressPercent)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
            <span className="text-sm font-semibold text-neutral-800 ">{text.inputs.checkoutConversion}</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={checkoutConversionPercent}
              onChange={handlePercentChange(setCheckoutConversionPercent)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-inner focus:border-brand-blue focus:outline-none "
            />
          </label>
        </div>
        <p className="text-sm text-neutral-500 ">{text.helper.leakNote}</p>
      </div>

      <div className="space-y-6 rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-surface-soft p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900 ">{text.outputs.heading}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 ">{text.outputs.conversionRate}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900 ">
              {formatNumber(funnel.conversionRate * 100, language, { maximumFractionDigits: 2 })}%
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 ">{text.outputs.orders}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900 ">{formatNumber(funnel.conversions, language)}</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 ">{text.outputs.revenue}</p>
            <p className="mt-2 text-2xl font-semibold text-neutral-900 ">{formatCurrency(funnel.revenue, language)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/70 px-4 py-3 shadow-inner">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 ">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-bold text-brand-blue">
              ↓
            </span>
            {text.outputs.dropOff}
          </div>
          <div className="text-sm text-neutral-600 ">
            {text.outputs.dropLabel(
              funnel.steps[funnel.largestDrop.index].label,
              funnel.steps[funnel.largestDrop.index + 1].label
            )}
            {` (${formatNumber(funnel.largestDrop.percent * 100, language, { maximumFractionDigits: 1 })}%)`}
          </div>
        </div>

        <div className="space-y-4">
          {funnel.steps.map((step, index) => {
            const maxValue = funnel.steps[0].value || 1;
            const width = Math.max(4, (step.value / maxValue) * 100);
            const isLargestLeak = index > 0 && funnel.largestDrop.index === index - 1;
            return (
              <div key={step.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-neutral-700 ">
                  <span className="font-semibold text-neutral-900 ">{step.label}</span>
                  <span>{formatNumber(step.value, language)}</span>
                </div>
                <div className="relative h-3 rounded-full bg-neutral-100 ">
                  <div
                    className={`h-3 rounded-full ${isLargestLeak ? "bg-brand-yellow" : "bg-brand-blue"}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
                {index < funnel.steps.length - 1 ? (
                  <p className="text-xs text-neutral-500 ">
                    {formatNumber(
                      funnel.steps[index].value > 0
                        ? ((funnel.steps[index + 1].value - funnel.steps[index].value) / funnel.steps[index].value) * -100
                        : 0,
                      language,
                      { maximumFractionDigits: 1 }
                    )}%
                    {" "}
                    {language === "nl" ? "van vorige stap" : "from previous step"}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
