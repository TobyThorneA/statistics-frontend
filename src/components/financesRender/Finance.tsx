// src/components/financesRender/Finance.tsx
import axios from "axios";
import type { DailyMeta } from "../../types/interface";
import { useState } from "react";
import { api } from "../../api";
import type { ISODateString } from "../../types/ISODateString";

interface FinanceProps {
  startDate: ISODateString;
  endDate: ISODateString
}


const Finance: React.FC<FinanceProps> = ({ startDate, endDate }) => {

  const [dailyMeta, setDailyMeta] = useState<DailyMeta[]>([])
    
    const fetchDailyMetaAllData = async (dateStart : string, dateEnd : string) => {
    const data = await api.get(`https://statistics-api.myata-flowers.ru/api/dailyMeta/byDate?startDate=${dateStart}&endDate=${dateEnd}`)
    if(!data) return <div>Данных нет</div>
    setDailyMeta(data.data)
  }

  
  
  const handleDailyMetaChange = (idx: number, field: keyof DailyMeta, value: number | string) => {
    setDailyMeta(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };

      // Автоматически считаем суммы
      copy[idx].adSpend = (copy[idx].yandexSpend ?? 0) + (copy[idx].avitoSpend ?? 0);
      copy[idx].totalSpend = copy[idx].adSpend + ((copy[idx].purchaseCost ?? 0) + (copy[idx].otherSpend ?? 0));
      return copy;
    });
  };

    const handleUpdateDailyMeta = async (id: string, data: DailyMeta) => {
    try {
      const res = await axios.patch(`https://statistics-api.myata-flowers.ru/api/dailyMeta/${id}`, data);
      console.log("Обновлено:", res.data);
    } catch (err) {
      console.error("Ошибка обновления:", err);
    }
  };

  // if(dailyMeta.length === 0) return <div>НИХУЯ НЕТ =\</div>

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => fetchDailyMetaAllData(startDate, endDate)}>Показать данные</button>
        {dailyMeta.map((m, idx) => (
          <div
            key={m._id}
            className="p-1 rounded-lg shadow bg-yellow-50 text-xs w-56 space-y-1"
          >
            
            {/* Дата */}
            <div className="flex flex-col">
              <label className="mb-0.5">Дата:</label>
              <input
                type="date"
                value={m.date}
                onChange={(e) => handleDailyMetaChange(idx, "date", e.target.value)}
                className="border p-0.5 rounded w-full text-right text-xs"
              />
            </div>

            {/* Яндекс */}
            <div className="flex flex-col">
              <label className="mb-0.5">Яндекс (₽):</label>
              <input
                type="number"
                value={m.yandexSpend}
                onChange={(e) =>
                  handleDailyMetaChange(idx, "yandexSpend", e.target.valueAsNumber)
                }
                className="border p-0.5 rounded w-full text-right text-xs"
              />
            </div>

            {/* Авито */}
            <div className="flex flex-col">
              <label className="mb-0.5">Авито (₽):</label>
              <input
                type="number"
                value={m.avitoSpend}
                onChange={(e) =>
                  handleDailyMetaChange(idx, "avitoSpend", e.target.valueAsNumber)
                }
                className="border p-0.5 rounded w-full text-right text-xs"
              />
            </div>

            {/* Закупка */}
            <div className="flex flex-col">
              <label className="mb-0.5">Закупка (₽):</label>
              <input
                type="number"
                value={m.purchaseCost}
                onChange={(e) =>
                  handleDailyMetaChange(idx, "purchaseCost", e.target.valueAsNumber)
                }
                className="border p-0.5 rounded w-full text-right text-xs"
              />
            </div>

            {/* Прочие */}
            <div className="flex flex-col">
              <label className="mb-0.5">Прочие (₽):</label>
              <input
                type="number"
                value={m.otherSpend}
                onChange={(e) =>
                  handleDailyMetaChange(idx, "otherSpend", e.target.valueAsNumber)
                }
                className="border p-0.5 rounded w-full text-right text-xs"
              />
            </div>

            {/* Итоги */}
            <div className="flex flex-col mt-1 space-y-0.5 font-semibold">
              <span>Реклама всего: {m.adSpend.toLocaleString("ru-RU")} ₽</span>
              <span>Всего расходов: {m.totalSpend.toLocaleString("ru-RU")} ₽</span>
            </div>

            {/* Сохранить */}
            <button
              // onClick={() => handleUpdateDailyMeta(m._id, dailyMeta[idx])}
              // className="w-full mt-1 px-1 py-0.5 bg-blue-500 text-white text-xs rounded"
              onClick={() => m._id && handleUpdateDailyMeta(m._id, dailyMeta[idx])}
              className="w-full mt-1 px-1 py-0.5 bg-blue-500 text-white text-xs rounded"
            >
              Сохранить
            </button>
          </div>
        ))}
      </div>
  )
}
export default Finance