// src/utils/checkData.ts
export const safeValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("ru-RU");
};