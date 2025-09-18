import { useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { numberKeys, parseValue } from "../../utils/utils";
import SubmitButton from "../submitButton/SubmitButton";
import type { DailyMeta } from "../../types/interface";

const FormData = () => {
  const { state, dispatch } = useGlobalContext();

  const [dataForm, setDataForm] = useState<DailyMeta>({
    date: "",
    yandexSpend: 0,
    avitoSpend: 0,
    adSpend: 0,
    otherSpend: 0,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDataForm((prev) => {
      const updated = {
        ...prev,
        [name]: parseValue(name as keyof DailyMeta, value, numberKeys),
      };

      // Автоматически пересчитываем adSpend как сумму Яндекс + Авито
      updated.adSpend = updated.yandexSpend + updated.avitoSpend;
      return updated;
    });
  };

  const handleAddData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch({ type: "ADD_EXPENSE", payload: { date: dataForm.date, meta: dataForm } });

    setDataForm({
      date: "",
      yandexSpend: 0,
      avitoSpend: 0,
      adSpend: 0,
      otherSpend: 0,
    });
  };

  return (
    <form
      action=""
      method="POST"
      // className="flex flex-col items-center px-5 pt-3 pb-8 mx-5 gap-3 bg-formСolor rounded-3xl bg-opacity-95 shadow-2xl w-full max-w-4xl md:ml-8"
      className="flex flex-col items-center px-5 pt-3 pb-8 mb-10 gap-3 mx-5 rounded-3xl bg-opacity-95 bg-formСolor shadow-2xl"
    >
      <h1 className="text-3xl font-bold mb-5">Затраты за день</h1>

      {/* Дата */}
      <div className="w-full mb-4">
        <label htmlFor="date">Дата:</label>
        <input
          onChange={handleFormChange}
          value={dataForm.date}
          name="date"
          id="date"
          type="date"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      {/* Яндекс */}
      <div className="w-full mb-4">
        <label htmlFor="yandexSpend">Затраты на рекламу (Яндекс):</label>
        <input
          onChange={handleFormChange}
          value={dataForm.yandexSpend}
          name="yandexSpend"
          id="yandexSpend"
          type="number"
          placeholder="₽"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      {/* Авито */}
      <div className="w-full mb-4">
        <label htmlFor="avitoSpend">Затраты на рекламу (Авито):</label>
        <input
          onChange={handleFormChange}
          value={dataForm.avitoSpend}
          name="avitoSpend"
          id="avitoSpend"
          type="number"
          placeholder="₽"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      {/* Итог рекламы (readonly) */}
      <div className="w-full mb-4">
        <label htmlFor="adSpend">Всего затраты на рекламу:</label>
        <input
          readOnly
          value={dataForm.adSpend}
          name="adSpend"
          id="adSpend"
          type="number"
          className="border h-8 border-gray-400 p-2 w-full bg-gray-200"
        />
      </div>

      {/* Прочие расходы */}
      <div className="w-full mb-4">
        <label htmlFor="otherSpend">Прочие расходы:</label>
        <input
          onChange={handleFormChange}
          value={dataForm.otherSpend}
          name="otherSpend"
          id="otherSpend"
          type="number"
          placeholder="₽"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      <SubmitButton handle={handleAddData} />
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("StateEEE", state);
        }}
      >
        state
      </button>
    </form>
  );
};

export default FormData;
