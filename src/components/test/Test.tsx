
import { useEffect } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { mockAnalytics } from "../../mocks/leads";

const Test = () => {

  const { state, dispatch } = useGlobalContext();
  console.log("state1", state);

  useEffect(() => {
  dispatch({ type: 'SET_LEADS', payload: {
    date: mockAnalytics[0].date,
    leads: mockAnalytics[0].leads,
  } });
}, [dispatch]);

  return (
    <div>
      {state.length === 0 ? (
        <p>Загрузка данных...</p>
      ) : (
      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Leads List */}
          <div className="border rounded-2xl p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Leads List</h2>
            {state.length > 0 && (
              <p className="text-gray-600 mb-4">Total Leads: {state[0].leads.length}</p>
            )}
            <ul className="space-y-3">
              {state[0].leads.map((lead, index) => (
                <li
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border hover:bg-gray-100 transition"
                >
                  <h3 className="font-medium text-lg">{lead.customerName}</h3>
                  <p className="text-gray-700 text-sm">{lead.customerPhone}</p>
                  <p className="text-gray-700 text-sm">себест:{lead.bouquetCost}</p>
                  <p className="text-gray-700 text-sm"> сумма заказа:{lead.salePrice}</p>
                  <p className="text-gray-700 text-sm">{lead.paymentStatus}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Expenses List */}
          <div className="border rounded-2xl p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Список расходов</h2>
            <p className="text-gray-600 mb-4">
            </p>
            <div className="space-y-3">
                <div
                  className="bg-gray-50 rounded-lg p-3 border hover:bg-gray-100 transition"
                >
                  <p className="text-sm text-gray-700">
                    Расход на рекламу: {state[0].meta.adSpend} ₽
                  </p>
                  <p className="text-sm text-gray-700">
                    количество продаж: {state[0].leads.length}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );

}

export default Test