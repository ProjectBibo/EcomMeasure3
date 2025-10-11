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

const SCENARIOS = [
  {
    key: "conservative",
    uplift: 0.2,
    title: {
      nl: "Conservatief (+20%)",
      en: "Conservative (+20%)",
    },
    subtitle: {
      nl: "Laaghangend fruit oplossen",
      en: "Tackle low-hanging fruit",
    },
  },
  {
    key: "realistic",
    uplift: 0.4,
    expected: true,
    title: {
      nl: "Realistisch (+40%)",
      en: "Realistic (+40%)",
    },
    subtitle: {
      nl: "Belangrijkste pijnpunten aanpakken",
      en: "Address core friction points",
    },
  },
  {
    key: "ambitious",
    uplift: 0.8,
    title: {
      nl: "Ambitieus (+80%)",
      en: "Ambitious (+80%)",
    },
    subtitle: {
      nl: "Systematische verbeteringen",
      en: "Systematic improvements",
    },
  },
  {
    key: "very-ambitious",
    uplift: 1.5,
    title: {
      nl: "Zeer ambitieus (+150%)",
      en: "Very ambitious (+150%)",
    },
    subtitle: {
      nl: "Volledige website optimalisatie",
      en: "Full site optimisation",
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
      badges: {
        conversionRate: "Huidige conversieratio",
        transactions: "Huidige transacties/maand",
        annualRevenue: "Huidige jaaromzet",
      },
      invalidTitle: "Onvoldoende gegevens",
      invalidDescription:
        "Vul minstens één bezoeker en één transactie per maand in om de scenario's te berekenen.",
      table: {
        ariaLabel: "Scenariovergelijking CRO ROI",
        scenario: "Scenario",
        newRate: "Nieuwe conversieratio",
        extraTransactions: "Extra transacties / maand",
        extraRevenue: "Extra omzet / jaar",
        extraProfit: "Extra winst / jaar",
        roi: "ROI per €1 geïnvesteerd",
        expectedTag: "Verwacht scenario",
      },
      charts: {
        revenueTitle: "Extra omzet per jaar",
        profitTitle: "Extra winst per jaar",
        fallback: "Geen data",
      },
      download: {
        label: "Download resultaten",
        csv: "Exporteer CSV",
        pdf: "Exporteer PDF",
      },
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
      badges: {
        conversionRate: "Current conversion rate",
        transactions: "Current orders/month",
        annualRevenue: "Current annual revenue",
      },
      invalidTitle: "Not enough data",
      invalidDescription: "Provide at least one visitor and one transaction per month to calculate the scenarios.",
      table: {
        ariaLabel: "CRO ROI scenario comparison",
        scenario: "Scenario",
        newRate: "New conversion rate",
        extraTransactions: "Extra orders / month",
        extraRevenue: "Extra revenue / year",
        extraProfit: "Extra profit / year",
        roi: "ROI per €1 invested",
        expectedTag: "Expected scenario",
      },
      charts: {
        revenueTitle: "Extra revenue per year",
        profitTitle: "Extra profit per year",
        fallback: "No data",
      },
      download: {
        label: "Download results",
        csv: "Export CSV",
        pdf: "Export PDF",
      },
    },
    placeholders: {
      visitors: "e.g. 10000",
      transactions: "e.g. 200",
      aov: "e.g. 75",
      margin: "e.g. 35",
    },
  },
};

