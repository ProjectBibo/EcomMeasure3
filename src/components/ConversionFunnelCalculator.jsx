import React, { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const calculatorCopy = {
  nl: {
    badge: "Revenue funnel", 
    title: "Conversiefunnel omzet calculator",
    description:
      "Vertaal bezoekers en funnelpercentages naar conversie, orders per maand en omzet. Pas de cijfers aan en zie direct de impact.",
    sections: {
      monthly: "Maandelijkse sitecijfers",
      funnel: "Funnelpercentages",
    },
    inputs: {
      visits: "Bezoeken",
      aov: "Gemiddelde orderwaarde (AOV)",
      product: "% van bezoeken dat de productpagina ziet",
      addToCart: "Add-to-cart percentage",
      cartToCheckout: "Add-to-cart → checkout percentage",
      checkoutToOrder: "Checkout → conversie percentage",
    },
    outputs: {
      conversionRate: "Conversiepercentage",
      orders: "Orders per maand",
      revenue: "Omzet per maand",
      stage: "Funnelstappen",
    },
    helper: "Gegevens worden direct herberekend. Percentages worden intern als decimalen gebruikt.",
  },
  en: {
    badge: "Revenue funnel",
    title: "Conversion funnel revenue calculator",
    description:
      "Turn visits and funnel percentages into conversion, monthly orders and revenue. Adjust the inputs to see the impact instantly.",
    sections: {
      monthly: "Monthly site numbers",
      funnel: "Funnel percentages",
    },
    inputs: {
      visits: "Visits",
      aov: "Average order value (AOV)",
      product: "% of visits that see the product page",
      addToCart: "Add to cart percentage",
      cartToCheckout: "Add to cart → checkout percentage",
      checkoutToOrder: "Checkout → conversion percentage",
    },
    outputs: {
      conversionRate: "Conversion rate",
      orders: "Orders per month",
      revenue: "Revenue per month",
      stage: "Funnel steps",
    },
    helper: "Values update automatically. Percentages are converted to decimals for calculations.",
  },
};

function parseNumber(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sanitizePercentage(value) {
  const numeric = parseNumber(value);
  return Math.min(Math.max(numeric, 0), 100);
}

export default function ConversionFunnelCalculator() {
  const { language } = useLanguage();
  const text = calculatorCopy[language];
  const [visits, setVisits] = useState("50000");
  const [aov, setAov] = useState("125");
  const [productPagePercentage, setProductPagePercentage] = useState("60");
  const [addToCartRate, setAddToCartRate] = useState("8");
  const [cartToCheckoutRate, setCartToCheckoutRate] = useState("65");
  const [checkoutToConversionRate, setCheckoutToConversionRate] = useState("85");

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [language]
  );

  const results = useMemo(() => {
    const visitsNumber = parseNumber(visits);
    const aovNumber = parseNumber(aov);

    const productPageRateDecimal = sanitizePercentage(productPagePercentage) / 100;
    const addToCartRateDecimal = sanitizePercentage(addToCartRate) / 100;
    const cartToCheckoutRateDecimal = sanitizePercentage(cartToCheckoutRate) / 100;
    const checkoutToConversionRateDecimal = sanitizePercentage(checkoutToConversionRate) / 100;

    const productPageVisits = visitsNumber * productPageRateDecimal;
    const addToCart = productPageVisits * addToCartRateDecimal;
    const checkoutStarts = addToCart * cartToCheckoutRateDecimal;
    const orders = checkoutStarts * checkoutToConversionRateDecimal;

    const conversionRate = visitsNumber > 0 ? (orders / visitsNumber) * 100 : 0;
    const revenue = orders * aovNumber;

    return {
      visitsNumber,
      productPageVisits,
      addToCart,
      checkoutStarts,
      orders,
      conversionRate,
      revenue,
    };
  }, [
    visits,
    aov,
    productPagePercentage,
    addToCartRate,
    cartToCheckoutRate,
    checkoutToConversionRate,
  ]);

  return (
    <section className="mt-12 rounded-3xl bg-white/90 p-6 shadow-lg ring-1 ring-black/5  ">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-blue">{text.badge}</p>
          <h2 className="text-2xl font-semibold text-neutral-900 ">{text.title}</h2>
          <p className="mt-1 max-w-3xl text-sm text-neutral-600 ">{text.description}</p>
        </div>
        <p className="text-xs text-neutral-500 ">{text.helper}</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm  ">
            <h3 className="text-lg font-semibold text-neutral-900 ">{text.sections.monthly}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.visits}
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={visits}
                  onChange={(event) => setVisits(event.target.value)}
                  className="mt-2 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                />
              </label>
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.aov}
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-500 ">€</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={aov}
                    onChange={(event) => setAov(event.target.value)}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm  ">
            <h3 className="text-lg font-semibold text-neutral-900 ">{text.sections.funnel}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.product}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    value={productPagePercentage}
                    onChange={(event) => setProductPagePercentage(event.target.value)}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                  />
                  <span className="text-sm text-neutral-500">%</span>
                </div>
              </label>
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.addToCart}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    value={addToCartRate}
                    onChange={(event) => setAddToCartRate(event.target.value)}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                  />
                  <span className="text-sm text-neutral-500">%</span>
                </div>
              </label>
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.cartToCheckout}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    value={cartToCheckoutRate}
                    onChange={(event) => setCartToCheckoutRate(event.target.value)}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                  />
                  <span className="text-sm text-neutral-500">%</span>
                </div>
              </label>
              <label className="block text-sm font-medium text-neutral-700 ">
                {text.inputs.checkoutToOrder}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    value={checkoutToConversionRate}
                    onChange={(event) => setCheckoutToConversionRate(event.target.value)}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/40  "
                  />
                  <span className="text-sm text-neutral-500">%</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-brand-teal/10 via-white to-brand-blue/10 p-5 shadow-sm  ">
            <h3 className="text-lg font-semibold text-neutral-900 ">{text.outputs.conversionRate}</h3>
            <p className="mt-2 text-3xl font-bold text-brand-blue">
              {results.conversionRate.toFixed(2)}%
            </p>
            <p className="mt-3 text-sm font-medium text-neutral-700 ">{text.outputs.orders}</p>
            <p className="text-xl font-semibold text-neutral-900 ">{Math.round(results.orders).toLocaleString(language === "nl" ? "nl-NL" : "en-US")}</p>
            <p className="mt-3 text-sm font-medium text-neutral-700 ">{text.outputs.revenue}</p>
            <p className="text-xl font-semibold text-neutral-900 ">{formatter.format(Math.round(results.revenue))}</p>
          </div>

          <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm  ">
            <h3 className="text-lg font-semibold text-neutral-900 ">{text.outputs.stage}</h3>
            <dl className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <dt className="text-sm text-neutral-700 ">{text.inputs.product}</dt>
                <dd className="text-sm font-semibold text-neutral-900 ">
                  {Math.round(results.productPageVisits).toLocaleString(language === "nl" ? "nl-NL" : "en-US")}
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <dt className="text-sm text-neutral-700 ">{text.inputs.addToCart}</dt>
                <dd className="text-sm font-semibold text-neutral-900 ">
                  {Math.round(results.addToCart).toLocaleString(language === "nl" ? "nl-NL" : "en-US")}
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <dt className="text-sm text-neutral-700 ">{text.inputs.cartToCheckout}</dt>
                <dd className="text-sm font-semibold text-neutral-900 ">
                  {Math.round(results.checkoutStarts).toLocaleString(language === "nl" ? "nl-NL" : "en-US")}
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                <dt className="text-sm text-neutral-700 ">{text.outputs.orders}</dt>
                <dd className="text-sm font-semibold text-neutral-900 ">
                  {Math.round(results.orders).toLocaleString(language === "nl" ? "nl-NL" : "en-US")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
