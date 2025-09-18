export type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type CombinedTypeNumbers = Lead;

export type AllNumberKeys = NumberKeys<CombinedTypeNumbers>;
// export type AllNumberKeys = NumberKeys<Expenses> | NumberKeys<Lead>

export type Action =
  | { type: 'ADD_DAY'; payload: DailyData }
  | { type: 'ADD_LEAD', payload: { date: string; lead: Lead } }
  // | { type: 'ADD_LEAD'; payload: { date: string; lead: Lead } }
  | { type: 'ADD_EXPENSE'; payload: { date: string; meta: DailyMeta } }
 | { type: 'SET_LEADS'; payload: { date: string; leads: Lead[] } }
  // | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'SET_EXPENSES'; payload: DailyMeta };


// export type Action =
//   | { type: 'SET_LEADS', payload: Lead[] }
//   | { type: 'ADD_LEAD', payload: Lead }
//   | { type: 'SET_EXPENSES', payload: DailyMeta }
//   | { type: 'ADD_EXPENSE', payload: DailyMeta };

  // ///////////////////////............................................................................

export type LeadStatus = "новый" |"оплачен" | "не оплачен" | "предоплата" | "отказ";
export type completionStatus = "не начат" | "в работе" | "на доставке" | "доставлен";

export interface Lead {
  orderDate: string;         // Дата заказа
  shippingDate: string;      // Дата отгрузки
  deliveryTime: string;      // Время доставки
  source: string;            // Источник лида
  customerName: string;      // Имя заказчика
  customerPhone: string;     // Телефон заказчика
  recipientName: string;     // Имя получателя
  recipientPhone: string;    // Телефон получателя
  event: string;             // Событие (др, свадьба)
  orderNote: string;         // Примечание к заказу
  orderStructure: string;    // Состав заказа
  deliveryAddress: string;   // Адрес доставки
  salePrice: number;         // Цена продажи
  deliveryCost: number;      // Стоимость доставки
  bouquetCost: number;       // Себестоимость букета
  purchasePrice: number;     // Закупочная цена
  extraExpenses: number;     // Прочие расходы
  paymentStatus: string;     // Статус оплаты
  completionStatus: string;  // Статус выполнения
}

export interface DailyMeta {
  date: string;           // Дата отчёта (YYYY-MM-DD)
  yandexSpend: number;    // Затраты на рекламу в Яндекс
  avitoSpend: number;     // Затраты на рекламу в Авито
  adSpend: number;        // Общие затраты на рекламу (может считаться = yandexSpend + avitoSpend)
  otherSpend: number;     // Прочие затраты (логистика, сервисы и т.п.)
}

export interface DailyData {
  date: string; // YYYY-MM-DD
  leads: Lead[];
  meta: DailyMeta;
}

// export interface State {
//   // map(arg0: (day: any) => any): State;
//   date: string; // YYYY-MM-DD
//   leads: Lead[],
//   meta: DailyMeta,
// }

export type FullAnalyticsData = DailyData[];
