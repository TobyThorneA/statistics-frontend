// src/components/adAnalytics/MetricRow.tsx
import React from "react";

interface MetricRowProps {
  label: string;
  value: number | string;
  suffix?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value, suffix }) => (
  <div className="flex justify-between border border-gray-200 rounded px-2 py-1 bg-white whitespace-nowrap">
    <span className="text-sm sm:text-xs font-medium">{label}</span>
    <span className="text-sm sm:text-xs font-semibold">
      {Math.round(Number(value) * 100) / 100} {suffix || ""}
    </span>
  </div>
);

export default MetricRow;

// import React from "react";

// interface MetricRowProps {
//   label: string;
//   value: string | number;
//   suffix: string;
// }

// const MetricRow: React.FC<MetricRowProps> = ({ label, value, suffix }) => (
//   <div className="flex justify-between border border-gray-200 rounded px-2 py-1 bg-white whitespace-nowrap">
//     <span className="text-sm sm:text-xs font-medium">{label}</span>
//     <span className="text-sm sm:text-xs font-semibold">{value} {suffix}</span>
//   </div>
// );

// export default MetricRow;
