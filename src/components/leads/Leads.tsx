// src/components/leads
import { useState } from "react";
import { updateLeadData } from "../../api/allDataApi";
import type { LeadWrapper, Lead, Finance } from "../../types/interface";
import { formatDateDDMMYYYY } from "../../utils/formatDateDDMMYYYY";

interface LeadsProps {
  leads: LeadWrapper[];
  loading: boolean;
  fetchLeads: () => Promise<void>; // функция для повторного запроса данных
}

const PAYMENT_OPTIONS = [
  { value: "Ждет оплату", label: "Ждет оплату" },
  { value: "Предоплата", label: "Предоплата" },
  { value: "Оплачен", label: "Оплачен" },
  { value: "Отказ", label: "Отказ" },
];

const COMPLETION_OPTIONS = [
  { value: "Ожидает сборки", label: "Ожидает сборки" },
  { value: "В работе", label: "В работе" },
  { value: "Выполнен", label: "Выполнен" },
];

const FIELD_LABELS: Record<keyof Lead | keyof Finance, string> = {
  // Lead
  _id: "ID",
  orderDate: "Дата заказа",
  shippingDate: "Дата отправки",
  deliveryTime: "Время доставки",
  source: "Источник заказа",
  adSource: "Источник рекламы",
  customerName: "Заказчик",
  customerPhone: "Телефон заказчика",
  recipientName: "Получатель",
  recipientPhone: "Телефон получателя",
  event: "Событие",
  orderNote: "Комментарий",
  orderStructure: "Состав заказа",
  deliveryAddress: "Адрес доставки",
  paymentStatus: "Статус оплаты",
  completionStatus: "Статус выполнения",
  profit: "Прибыль",
  // Finance
  leadId: "ID лида",
  date: "Дата",
  salePrice: "Стоимость букета",
  deliveryIncome: "Стоимость доставки(клиент)",
  bouquetCost: "Себестоимость букета",
  deliveryExpense: "Доставка(курьер)",
  extraExpenses: "Прочие расходы",
};

const Leads: React.FC<LeadsProps> = ({ leads: initialLeads, loading, fetchLeads }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editedLead, setEditedLead] = useState<{ lead: Lead; finance: Finance } | null>(null);

  const handleEditClick = (leadWrapper: LeadWrapper) => {
    setEditId(leadWrapper._id);
    setEditedLead({
      lead: { ...leadWrapper.lead },
      finance: { ...leadWrapper.finance },
    });
  };

  const handleChange = <Section extends "lead" | "finance">(
    section: Section,
    field: Section extends "lead" ? keyof Lead : keyof Finance,
    value: Section extends "lead" ? Lead[keyof Lead] : Finance[keyof Finance]
  ) => {
    if (!editedLead) return;

    setEditedLead({
      ...editedLead,
      [section]: {
        ...editedLead[section],
        [field]: value,
      },
    });
  };

  const handleSave = async (id: string, data: { lead: Lead; finance: Finance }) => {
    try {
      await updateLeadData(id, data);
      setEditId(null);
      setEditedLead(null);
      await fetchLeads(); // подтягиваем актуальные данные с бэка
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!initialLeads.length) return <div>Данных пока нет</div>;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {initialLeads.map((leadWrapper) => {
        const { _id, lead, finance } = leadWrapper;
        const isEditing = editId === _id;
        const currentLead = isEditing && editedLead ? editedLead.lead : lead;
        const currentFinance = isEditing && editedLead ? editedLead.finance : finance;

        return (
          <div key={_id} className="p-4 rounded-xl bg-white shadow">
            {/* Lead */}
            {Object.entries(currentLead).map(([key, value]) => {
              if (key === "_id") return null;

              if (key === "paymentStatus") {
                return (
                  <p key={key}>
                    <b>{FIELD_LABELS[key as keyof Lead]}:</b>{" "}
                    {isEditing ? (
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={value ?? ""}
                        onChange={(e) => handleChange("lead", key as keyof Lead, e.target.value)}
                      >
                        {PAYMENT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      value
                    )}
                  </p>
                );
              }

              if (key === "completionStatus") {
                return (
                  <p key={key}>
                    <b>{FIELD_LABELS[key as keyof Lead]}:</b>{" "}
                    {isEditing ? (
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={value ?? ""}
                        onChange={(e) => handleChange("lead", key as keyof Lead, e.target.value)}
                      >
                        {COMPLETION_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      value
                    )}
                  </p>
                );
              }

              return (
                <p key={key}>
                  <b>{FIELD_LABELS[key as keyof Lead]}:</b>{" "}
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={value ?? ""}
                      onChange={(e) => handleChange("lead", key as keyof Lead, e.target.value)}
                    />
                  ) : (
                    // если это поле с датой
                    (key === "orderDate" || key === "shippingDate")
                      ? formatDateDDMMYYYY(value)
                      : value?.toString()
                    )}
                </p>
              );
            })}

            <hr className="my-2" />

            {/* Finance */}
            {Object.entries(currentFinance)
              // Показываем только те поля, что есть в FIELD_LABELS
            .filter(([key]) => key in FIELD_LABELS)
            .map(([key, value]) => (
              <p key={key}>
                <b>{FIELD_LABELS[key as keyof Finance]}:</b>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={value ?? 0}
                    onChange={(e) => handleChange("finance", key as keyof Finance, Number(e.target.value))}
                  />
                ) : (
                  value
                )}
              </p>
            ))}

            {/* Кнопки */}
            <div className="flex gap-2 mt-3">
              {!isEditing ? (
                <button
                  onClick={() => handleEditClick(leadWrapper)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Редактировать
                </button>
              ) : (
                <>
                  <button
                    onClick={() => editedLead && editId && handleSave(editId, editedLead)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Отмена
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Leads;
