// // src/components/adAnalytics/AdAnalytics.tsx
import React, { useEffect, useState } from "react";
import { fetchAdAnalytics } from "../../api/adAnalyticsApi";
import type { ISODateString } from "../../types/ISODateString";
import MetricCard from "./MetricCard";
import type { Metric } from "./MetricCard";
import type { AnalyticsResponse } from "../../types/analyticsResponse";

interface AdAnalyticsProps {
  startDate: ISODateString;
  endDate: ISODateString;
}

// Дебаунс хук
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const AdAnalytics: React.FC<AdAnalyticsProps> = ({ startDate, endDate }) => {
  const [adAnalytics, setAdAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const debouncedStart = useDebounce(startDate, 500);
  const debouncedEnd = useDebounce(endDate, 500);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchAdAnalytics(debouncedStart, debouncedEnd)
      .then((data: AnalyticsResponse) => {
        if (isMounted) setAdAnalytics(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [debouncedStart, debouncedEnd]);

  if (error) return <div className="text-center text-red-600 font-medium">Ошибка загрузки: {error.message}</div>;
  if (loading) return <p className="text-center">Загрузка данных...</p>;
  if (!adAnalytics) return <p className="text-center">Данных нет или не загрузились</p>;

  // Преобразуем метрики в массив для MetricCard
  const adAnalyticsArray: Metric[] = Object.entries(adAnalytics.metrics).map(([key, value]) => ({
    name: key,
    adSpend: value.adSpend ?? 0,
    leadExpense: value.leadExpense ?? 0,
    cogs: value.totalCogs ?? 0,
    revenue: value.revenue ?? 0,
    grossProfit: value.grossProfit ?? 0,
    netProfit: value.netProfit ?? 0,
    businessROI: value.businessROI ?? 0,
    adROI: value.adROI ?? 0,
    ROMI: value.ROMI ?? 0,
  }));

  // totalMetrics от бэка
  const totalMetrics = adAnalytics.metrics.total;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {adAnalyticsArray.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </div>

      {/* <div className="mt-4 text-center font-semibold">
        <p>Общая выручка: {formatCurrency(totalMetrics.revenue)}</p>
        <p>Общая чистая прибыль: {formatCurrency(totalMetrics.netProfit)}</p>
        <p>Прочие расходы (дневные): {formatCurrency(adAnalytics.otherSpendTotal)}</p>
        <p>ROI (общий): {Math.round(totalMetrics.businessROI * 100) / 100} %</p>
        <p>ROMI (общий): {Math.round(totalMetrics.ROMI * 100) / 100} %</p>
      </div> */}
      <div className="mt-4 text-center font-semibold">
  <p>Общая выручка: {formatCurrency(
    adAnalytics.metrics.avito.revenue +
    adAnalytics.metrics.yandex.revenue +
    adAnalytics.metrics.other.revenue
  )}</p>

  <p>Общая чистая прибыль (с учётом прочих расходов): {formatCurrency(totalMetrics.netProfit)}</p>

  <p>Прочие расходы (дневные): {formatCurrency(adAnalytics.otherSpendTotal)}</p>

  <p>ROI (общий): {Math.round(totalMetrics.businessROI * 100) / 100} %</p>
  <p>ROMI (общий): {Math.round(totalMetrics.ROMI * 100) / 100} %</p>
</div>
    </div>
  );
};

export default AdAnalytics;

// import React, { useEffect, useState } from "react";
// import { fetchAdAnalytics } from "../../api/adAnalyticsApi";
// import type { ISODateString } from "../../types/ISODateString";
// import MetricCard from "./MetricCard";
// import type { Metric } from "./MetricCard";
// import type { AnalyticsResponse } from "../../types/analyticsResponse";

// // =============================
// // 🔹 Основной компонент props
// // =============================
// interface AdAnalyticsProps {
//   startDate: ISODateString;
//   endDate: ISODateString;
// }

// // =============================
// // 🔹 Дебаунс-хук (без изменений)
// // =============================
// const useDebounce = <T,>(value: T, delay: number): T => {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debouncedValue;
// };

// // =============================
// // 🔹 Основной компонент 
// // =============================
// const AdAnalytics: React.FC<AdAnalyticsProps> = ({ startDate, endDate }) => {
//   const [adAnalytics, setAdAnalytics] = useState<AnalyticsResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const debouncedStart = useDebounce(startDate, 500);
//   const debouncedEnd = useDebounce(endDate, 500);

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     setError(null);

//     fetchAdAnalytics(debouncedStart, debouncedEnd)
//       .then((data: AnalyticsResponse) => {
//         if (isMounted) setAdAnalytics(data);
//       })
//       .catch((err) => {
//         if (isMounted) setError(err);
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [debouncedStart, debouncedEnd]);

//   if (error) return <div className="text-center text-red-600 font-medium">Ошибка загрузки: {error.message}</div>;
//   if (loading) return <p className="text-center">Загрузка данных...</p>;
//   if (!adAnalytics) return <p className="text-center">Данных нет или не загрузились</p>;

//   // =============================
//   // 🔹 Преобразуем метрики в массив
//   // =============================
//   const adAnalyticsArray: Metric[] = Object.entries(adAnalytics.metrics).map(([key, value]) => ({
//     name: key,
//     adSpend: value.adSpend ?? 0,
//     cogs: value.cogs ?? 0,
//     revenue: value.revenue ?? 0,
//     grossProfit: value.grossProfit ?? 0,
//     netProfit: value.netProfit ?? 0,
//     businessROI: value.businessROI ?? 0,
//     adROI: value.adROI ?? 0,
//     ROMI: value.ROMI ?? 0,
//     leadExpense: value.leadExpense ?? 0,
//   }));

//   const totalRevenue = Object.entries(adAnalytics.metrics)
//     .filter(([key]) => key !== "avitoYandexTotal")
//     .reduce((sum, [, metric]) => sum + (metric.revenue || 0), 0);

//   const totalNetProfit = Object.entries(adAnalytics.metrics)
//     .filter(([key]) => key !== "avitoYandexTotal")
//     .reduce((sum, [, metric]) => sum + (metric.netProfit || 0), 0);

//   const totalOtherSpend = adAnalytics.otherSpendTotal ?? 0;

//   const formatCurrency = (value: number) =>
//     new Intl.NumberFormat("ru-RU", {
//       style: "currency",
//       currency: "RUB",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);

//   return (
//     <div>
//       <div className="flex flex-wrap justify-center gap-4">
//         {adAnalyticsArray.map((metric) => (
//           <MetricCard key={metric.name} metric={metric} />
//         ))}
//       </div>
//       <div className="mt-4 text-center font-semibold">
//         Общая выручка: {formatCurrency(totalRevenue)} <br />
//         Общая чистая прибыль: {formatCurrency(totalNetProfit)} <br />
//         Прочие расходы (дневные): {formatCurrency(totalOtherSpend)}
//       </div>
//     </div>
//   );
// };

// export default AdAnalytics;
