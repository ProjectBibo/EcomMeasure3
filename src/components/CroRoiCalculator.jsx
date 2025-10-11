import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const ACTIVITY_OPTIONS = [
  {
    value: "none",
    multiplier: 1,
    label: {
      nl: "Geen CRO activiteiten",
      en: "No CRO activities",
    },
    description: {
      nl: "Volledig onbenut – veel ruimte voor groei.",
      en: "Untapped potential – plenty of room to grow.",
    },
  },
  {
    value: "ad-hoc",
    multiplier: 0.75,
    label: {
      nl: "Af en toe experimenten",
      en: "Occasional experiments",
    },
    description: {
      nl: "Er wordt getest, maar zonder vast proces.",
      en: "Some testing happens without a consistent programme.",
    },
  },
  {
    value: "team",
    multiplier: 0.55,
    label: {
      nl: "In-house CRO team",
      en: "In-house CRO team",
    },
    description: {
      nl: "Team actief, maar extra expertise versnelt.",
      en: "Team in place, external focus can accelerate.",
    },
  },
];

const INVESTMENT_OPTIONS = [
  {
    value: "starter",
    monthly: 1995,
    uplift: 0.08,
    label: {
      nl: "Starter – €1.995 p/m",
      en: "Starter – €1,995 p/m",
    },
    description: {
      nl: "Hypotheses & experimenten elke maand",
      en: "Monthly hypotheses and experiments",
    },
  },
  {
    value: "growth",
    monthly: 2995,
    uplift: 0.14,
    label: {
      nl: "Growth – €2.995 p/m",
      en: "Growth – €2,995 p/m",
    },
    description: {
      nl: "Volledig CRO-programma met UX & analyse",
      en: "Full CRO programme with UX & analysis",
    },
  },
  {
    value: "scale",
    monthly: 4495,
    uplift: 0.2,
    label: {
      nl: "Scale – €4.495 p/m",
      en: "Scale – €4,495 p/m",
    },
    description: {
      nl: "Meerdere experimenten per sprint en implementatie",
      en: "Multiple experiments per sprint plus implementation",
    },
  },
];

const copy = {
  nl: {
    badge: "Calculator",
    title: "CRO ROI Calculator",
    intro:
      "Bereken de impact van een CRO-programma op omzet, winst en ROI op basis van jouw bezoekers, transacties en marge.",
    form: {
      visitors: "Bezoekers per maand",
      transactions: "Transacties per maand",
      aov: "Gemiddelde orderwaarde",
      margin: "Bruto winstmarge (%)",
      activity: "Huidige CRO activiteiten",
      investment: "CRO investering per maand",
      submit: "Bereken resultaat",
    },
    results: {
      headline: "Verwachte impact",
      uplift: "Verwachte uplift",
      revenueImpact: "Extra omzet per maand",
      profitImpact: "Extra winst per maand",
      roi: "ROI op investering",
      without: "Zonder CRO",
      with: "Met CRO programma",
      annual: "12 maanden prognose",
      ctaHelper: "Update de velden en klik opnieuw op bereken voor de nieuwste cijfers.",
    },
    placeholders: {
      visitors: "Bijv. 10000",
      transactions: "Bijv. 200",
      aov: "Bijv. 75",
      margin: "Bijv. 35",
    },
  },
  en: {
    badge: "Calculator",
    title: "CRO ROI Calculator",
    intro:
      "Estimate the impact of a CRO programme on revenue, profit and ROI using your visitors, transactions and margin.",
    form: {
      visitors: "Visitors per month",
      transactions: "Transactions per month",
      aov: "Average order value",
      margin: "Gross profit margin (%)",
      activity: "Current CRO activity",
      investment: "CRO investment per month",
      submit: "Calculate impact",
    },
    results: {
      headline: "Projected impact",
      uplift: "Expected uplift",
      revenueImpact: "Extra revenue per month",
      profitImpact: "Extra profit per month",
      roi: "ROI on investment",
      without: "Without CRO",
      with: "With CRO programme",
      annual: "12 month projection",
      ctaHelper: "Update the fields and hit calculate again for refreshed numbers.",
    },
    placeholders: {
      visitors: "e.g. 10000",
      transactions: "e.g. 200",
      aov: "e.g. 75",
      margin: "e.g. 35",
    },
  },
};

function MetricCard({ title, value, helper }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 text-left shadow-[18px_26px_70px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[20px_32px_90px_rgba(2,6,23,0.55)]">
      <p className="text-sm font-medium text-neutral-500 dark:text-gray-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">{value}</p>
      {helper ? <p className="mt-2 text-xs text-neutral-500 dark:text-gray-400">{helper}</p> : null}
    </div>
  );
}

