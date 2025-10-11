const ITERATIONS = 100000;

function sampleGamma(shape) {
  if (shape < 1) {
    const u = Math.random();
    return sampleGamma(1 + shape) * Math.pow(u, 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  while (true) {
    let x;
    let v;
    do {
      const normal = sampleStandardNormal();
      x = normal;
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) {
      return d * v;
    }
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
      return d * v;
    }
  }
}

function sampleStandardNormal() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function sampleBeta(alpha, beta) {
  const x = sampleGamma(alpha);
  const y = sampleGamma(beta);
  return x / (x + y);
}

function sampleNormal(mean, stdDev) {
  if (stdDev <= 0) return mean;
  return mean + sampleStandardNormal() * stdDev;
}

function quantile(sortedArray, q) {
  if (!sortedArray.length) return 0;
  const position = (sortedArray.length - 1) * q;
  const base = Math.floor(position);
  const rest = position - base;
  if (sortedArray[base + 1] !== undefined) {
    return sortedArray[base] + rest * (sortedArray[base + 1] - sortedArray[base]);
  }
  return sortedArray[base];
}

function createHistogram(samples, binCount = 40) {
  if (!samples.length) {
    return { bins: [], min: 0, max: 0 };
  }
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  if (min === max) {
    return {
      bins: [{ x: min, y: samples.length }],
      min,
      max,
    };
  }
  const binSize = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    x: min + i * binSize,
    y: 0,
  }));
  samples.forEach((value) => {
    const index = Math.min(
      binCount - 1,
      Math.max(0, Math.floor((value - min) / binSize))
    );
    bins[index].y += 1;
  });
  return { bins, min, max };
}

function computeRevenueSamples({
  mode,
  variant,
  conversionSample,
  averageOrderValue,
}) {
  if (mode === "goals") {
    if (!averageOrderValue) {
      return 0;
    }
    const meanAov = averageOrderValue;
    const stdDev = averageOrderValue * 0.1;
    const aov = Math.max(0, sampleNormal(meanAov, stdDev));
    return conversionSample * aov;
  }
  const transactions = Number(variant.transactions || 0);
  const revenue = Number(variant.revenue || 0);
  if (transactions <= 0 || revenue <= 0) {
    return 0;
  }
  const meanAov = revenue / transactions;
  const variability = Math.max(meanAov * 0.2, 1);
  const stdDev = variability / Math.sqrt(Math.max(transactions, 1));
  const aov = Math.max(0, sampleNormal(meanAov, stdDev));
  return conversionSample * aov;
}

