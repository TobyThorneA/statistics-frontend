// Отдельный тип для финансовых метрик
export interface MetricBlock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  revenue: number;         // выручка
  cogs: number;            // себестоимость
  grossProfit: number;     // валовая прибыль
  netProfit: number;       // чистая прибыль
  adSpend: number;         // расходы на рекламу
  leadExpense: number;     // расходы по лидам
  businessROI: number;     // ROI (бизнес)
  adROI: number;           // ROI (рекламный)
  ROMI: number;            // ROMI (окупаемость рекламы)
}

// Основной ответ от API
export interface AnalyticsResponse {
  period: {
    startDate: string; // формат YYYY-MM-DD
    endDate: string;
  };
  metrics: {
    total: MetricBlock;
    avito: MetricBlock;
    yandex: MetricBlock;
    avitoYandexTotal: MetricBlock;
    other: MetricBlock;
  };
  otherSpendTotal: number; // сумма "прочих" дневных расходов
}
