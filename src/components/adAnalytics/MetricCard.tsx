// // src/components/adAnalytics/MetricCard.tsx
import React, { memo } from "react";
import MetricRow from "./MetricRow";

export interface Metric {
  name: string;
  adSpend: number;
  leadExpense: number;
  cogs: number;         // себестоимость
  revenue: number;
  grossProfit: number;
  netProfit: number;
  businessROI: number;
  adROI: number;
  ROMI: number;
}

interface MetricProps {
  metric: Metric;
}

const MetricCardComponent: React.FC<MetricProps> = ({ metric }) => {
  const metricRows = [
    { label: "Расходы на рекламу", value: metric.adSpend, suffix: "₽" },
    { label: "Расходы по лидам", value: metric.leadExpense, suffix: "₽" },
    { label: "Себестоимость", value: metric.cogs, suffix: "₽" },
    { label: "Выручка", value: metric.revenue, suffix: "₽" },
    { label: "Валовая прибыль", value: metric.grossProfit, suffix: "₽" },
    { label: "Чистая прибыль", value: metric.netProfit, suffix: "₽" },
    { label: "ROI (бизнес)", value: metric.businessROI, suffix: "%" },
    { label: "ROI (рекламный)", value: metric.adROI, suffix: "%" },
    { label: "ROMI", value: metric.ROMI, suffix: "%" },
  ];

  return (
    <div className="w-full sm:w-56 bg-yellow-50 rounded-lg shadow p-4 flex flex-col gap-2 md:mt-5">
      <h3 className="text-center text-xl sm:text-lg font-bold mb-2">{metric.name}</h3>
      {metricRows.map((row) => (
        <MetricRow key={row.label} {...row} />
      ))}
    </div>
  );
};

// Сравнение props для memo
const areEqual = (prevProps: MetricProps, nextProps: MetricProps) =>
  Object.keys(prevProps.metric).every(
    (key) => prevProps.metric[key as keyof Metric] === nextProps.metric[key as keyof Metric]
  );

export default memo(MetricCardComponent, areEqual);

// import React, { memo } from "react";
// import MetricRow from "./MetricRow";

// export interface Metric {
//   name: string,
//   adSpend: number,
//   cogs: number,
//   revenue: number,
//   grossProfit: number,
//   netProfit: number,
//   businessROI: number,
//   adROI: number,
//   ROMI: number,
// }

// interface MetricProps {
//   metric: Metric;
// }

// const MetricCardComponent: React.FC<MetricProps> = ({ metric }) => {
//   const metricRows = [
//     { label: "Расходы на рекламу", value: metric.adSpend, suffix: "₽" },
//     { label: "Себестоимость", value: metric.cogs, suffix: "₽" },
//     { label: "Выручка", value: metric.revenue, suffix: "₽" },
//     { label: "Прибыль", value: metric.netProfit, suffix: "₽" },
//     { label: "ROI (бизнес)", value: metric.businessROI, suffix: "%" },
//     { label: "ROI (рекламный)", value: metric.adROI, suffix: "%" },
//     { label: "ROMI (рекламный)", value: metric.ROMI, suffix: "%" },
//   ];

//   return (
//     <div className="w-full sm:w-56 bg-yellow-50 rounded-lg shadow p-4 flex flex-col gap-2 md:mt-5">
//       <h3 className="text-center text-xl sm:text-lg font-bold mb-2">{metric.name}</h3>
//       {metricRows.map((row) => (
//         <MetricRow key={row.label} label={row.label} value={Math.round(row.value * 100) / 100} suffix={row.suffix} />
//       ))}
//     </div>
//   );
// };

// // сравнение props
// const areEqual = (prevProps: MetricProps, nextProps: MetricProps) =>
//   Object.keys(prevProps.metric).every((key) => prevProps.metric[key as keyof Metric] === nextProps.metric[key as keyof Metric]);

// export default memo(MetricCardComponent, areEqual);