export function runBayesianSimulation({
  mode,
  variants,
  averageOrderValue,
  businessPeriodMonths,
  testDurationValue,
  testDurationUnit,
  trafficShare,
}) {
  if (!variants?.length) {
    return null;
  }
  const preparedVariants = variants.map((variant) => ({
    id: variant.id,
    name: variant.name || "Variant",
    visitors: Number(variant.visitors || 0),
    conversions: Number(variant.conversions || 0),
    transactions: Number(variant.transactions || 0),
    revenue: Number(variant.revenue || 0),
    productsPerOrder: Number(variant.productsPerOrder || 0),
  }));

  const baseline = preparedVariants[0];
  const samples = preparedVariants.map(() => ({
    conversions: [],
    revenuePerVisitor: [],
    uplift: [],
    revenueDiff: [],
  }));

  const baselineAlpha = baseline.conversions + 1;
  const baselineBeta = baseline.visitors - baseline.conversions + 1;

  const visitorTotals = preparedVariants.reduce(
    (acc, v) => acc + (v.visitors || 0),
    0
  );
  const trafficFraction = Math.max(trafficShare / 100, 0.0001);
  const durationInDays = convertToDays(testDurationValue, testDurationUnit);
  const periodInDays = Math.round(businessPeriodMonths * 30);
  const visitorsPerDay = durationInDays
    ? visitorTotals / durationInDays / Math.max(trafficFraction, 0.0001)
    : 0;
  const projectedVisitors = visitorsPerDay * periodInDays;

  for (let i = 0; i < ITERATIONS; i += 1) {
    const baselineConv = sampleBeta(baselineAlpha, baselineBeta);
    const baselineRevenue = computeRevenueSamples({
      mode,
      variant: baseline,
      conversionSample: baselineConv,
      averageOrderValue,
    });
    samples[0].conversions.push(baselineConv);
    samples[0].revenuePerVisitor.push(baselineRevenue);

    preparedVariants.forEach((variant, index) => {
      if (index === 0) {
        samples[index].uplift.push(0);
        samples[index].revenueDiff.push(0);
        return;
      }
      const alpha = variant.conversions + 1;
      const beta = variant.visitors - variant.conversions + 1;
      const conv = sampleBeta(Math.max(alpha, 0.5), Math.max(beta, 0.5));
      const revenue = computeRevenueSamples({
        mode,
        variant,
        conversionSample: conv,
        averageOrderValue,
      });
      const uplift = baselineConv > 0 ? (conv - baselineConv) / baselineConv : 0;
      samples[index].conversions.push(conv);
      samples[index].revenuePerVisitor.push(revenue);
      samples[index].uplift.push(uplift);
      samples[index].revenueDiff.push(revenue - baselineRevenue);
    });
  }

  const baselineConversionMean = mean(samples[0].conversions);
  const baselineRevenueMean = mean(samples[0].revenuePerVisitor);

  const results = preparedVariants.map((variant, index) => {
    const conversionSamples = samples[index].conversions;
    const upliftSamples = samples[index].uplift;
    const revenuePerVisitorSamples = samples[index].revenuePerVisitor;
    const revenueDiffSamples = samples[index].revenueDiff;

    const sortedUplift = [...upliftSamples].sort((a, b) => a - b);
    const ptbb = index === 0
      ? 0.5
      : upliftSamples.filter((value) => value > 0).length / upliftSamples.length;
    const conversionMean = mean(conversionSamples);
    const revenueMean = mean(revenuePerVisitorSamples);
    const upliftMean = mean(upliftSamples);
    const credibleInterval = index === 0
      ? { low: 0, high: 0 }
      : {
          low: quantile(sortedUplift, 0.025),
          high: quantile(sortedUplift, 0.975),
        };
    const histogram = createHistogram(upliftSamples);

    const sortedRevenueDiff = [...revenueDiffSamples].sort((a, b) => a - b);
    const revenueImpact = index === 0
      ? { mean: 0, low: 0, high: 0 }
      : {
          mean: mean(revenueDiffSamples) * projectedVisitors,
          low: quantile(sortedRevenueDiff, 0.025) * projectedVisitors,
          high: quantile(sortedRevenueDiff, 0.975) * projectedVisitors,
        };

    return {
      ...variant,
      conversionMean,
      upliftMean,
      ptbb,
      credibleInterval,
      histogram,
      revenuePerVisitorMean: revenueMean,
      revenueImpact,
      conversionSamplesLength: conversionSamples.length,
    };
  });

  return {
    iterations: ITERATIONS,
    mode,
    variants: results,
    baseline: {
      name: baseline.name,
      conversionMean: baselineConversionMean,
      revenuePerVisitorMean: baselineRevenueMean,
    },
    metadata: {
      visitorTotals,
      projectedVisitors,
      businessPeriodMonths,
      durationInDays,
      trafficShare,
    },
  };
}

function convertToDays(value, unit) {
  const numericValue = Number(value || 0);
  if (!numericValue) return 0;
  switch (unit) {
    case "weeks":
      return numericValue * 7;
    case "months":
      return numericValue * 30;
    case "days":
    default:
      return numericValue;
  }
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((acc, value) => acc + value, 0) / values.length;
}

export function formatPercentage(value) {
  if (!Number.isFinite(value)) return "–";
  return `${(value * 100).toFixed(2)}%`;
}

export function formatCurrency(value) {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactNumber(value) {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("nl-NL", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

