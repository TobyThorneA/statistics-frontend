import type { Lead } from "../../types/interface";

export type FieldType = "text" | "number" | "tel" | "textarea" | "select";

export interface FieldConfig {
  label: string;
  name: keyof Lead;
  placeholder?: string;
  type?: FieldType;
  options?: { label: string; value: string }[]; // для select
}

export interface SectionConfig {
  label: string;
  role?: string | string[]; // доступ по ролям
  fields: FieldConfig[];
}

export const sections: SectionConfig[] = [
  {
    label: "Даты и источник",
    fields: [
      { label: "Дата заказа", name: "orderDate", placeholder: "дд.мм.гггг" },
      { label: "Дата отгрузки", name: "shippingDate", placeholder: "дд.мм.гггг" },
      { label: "Время доставки", name: "deliveryTime", placeholder: "например 15:00–17:00" },
      { label: "Источник заказа", name: "source", placeholder: "Авито, сайт и т.п." },
    ],
  },
  {
    label: "Заказчик",
    fields: [
      { label: "Имя", name: "customerName", placeholder: "Имя заказчика" },
      { label: "Телефон", name: "customerPhone", type: "tel", placeholder: "Телефон заказчика" },
    ],
  },
  {
    label: "Получатель",
    fields: [
      { label: "Имя", name: "recipientName", placeholder: "Имя получателя" },
      { label: "Телефон", name: "recipientPhone", type: "tel", placeholder: "Телефон получателя" },
      { label: "Адрес доставки", name: "deliveryAddress", placeholder: "ул. Примерная, д. 1" },
    ],
  },
  {
    label: "Информация о заказе",
    fields: [
      { label: "Событие", name: "event", placeholder: "др, свадьба и т.д." },
      { label: "Состав заказа", name: "orderStructure", placeholder: "например: букет из 11 роз" },
      { label: "Примечание", name: "orderNote", type: "textarea", placeholder: "Доп. пожелания" },
    ],
  },
  {
    label: "Финансы",
    role: "admin", // 👈 видно только админам
    fields: [
      { label: "цена букета", name: "salePrice", type: "number", placeholder: "цена букета ₽" },
      { label: "Стоимость доставки для клиента", name: "deliveryCost", type: "number", placeholder: "например: 500 ₽" },
      { label: "Себестоимость букета", name: "bouquetCost", type: "number", placeholder: "себестоимость ₽" },
      { label: "Стоимость доставки курьером", name: "purchasePrice", type: "number", placeholder: "например: 200 ₽" },
      { label: "Прочие расходы", name: "extraExpenses", type: "number", placeholder: "прочие ₽" },
    ],
  },
  {
    label: "Статусы",
    fields: [
      {
        label: "Статус оплаты",
        name: "paymentStatus",
        type: "select",
        options: [
          { value: "новый", label: "Пришёл (новая заявка)" },
          { value: "не оплачен", label: "Оформлен, но не оплачен" },
          { value: "предоплата", label: "Предоплата" },
          { value: "оплачен", label: "Полностью оплачен" },
          { value: "отказ", label: "Отказ" },
        ],
      },
      {
        label: "Статус выполнения",
        name: "completionStatus",
        type: "select",
        options: [
          { value: "новый", label: "Не выполнен" },
          { value: "в процессе", label: "В процессе" },
          { value: "выполнен", label: "Выполнен" },
        ],
      },
    ],
  },
];