export default function CroRoiCalculator() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const text = copy[language];

  const [formState, setFormState] = useState({
    visitors: "",
    transactions: "",
    aov: "",
    margin: "",
    activity: ACTIVITY_OPTIONS[0].value,
    investment: INVESTMENT_OPTIONS[1].value,
  });
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const calculations = useMemo(() => {
    const visitors = Number(formState.visitors) || 0;
    const transactions = Number(formState.transactions) || 0;
    const aov = Number(formState.aov) || 0;
    const margin = Number(formState.margin) || 0;

    const selectedActivity = ACTIVITY_OPTIONS.find((option) => option.value === formState.activity) ?? ACTIVITY_OPTIONS[0];
    const selectedInvestment = INVESTMENT_OPTIONS.find((option) => option.value === formState.investment) ?? INVESTMENT_OPTIONS[0];

    const conversionRate = visitors > 0 ? transactions / visitors : 0;
    const expectedUplift = selectedInvestment.uplift * selectedActivity.multiplier;
    const improvedConversionRate = conversionRate * (1 + expectedUplift);
    const additionalTransactions = Math.max(0, improvedConversionRate * visitors - transactions);
    const baselineRevenue = transactions * aov;
    const improvedRevenue = (transactions + additionalTransactions) * aov;
    const revenueImpact = Math.max(0, improvedRevenue - baselineRevenue);
    const grossProfitImpact = revenueImpact * (margin / 100);
    const monthlyInvestment = selectedInvestment.monthly;
    const roi = monthlyInvestment > 0 ? (grossProfitImpact - monthlyInvestment) / monthlyInvestment : 0;

    return {
      visitors,
      transactions,
      aov,
      margin,
      selectedActivity,
      selectedInvestment,
      conversionRate,
      expectedUplift,
      additionalTransactions,
      revenueImpact,
      grossProfitImpact,
      monthlyInvestment,
      roi,
      baselineRevenue,
      improvedRevenue,
    };
  }, [formState]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [language]
  );

  const percentageFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [language]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasCalculated(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[28px_38px_110px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[28px_42px_120px_rgba(2,6,23,0.6)]">
      <div className="absolute inset-0 pointer-events-none opacity-60 [background:radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_rgba(56,189,248,0))]" aria-hidden />
      <div className="relative">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.4 }}
          className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue"
        >
          {text.badge}
        </motion.span>
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.06, duration: 0.55 }}
          className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          {text.title}
        </motion.h2>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.55 }}
          className="mt-4 max-w-2xl text-sm text-neutral-600 dark:text-gray-300"
        >
          {text.intro}
        </motion.p>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
                {text.form.visitors}
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="visitors"
                  value={formState.visitors}
                  onChange={handleInputChange}
                  placeholder={text.placeholders.visitors}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
                {text.form.transactions}
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="transactions"
                  value={formState.transactions}
                  onChange={handleInputChange}
                  placeholder={text.placeholders.transactions}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
                {text.form.aov}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="aov"
                  value={formState.aov}
                  onChange={handleInputChange}
                  placeholder={text.placeholders.aov}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
                {text.form.margin}
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  name="margin"
                  value={formState.margin}
                  onChange={handleInputChange}
                  placeholder={text.placeholders.margin}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
              {text.form.activity}
              <select
                name="activity"
                value={formState.activity}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              >
                {ACTIVITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label[language]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-neutral-500 dark:text-gray-400">
                {ACTIVITY_OPTIONS.find((option) => option.value === formState.activity)?.description[language]}
              </p>
            </label>
            <label className="flex flex-col text-sm font-medium text-neutral-700 dark:text-gray-200">
              {text.form.investment}
              <select
                name="investment"
                value={formState.investment}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              >
                {INVESTMENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label[language]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-neutral-500 dark:text-gray-400">
                {INVESTMENT_OPTIONS.find((option) => option.value === formState.investment)?.description[language]}
              </p>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition hover:translate-y-0.5 hover:bg-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {text.form.submit}
            </button>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.12, duration: 0.6 }}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[20px_28px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[24px_34px_90px_rgba(2,6,23,0.55)]"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{text.results.headline}</h3>
              {hasCalculated ? (
                <div className="mt-6 space-y-5">
                  <MetricCard
                    title={text.results.uplift}
                    value={percentageFormatter.format(calculations.expectedUplift || 0)}
                  />
                  <MetricCard
                    title={text.results.revenueImpact}
                    value={currencyFormatter.format(calculations.revenueImpact || 0)}
                    helper={`${text.results.annual}: ${currencyFormatter.format((calculations.revenueImpact || 0) * 12)}`}
                  />
                  <MetricCard
                    title={text.results.profitImpact}
                    value={currencyFormatter.format(calculations.grossProfitImpact || 0)}
                    helper={`${text.results.annual}: ${currencyFormatter.format((calculations.grossProfitImpact || 0) * 12)}`}
                  />
                  <MetricCard
                    title={text.results.roi}
                    value={percentageFormatter.format(calculations.roi || 0)}
                    helper={
                      calculations.monthlyInvestment
                        ? `${currencyFormatter.format(calculations.monthlyInvestment)} ${language === "nl" ? "investering p/m" : "investment p/m"}`
                        : undefined
                    }
                  />
                </div>
              ) : (
                <p className="mt-4 text-sm text-neutral-600 dark:text-gray-300">{text.results.ctaHelper}</p>
              )}
            </motion.div>

            {hasCalculated ? (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.6 }}
                className="grid gap-5 sm:grid-cols-2"
              >
                <div className="rounded-2xl border border-white/50 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-white/10">
                  <h4 className="text-sm font-semibold text-neutral-500 dark:text-gray-400">{text.results.without}</h4>
                  <p className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">
                    {currencyFormatter.format(calculations.baselineRevenue || 0)}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">
                    {language === "nl" ? "Maandelijkse omzet bij huidige conversie" : "Monthly revenue at current conversion"}
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-teal/40 bg-brand-teal/10 p-5 backdrop-blur dark:border-brand-teal/40 dark:bg-brand-teal/20">
                  <h4 className="text-sm font-semibold text-brand-teal">{text.results.with}</h4>
                  <p className="mt-3 text-2xl font-semibold text-brand-teal">
                    {currencyFormatter.format(calculations.improvedRevenue || 0)}
                  </p>
                  <p className="mt-1 text-xs text-brand-teal/80">
                    {language === "nl" ? "Maandelijkse omzet met programma" : "Monthly revenue with programme"}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
