// src/components/LookerDashboard.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

export default function LookerDashboard() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].dashboard;

  const revenueData = useMemo(
    () => [12800, 14200, 13650, 15120, 16840, 15980, 17460, 18230],
    []
  );
  const conversionData = useMemo(
    () => [1.8, 1.9, 1.7, 2.0, 2.2, 2.1, 2.3, 2.4],
    []
  );
  const maxRevenue = Math.max(...revenueData);
  const maxConversion = Math.max(...conversionData) * 1.15;
  const xStep = 100 / revenueData.length;
  const marginTop = 6;
  const chartHeight = 46;

  const conversionPoints = conversionData
    .map((value, index) => {
      const x = index * xStep;
      const y = marginTop + chartHeight - (value / maxConversion) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const deviceSplit = [
    { key: "desktop", value: 58 },
    { key: "mobile", value: 34 },
    { key: "tablet", value: 8 },
  ];

  return (
    <section
      id="dashboard"
      data-snap-section
      className="relative overflow-hidden bg-neutral-950 py-24 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="flex max-w-2xl flex-col gap-4"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-yellow">
              {t.badge}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.heading}</h2>
            <p className="text-sm text-neutral-200 sm:text-base">{t.description}</p>
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <motion.ul
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {t.highlights.map((item) => (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.35)] backdrop-blur"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-200">{item.text}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-blue/40 to-brand-teal/25 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-[0_32px_80px_rgba(15,23,42,0.55)]">
              <div className="border-b border-white/10 bg-white/5 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">
                      {t.report.eyebrow}
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-white">{t.report.title}</p>
                      <p className="text-xs text-neutral-300">{t.report.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-brand-yellow" aria-hidden />
                      {t.report.actions.share}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                      {t.report.actions.download}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-black/40 px-6 py-3 text-xs text-neutral-300">
                {t.report.filters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden />
                    {filter}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-white">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-yellow" aria-hidden />
                  {t.report.dateRange}
                </span>
              </div>

              <div className="space-y-6 px-6 py-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {t.report.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-[0_12px_40px_rgba(8,47,73,0.28)]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-300">{kpi.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{kpi.value}</p>
                      <p className="mt-1 text-xs font-medium text-emerald-300">{kpi.delta}</p>
                      <p className="mt-1 text-xs text-neutral-400">{kpi.deltaLabel}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-white">{t.report.charts.revenue.title}</p>
                        <p className="text-xs text-neutral-300">{t.report.charts.revenue.helper}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-neutral-300">
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-1.5 w-3 rounded-full bg-brand-blue" aria-hidden />
                          {t.report.charts.revenue.legend.revenue}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-1.5 w-3 rounded-full bg-brand-yellow" aria-hidden />
                          {t.report.charts.revenue.legend.conversion}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 h-48 w-full rounded-xl bg-black/40 p-4">
                      <svg viewBox="0 0 100 60" className="h-full w-full">
                        <defs>
                          <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
                            <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
                          </linearGradient>
                        </defs>
                        <g>
                          {revenueData.map((value, index) => {
                            const barHeight = (value / maxRevenue) * chartHeight;
                            const x = index * xStep + xStep * 0.15;
                            const y = marginTop + chartHeight - barHeight;
                            const width = xStep * 0.7;
                            return (
                              <rect
                                key={value + index}
                                x={x}
                                y={y}
                                width={width}
                                height={barHeight}
                                rx={1.2}
                                fill="url(#revenueGradient)"
                                opacity={0.95}
                              />
                            );
                          })}
                          <polyline
                            fill="none"
                            stroke="rgba(234,179,8,0.85)"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={conversionPoints}
                          />
                          {conversionData.map((value, index) => {
                            const x = index * xStep;
                            const y = marginTop + chartHeight - (value / maxConversion) * chartHeight;
                            return (
                              <circle
                                key={`point-${index}`}
                                cx={x}
                                cy={y}
                                r={1.6}
                                fill="#ffcc02"
                              />
                            );
                          })}
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                      <p className="text-sm font-medium text-white">{t.report.charts.device.title}</p>
                      <p className="text-xs text-neutral-300">{t.report.charts.device.helper}</p>
                      <div className="mt-4 space-y-3">
                        {deviceSplit.map((device) => (
                          <div key={device.key} className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-neutral-300">
                              <span>{t.report.charts.device.labels[device.key]}</span>
                              <span>{device.value}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-blue"
                                style={{ width: `${device.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                      <p className="text-sm font-medium text-white">{t.report.charts.table.title}</p>
                      <p className="text-xs text-neutral-300">{t.report.charts.table.helper}</p>
                      <div className="mt-4 overflow-x-auto pb-1">
                        <div className="min-w-[480px] space-y-3">
                          <div className="grid grid-cols-[1.2fr_repeat(3,minmax(0,0.9fr))] gap-3 text-[11px] uppercase tracking-wide text-neutral-400">
                            <span>{t.report.charts.table.headers.channel}</span>
                            <span>{t.report.charts.table.headers.revenue}</span>
                            <span>{t.report.charts.table.headers.sessions}</span>
                            <span>{t.report.charts.table.headers.conversion}</span>
                          </div>
                          <div className="space-y-3 text-sm text-neutral-200">
                            {t.report.charts.table.rows.map((row) => (
                              <div
                                key={row.channel}
                                className="grid grid-cols-[1.2fr_repeat(3,minmax(0,0.9fr))] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2"
                              >
                                <span className="font-medium text-white">{row.channel}</span>
                                <span>{row.revenue}</span>
                                <span>{row.sessions}</span>
                                <span>{row.conversion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-300">{t.footnote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
