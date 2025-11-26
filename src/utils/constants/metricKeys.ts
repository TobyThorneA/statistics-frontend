export const METRIC_KEYS = [
  "revenue",
  "cogs",
  "profit",
  "adSpend",
  "ROI",
  "ROMI",
] as const;

// Выведем тип на основе значений:
export type MetricKey = typeof METRIC_KEYS[number];
