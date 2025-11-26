// src/api/adAnalyticsApi.ts
import { api } from ".";
import type { AnalyticsResponse } from "../types/analyticsResponse";
import type { ISODateString } from "../types/ISODateString";



export const fetchAdAnalytics = async (
  startDate: ISODateString,
  endDate: ISODateString
): Promise<AnalyticsResponse> => {
  try {
    const res = await api.get(`/reports?startDate=${startDate}&endDate=${endDate}`);
    if (!res.data) throw new Error("Пустой ответ от сервера");
    return res.data;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Ошибка при получении аналитики");
  }
};
