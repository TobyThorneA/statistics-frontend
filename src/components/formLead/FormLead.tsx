// src/components/formLead/FormLead.tsx
import { useState } from "react";
import type { Lead } from "../../types/interface";
import { numberKeys, parseValue } from "../../utils/utils";
import SubmitButton from "../submitButton/SubmitButton";
import { sections } from "./sectionsConfig";
import PhoneInput from "../formLead/PhoneInput";
import axios from "axios";

const FormLead = () => {
  const [leadForm, setLeadForm] = useState<Lead>({
    orderDate: "",
    shippingDate: "",
    deliveryTime: "",
    source: "",
    adSource: "none",
    customerName: "",
    customerPhone: "",
    recipientName: "",
    recipientPhone: "",
    event: "",
    orderNote: "",
    orderStructure: "",
    deliveryAddress: "",
    salePrice: "",
    deliveryIncome: "",
    bouquetCost: "",
    deliveryExpense: "",
    extraExpenses: "",
    paymentStatus: "не оплачен",
    completionStatus: "не начат",
    profit: 0,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value, type } = e.target;

    const key = name as keyof Lead;

    if (type === "date") {
      // браузер сам отдаёт YYYY-MM-DD
      setLeadForm((prev) => ({
        ...prev,
        [key]: value, // уже ISO
      }));
    } else if (numberKeys.includes(key)) {
      // проверяем число
      if (value === "" || !isNaN(Number(value))) {
        setLeadForm((prev) => ({
          ...prev,
          [key]: value === "" ? "" : parseFloat(value),
        }));
      }
    } else {
      setLeadForm((prev) => ({
        ...prev,
        [key]: parseValue(key, value, numberKeys),
      }));
    }
  };

  const handleSelectFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddLead = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const toNum = (val: string | number) => (val === "" ? 0 : Number(val));

    try {
      const allDataPayload = {
        user: {
          name: leadForm.customerName,
          phone: leadForm.customerPhone,
        },
        lead: {
          ...leadForm,
        },
        finance: {
          salePrice: leadForm.salePrice,
          deliveryIncome: leadForm.deliveryIncome,
          bouquetCost: leadForm.bouquetCost,
          deliveryExpense: leadForm.deliveryExpense,
          extraExpenses: leadForm.extraExpenses,
          profit: leadForm.profit,
          date: leadForm.orderDate, // ISO
        },
      };

      const response = await axios.post(
        "https://statistics-api.myata-flowers.ru/api/allData",
        allDataPayload
      );

      console.log("Все данные созданы:", response.data);
      alert("Лид, финансы и пользователь успешно созданы ✅");

      setLeadForm({
        orderDate: "",
        shippingDate: "",
        deliveryTime: "",
        source: "",
        adSource: "none",
        customerName: "",
        customerPhone: "",
        recipientName: "",
        recipientPhone: "",
        event: "",
        orderNote: "",
        orderStructure: "",
        deliveryAddress: "",
        salePrice: "",
        deliveryIncome: "",
        bouquetCost: "",
        deliveryExpense: "",
        extraExpenses: "",
        paymentStatus: "не оплачен",
        completionStatus: "не начат",
        profit: 0,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Ошибка при создании данных:", error.response?.data || error);
      alert("Не удалось создать данные 😢");
    }
  };

  return (
    <form className="flex flex-col items-center px-4 pt-3 pb-6 mb-6 gap-2 mx-4 rounded-2xl bg-opacity-95 bg-formСolor shadow-xl">
      <h1 className="text-2xl font-bold mb-3">Данные заказа</h1>

      {sections.map((section) => (
        <div key={section.label} className="w-full mb-4">
          <h2 className="text-lg font-semibold mt-2 mb-1">{section.label}</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            {section.fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}:</label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={leadForm[field.name as keyof Lead] as string}
                    onChange={handleFormChange}
                    className="border border-gray-400 p-2 w-full bg-inputColor"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={leadForm[field.name as keyof Lead] as string}
                    onChange={handleSelectFormChange}
                    className="border h-8 border-gray-400 w-full bg-inputColor"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "tel" ? (
                  <PhoneInput
                    name={field.name}
                    value={leadForm[field.name as keyof Lead] as string}
                    onChange={handleFormChange}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={
                      field.type === "number"
                        ? "text"
                        : field.type || "text"
                    }
                    inputMode={field.type === "number" ? "decimal" : undefined}
                    placeholder={field.placeholder}
                    value={leadForm[field.name as keyof Lead] as string | number}
                    onChange={handleFormChange}
                    className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <SubmitButton handle={handleAddLead} />
    </form>
  );
};

export default FormLead;
