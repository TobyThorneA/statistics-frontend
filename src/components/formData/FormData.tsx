import axios from "axios";
import { useState } from "react";
import { numberKeys, parseValue } from "../../utils/utils";
import SubmitButton from "../submitButton/SubmitButton";
import type { DailyMeta } from "../../types/interface";

const FormData = () => {
  const [dataForm, setDataForm] = useState<DailyMeta>({
    date: "",
    yandexSpend: 0,
    avitoSpend: 0,
    adSpend: 0,
    otherSpend: 0,
    purchaseCost: 0,
    totalSpend: 0,
  });

  const [errorDateExists, setErrorDateExists] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDataForm((prev) => {
      const updated = {
        ...prev,
        [name]: parseValue(name as keyof DailyMeta, value, numberKeys),
      };
      updated.adSpend = updated.yandexSpend + updated.avitoSpend;
      return updated;
    });

    if (name === "date") {
      setErrorDateExists(false);
      setGeneralError(null);
    }
  };

  const handleAddData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://statistics-api.myata-flowers.ru/api/dailyMeta",
        dataForm
      );
      console.log("Успешно сохранено:", res.data);

      setDataForm({
        date: "",
        yandexSpend: 0,
        avitoSpend: 0,
        adSpend: 0,
        otherSpend: 0,
        purchaseCost: 0,
        totalSpend: 0,
      });
      setErrorDateExists(false);
      setGeneralError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorDateExists(true);
        setGeneralError(null);
      } else {
        setGeneralError("Ошибка при сохранении: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <form className="flex flex-col items-center px-5 pt-3 pb-8 mb-10 gap-3 mx-5 rounded-3xl bg-opacity-95 bg-formСolor shadow-2xl">
      <h1 className="text-3xl font-bold mb-5">Затраты за день</h1>

      {/* Дата */}
      <div className="w-full mb-4">
        <label htmlFor="date">Дата:</label>
        <input
          onChange={handleFormChange}
          value={dataForm.date ?? ""}
          name="date"
          id="date"
          type="date"
          className={`border h-8 p-2 w-full ${
            errorDateExists ? "border-red-500 bg-red-100" : "border-gray-400 bg-inputColor"
          }`}
        />
        {errorDateExists && (
          <p className="text-red-600 text-sm mt-1">
            Данные на эту дату уже введены. Выберите другую дату.
          </p>
        )}
      </div>

      {/* Яндекс */}
      <div className="w-full mb-4">
        <label htmlFor="yandexSpend">Затраты на рекламу (Яндекс):</label>
        <input
          onChange={handleFormChange}
          value={dataForm.yandexSpend ?? 0}
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
          value={dataForm.avitoSpend ?? 0}
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
          value={dataForm.adSpend ?? 0}
          name="adSpend"
          id="adSpend"
          type="text"
          className="border h-8 border-gray-400 p-2 w-full bg-gray-200"
        />
      </div>

      {/* Расход на закуп */}
      <div className="w-full mb-4">
        <label htmlFor="purchaseCost">Расход на закупку:</label>
        <input
          onChange={handleFormChange}
          value={dataForm.purchaseCost ?? 0}
          name="purchaseCost"
          id="purchaseCost"
          type="number"
          placeholder="₽"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      {/* Прочие расходы */}
      <div className="w-full mb-4">
        <label htmlFor="otherSpend">Прочие расходы:</label>
        <input
          onChange={handleFormChange}
          value={dataForm.otherSpend ?? 0}
          name="otherSpend"
          id="otherSpend"
          type="number"
          placeholder="₽"
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      </div>

      {generalError && (
        <p className="text-red-600 text-sm mt-2">{generalError}</p>
      )}

      <SubmitButton handle={handleAddData} />
    </form>
  );
};

export default FormData;


