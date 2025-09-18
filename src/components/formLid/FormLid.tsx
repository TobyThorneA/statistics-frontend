import { useState } from "react";
// import useGlobalContext from "../../hooks/useGlobalContext";
import type { Lead } from "../../types/interface";
import { numberKeys, parseValue } from "../../utils/utils";
import SubmitButton from "../submitButton/SubmitButton";
import { validateInputDate } from "../../utils/validateInputDate";
import { sections } from "./sectionsConfig";
import axios from "axios";

const FormLid = () => {
  // const { state, dispatch } = useGlobalContext();

  const [leadForm, setLeadForm] = useState<Lead>({
    orderDate: "",
    shippingDate: "",
    deliveryTime: "",
    source: "",
    customerName: "",
    customerPhone: "",
    recipientName: "",
    recipientPhone: "",
    event: "",
    orderNote: "",
    orderStructure: "",
    deliveryAddress: "",
    salePrice: 0,
    deliveryCost: 0,
    bouquetCost: 0,
    purchasePrice: 0,
    extraExpenses: 0,
    paymentStatus: "не оплачен",
    completionStatus: "не начат",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const input = validateInputDate({ name, value });
    setLeadForm((prev) => ({
      ...prev,
      [name]: parseValue(name as keyof Lead, input, numberKeys),
    }));
  };

  const handleSelectFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



// const handleAddLead = async (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post("http://localhost:5000/api/leads", leadForm);
//     console.log("Лид создан:", response.data);

//     // если хочешь сразу создавать финансы на основе лида:
//     await axios.post("http://localhost:5000/api/finance", {
//       leadId: response.data._id,
//       salePrice: leadForm.salePrice,
//       deliveryCost: leadForm.deliveryCost,
//       bouquetCost: leadForm.bouquetCost,
//       purchasePrice: leadForm.purchasePrice,
//       extraExpenses: leadForm.extraExpenses,
//       profit:
//         leadForm.salePrice -
//         (leadForm.deliveryCost +
//           leadForm.bouquetCost +
//           leadForm.purchasePrice +
//           leadForm.extraExpenses),
//       date: leadForm.orderDate,
//     });

//     // если хочешь создавать юзера (например заказчика):
//     await axios.post("http://localhost:5000/api/users", {
//       name: leadForm.customerName,
//       phone: leadForm.customerPhone, // можно сгенерить
//       // password: "default123", // временно, позже сделаем норм
//       // role: "viewer",
//     });

//     alert("Лид, финансы и пользователь успешно созданы ✅");

//     // очистка формы
//     setLeadForm({
//       orderDate: "",
//       shippingDate: "",
//       deliveryTime: "",
//       source: "",
//       customerName: "",
//       customerPhone: "",
//       recipientName: "",
//       recipientPhone: "",
//       event: "",
//       orderNote: "",
//       orderStructure: "",
//       deliveryAddress: "",
//       salePrice: 0,
//       deliveryCost: 0,
//       bouquetCost: 0,
//       purchasePrice: 0,
//       extraExpenses: 0,
//       paymentStatus: "не оплачен",
//       completionStatus: "не начат",
//     });
//   } catch (error) {
//     console.error("Ошибка при создании лида:", error);
//     alert("Не удалось создать лид 😢");
//   }
// };


const handleAddLead = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  try {
    // Формируем объект для AllData
    const allDataPayload = {
      user: {
        name: leadForm.customerName,
        phone: leadForm.customerPhone,
      },
      lead: {
        orderDate: leadForm.orderDate,
        shippingDate: leadForm.shippingDate,
        deliveryTime: leadForm.deliveryTime,
        source: leadForm.source,
        customerName: leadForm.customerName,
        customerPhone: leadForm.customerPhone,
        recipientName: leadForm.recipientName,
        recipientPhone: leadForm.recipientPhone,
        deliveryAddress: leadForm.deliveryAddress,
        event: leadForm.event,
        orderStructure: leadForm.orderStructure,
        orderNote: leadForm.orderNote,
        salePrice: leadForm.salePrice,
        deliveryCost: leadForm.deliveryCost,
        bouquetCost: leadForm.bouquetCost,
        purchasePrice: leadForm.purchasePrice,
        extraExpenses: leadForm.extraExpenses,
        paymentStatus: leadForm.paymentStatus,
        completionStatus: leadForm.completionStatus,
      },
      finance: {
        salePrice: leadForm.salePrice,
        deliveryCost: leadForm.deliveryCost,
        bouquetCost: leadForm.bouquetCost,
        purchasePrice: leadForm.purchasePrice,
        extraExpenses: leadForm.extraExpenses,
        profit:
          leadForm.salePrice -
          (leadForm.deliveryCost +
            leadForm.bouquetCost +
            leadForm.purchasePrice +
            leadForm.extraExpenses),
        date: leadForm.orderDate,
      },
    };

    const response = await axios.post(
      "http://localhost:5000/api/allData",
      allDataPayload
    );

    console.log("Все данные созданы:", response.data);
    alert("Лид, финансы и пользователь успешно созданы ✅");

    // очистка формы
    setLeadForm({
      orderDate: "",
      shippingDate: "",
      deliveryTime: "",
      source: "",
      customerName: "",
      customerPhone: "",
      recipientName: "",
      recipientPhone: "",
      event: "",
      orderNote: "",
      orderStructure: "",
      deliveryAddress: "",
      salePrice: 0,
      deliveryCost: 0,
      bouquetCost: 0,
      purchasePrice: 0,
      extraExpenses: 0,
      paymentStatus: "не оплачен",
      completionStatus: "не начат",
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
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
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

export default FormLid;