function escapeCsvValue(value) {
  const stringValue = value ?? "";
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function formatDateStamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function escapePdfText(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createPdfBlob(lines) {
  const textLines = lines.map((line) => escapePdfText(line));
  const contentLines = textLines
    .map((line, index) => (index === 0 ? `(${line}) Tj` : `T* (${line}) Tj`))
    .join("\n");
  const content = `BT\n/F1 12 Tf\n1 0 0 1 72 760 Tm\n14 TL\n${contentLines}\nET`;
  const header = "%PDF-1.3\n";

  const objects = [];
  const offsets = [];
  let offset = header.length;

  const pushObject = (obj) => {
    offsets.push(offset);
    const serialized = `${obj}\n`;
    objects.push(serialized);
    offset += serialized.length;
  };

  pushObject("1 0 obj<</Type /Catalog /Pages 2 0 R>>endobj");
  pushObject("2 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj");
  pushObject(
    "3 0 obj<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<</Font<</F1 5 0 R>>>>>>endobj"
  );
  pushObject(`4 0 obj<</Length ${content.length}>>stream\n${content}\nendstream\nendobj`);
  pushObject("5 0 obj<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>endobj");

  const body = objects.join("");
  const xrefOffset = header.length + body.length;
  const xrefHeader = "xref\n0 6\n0000000000 65535 f \n";
  const xrefEntries = offsets
    .map((value) => `${value.toString().padStart(10, "0")} 00000 n \n`)
    .join("");
  const trailer = `trailer<</Size 6 /Root 1 0 R>>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([header, body, xrefHeader, xrefEntries, trailer], { type: "application/pdf" });
}

function ResultBadge({ label, value, description, ariaLabel }) {
  return (
    <div
      role="listitem"
      aria-label={ariaLabel}
      className="rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-[14px_20px_60px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[18px_26px_80px_rgba(2,6,23,0.55)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
      {description ? <p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">{description}</p> : null}
    </div>
  );
}

function ScenarioBarChart({ title, valueKey, data, formatter, fallbackLabel, ariaLabel }) {
  const maxValue = data.reduce((acc, item) => (item[valueKey] > acc ? item[valueKey] : acc), 0);

  return (
    <div
      className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[20px_28px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/10"
      role="group"
      aria-label={ariaLabel}
    >
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-gray-200">{title}</h4>
      {maxValue > 0 ? (
        <div className="mt-5 space-y-4">
          {data.map((scenario) => {
            const value = scenario[valueKey];
            const width = maxValue > 0 && value > 0 ? Math.max(6, Math.round((value / maxValue) * 100)) : 0;
            return (
              <div key={scenario.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-gray-400">
                  <span>{scenario.title}</span>
                  <span>{formatter(value)}</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200/70 dark:bg-neutral-700/60" aria-hidden>
                  <div
                    className="h-2 rounded-full bg-brand-blue/70 dark:bg-brand-teal"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 text-sm text-neutral-500 dark:text-gray-400">{fallbackLabel}</p>
      )}
    </div>
  );
}

function getRoiTone(roiPercent) {
  if (roiPercent === null) {
    return "text-neutral-500 dark:text-gray-400";
  }
  if (roiPercent < -5) {
    return "text-red-600 dark:text-red-400";
  }
  if (roiPercent <= 5) {
    return "text-neutral-500 dark:text-gray-400";
  }
  return "text-brand-teal dark:text-brand-teal";
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
  const [results, setResults] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [language]
  );

  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [language]
  );

  const integerFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "nl" ? "nl-NL" : "en-US", {
        maximumFractionDigits: 0,
      }),
    [language]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const visitors = Number(formState.visitors);
    const transactions = Number(formState.transactions);
    const aov = Number(formState.aov);
    const margin = Number(formState.margin);

    const selectedActivity =
      ACTIVITY_OPTIONS.find((option) => option.value === formState.activity) ?? ACTIVITY_OPTIONS[0];
    const selectedInvestment =
      INVESTMENT_OPTIONS.find((option) => option.value === formState.investment) ?? INVESTMENT_OPTIONS[0];

    const monthlyInvestment = selectedInvestment.monthly;
    const annualInvestment = monthlyInvestment * 12;

    if (visitors <= 0 || transactions <= 0 || aov <= 0 || margin < 0) {
      setResults({
        valid: false,
        visitors,
        transactions,
        aov,
        margin,
        monthlyInvestment,
        annualInvestment,
        selectedActivity,
        selectedInvestment,
      });
      setHasCalculated(true);
      return;
    }

    const baseConversionRate = transactions / visitors;
    const annualRevenue = Math.round(transactions * aov * 12);

    const scenarioResults = SCENARIOS.map((scenario) => {
      const newConversionRate = baseConversionRate * (1 + scenario.uplift);
      const extraTransactionsMonthly = Math.max(
        0,
        Math.round((newConversionRate - baseConversionRate) * visitors)
      );
      const extraRevenueYear = Math.max(0, Math.round(extraTransactionsMonthly * aov * 12));
      const extraProfitYear = Math.max(0, Math.round(extraRevenueYear * (margin / 100)));
      const roi = annualInvestment > 0 ? (extraProfitYear - annualInvestment) / annualInvestment : null;

      return {
        ...scenario,
        newConversionRate,
        extraTransactionsMonthly,
        extraRevenueYear,
        extraProfitYear,
        roi,
      };
    }).map((scenario) => ({
      ...scenario,
      title: scenario.title[language],
      subtitle: scenario.subtitle[language],
    }));

    setResults({
      valid: true,
      visitors,
      transactions,
      aov,
      margin,
      baseConversionRate,
      annualRevenue,
      scenarioResults,
      monthlyInvestment,
      annualInvestment,
      selectedActivity,
      selectedInvestment,
    });
    setHasCalculated(true);
  };

  const handleDownloadCsv = () => {
    if (!results?.valid) {
      return;
    }

    const baseFileName = `cro-roi-berekening-${formatDateStamp(new Date())}`;
    const rows = [
      [text.results.badges.conversionRate, percentFormatter.format(results.baseConversionRate)],
      [text.results.badges.transactions, integerFormatter.format(results.transactions)],
      [text.results.badges.annualRevenue, currencyFormatter.format(results.annualRevenue)],
      [],
      [
        text.results.table.scenario,
        text.results.table.newRate,
        text.results.table.extraTransactions,
        text.results.table.extraRevenue,
        text.results.table.extraProfit,
        text.results.table.roi,
      ],
      ...results.scenarioResults.map((scenario) => [
        scenario.title,
        percentFormatter.format(scenario.newConversionRate),
        `+${integerFormatter.format(scenario.extraTransactionsMonthly)}`,
        currencyFormatter.format(scenario.extraRevenueYear),
        currencyFormatter.format(scenario.extraProfitYear),
        scenario.roi === null ? "—" : percentFormatter.format(scenario.roi),
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => escapeCsvValue(cell)).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${baseFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!results?.valid) {
      return;
    }

    const baseFileName = `cro-roi-berekening-${formatDateStamp(new Date())}`;
    const lines = [
      `${text.title}`,
      "",
      `${text.results.badges.conversionRate}: ${percentFormatter.format(results.baseConversionRate)}`,
      `${text.results.badges.transactions}: ${integerFormatter.format(results.transactions)}`,
      `${text.results.badges.annualRevenue}: ${currencyFormatter.format(results.annualRevenue)}`,
      "",
      `${text.results.table.scenario} | ${text.results.table.newRate} | ${text.results.table.extraTransactions} | ${text.results.table.extraRevenue} | ${text.results.table.extraProfit} | ${text.results.table.roi}`,
      ...results.scenarioResults.map((scenario) =>
        `${scenario.title} | ${percentFormatter.format(scenario.newConversionRate)} | +${integerFormatter.format(
          scenario.extraTransactionsMonthly
        )} | ${currencyFormatter.format(scenario.extraRevenueYear)} | ${currencyFormatter.format(
          scenario.extraProfitYear
        )} | ${scenario.roi === null ? "—" : percentFormatter.format(scenario.roi)}`
      ),
    ];

    const blob = createPdfBlob(lines);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${baseFileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedInvestment =
    INVESTMENT_OPTIONS.find((option) => option.value === formState.investment) ?? INVESTMENT_OPTIONS[0];
  const selectedActivity =
    ACTIVITY_OPTIONS.find((option) => option.value === formState.activity) ?? ACTIVITY_OPTIONS[0];
  const badgesAriaLabel = language === "nl" ? "Belangrijkste kengetallen" : "Key metrics";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[28px_38px_110px_rgba(15,23,42,0.16)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[28px_42px_120px_rgba(2,6,23,0.6)]">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_rgba(56,189,248,0))]" aria-hidden />
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
                {selectedActivity.description[language]}
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
                {selectedInvestment.description[language]}
              </p>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition hover:translate-y-0.5 hover:bg-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              {text.form.submit}
            </button>
          </div>

          <div className="space-y-6" aria-live="polite">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { delay: 0.12, duration: 0.6 }}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[20px_28px_80px_rgba(15,23,42,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[24px_34px_90px_rgba(2,6,23,0.55)]"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{text.results.headline}</h3>
              {hasCalculated ? (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-4 md:grid-cols-3" role="list" aria-label={badgesAriaLabel}>
                    <ResultBadge
                      label={text.results.badges.conversionRate}
                      value={
                        results?.valid
                          ? percentFormatter.format(results.baseConversionRate)
                          : "—"
                      }
                      ariaLabel={`${text.results.badges.conversionRate}: ${
                        results?.valid ? percentFormatter.format(results.baseConversionRate) : "—"
                      }`}
                      description={language === "nl" ? "Transacties ÷ bezoekers" : "Orders ÷ visitors"}
                    />
                    <ResultBadge
                      label={text.results.badges.transactions}
                      value={
                        results?.valid
                          ? integerFormatter.format(results.transactions)
                          : "—"
                      }
                      ariaLabel={`${text.results.badges.transactions}: ${
                        results?.valid ? integerFormatter.format(results.transactions) : "—"
                      }`}
                      description={language === "nl" ? "Per maand" : "Per month"}
                    />
                    <ResultBadge
                      label={text.results.badges.annualRevenue}
                      value={
                        results?.valid
                          ? currencyFormatter.format(results.annualRevenue)
                          : "—"
                      }
                      ariaLabel={`${text.results.badges.annualRevenue}: ${
                        results?.valid ? currencyFormatter.format(results.annualRevenue) : "—"
                      }`}
                      description={language === "nl" ? "Op basis van huidige cijfers" : "Based on current figures"}
                    />
                  </div>

                  {results?.valid ? (
                    <>
                      <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-inner backdrop-blur dark:border-white/10 dark:bg-white/10">
                        <div className="overflow-x-auto">
                          <table
                            className="min-w-full divide-y divide-white/60 text-left text-sm dark:divide-white/10"
                            aria-label={text.results.table.ariaLabel}
                          >
                            <thead className="bg-white/70 dark:bg-white/5">
                              <tr>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.scenario}
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.newRate}
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.extraTransactions}
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.extraRevenue}
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.extraProfit}
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-neutral-600 dark:text-gray-300">
                                  {text.results.table.roi}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/40 dark:divide-white/5">
                              {results.scenarioResults.map((scenario) => {
                                const roiPercent = scenario.roi === null ? null : scenario.roi * 100;
                                return (
                                  <tr
                                    key={scenario.key}
                                    className={
                                      scenario.expected
                                        ? "bg-brand-blue/5 dark:bg-brand-teal/10"
                                        : ""
                                    }
                                  >
                                    <th scope="row" className="px-6 py-4 text-sm font-semibold text-neutral-800 dark:text-white">
                                      <div className="space-y-1">
                                        <span>{scenario.title}</span>
                                        <p className="text-xs font-normal text-neutral-500 dark:text-gray-400">
                                          {scenario.subtitle}
                                        </p>
                                        {scenario.expected ? (
                                          <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue dark:bg-brand-teal/20 dark:text-brand-teal">
                                            {text.results.table.expectedTag}
                                          </span>
                                        ) : null}
                                      </div>
                                    </th>
                                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-gray-200">
                                      {percentFormatter.format(scenario.newConversionRate)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-gray-200">
                                      +{integerFormatter.format(scenario.extraTransactionsMonthly)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-gray-200">
                                      {currencyFormatter.format(scenario.extraRevenueYear)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-gray-200">
                                      {currencyFormatter.format(scenario.extraProfitYear)}
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-semibold ${getRoiTone(roiPercent)}`}>
                                      {scenario.roi === null
                                        ? "—"
                                        : percentFormatter.format(scenario.roi)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-2">
                        <ScenarioBarChart
                          title={text.results.charts.revenueTitle}
                          valueKey="extraRevenueYear"
                          data={results.scenarioResults}
                          formatter={(value) => currencyFormatter.format(value)}
                          fallbackLabel={text.results.charts.fallback}
                          ariaLabel={text.results.charts.revenueTitle}
                        />
                        <ScenarioBarChart
                          title={text.results.charts.profitTitle}
                          valueKey="extraProfitYear"
                          data={results.scenarioResults}
                          formatter={(value) => currencyFormatter.format(value)}
                          fallbackLabel={text.results.charts.fallback}
                          ariaLabel={text.results.charts.profitTitle}
                        />
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-gray-400">
                          {text.results.download.label}
                        </p>
                        <div className="flex flex-wrap gap-3" role="group" aria-label={text.results.download.label}>
                          <button
                            type="button"
                            onClick={handleDownloadCsv}
                            className="inline-flex items-center justify-center rounded-xl border border-brand-blue/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm transition hover:border-brand-blue hover:bg-brand-blue/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue dark:bg-transparent dark:text-brand-teal"
                          >
                            {text.results.download.csv}
                          </button>
                          <button
                            type="button"
                            onClick={handleDownloadPdf}
                            className="inline-flex items-center justify-center rounded-xl border border-brand-blue/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm transition hover:border-brand-blue hover:bg-brand-blue/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue dark:bg-transparent dark:text-brand-teal"
                          >
                            {text.results.download.pdf}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-neutral-300/60 bg-white/60 p-6 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-white/5 dark:text-gray-300">
                      <p className="font-semibold text-neutral-800 dark:text-white">{text.results.invalidTitle}</p>
                      <p className="mt-2 text-sm">{text.results.invalidDescription}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-neutral-600 dark:text-gray-300">
                  {language === "nl"
                    ? "Vul je cijfers in en klik op bereken om de ROI-scenario's te zien."
                    : "Enter your figures and calculate to reveal the ROI scenarios."}
                </p>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
