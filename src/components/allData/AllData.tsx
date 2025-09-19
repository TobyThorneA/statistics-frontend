import { useEffect, useState } from "react";
import axios from "axios";

interface Lead {
  _id: string;
  orderDate: string;
  shippingDate: string;
  deliveryTime: string;
  source: string;
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  event?: string;
  orderStructure?: string;
  orderNote?: string;
  salePrice: number;
  deliveryCost: number;
  bouquetCost: number;
  purchasePrice: number;
  extraExpenses: number;
  paymentStatus: string;
  completionStatus: string;
}

interface Finance {
  _id: string;
  leadId: string | { _id: string };
  date: string;
  salePrice: number;
  deliveryCost: number;
  bouquetCost: number;
  purchasePrice: number;
  extraExpenses: number;
  profit: number;
}

interface User {
  _id: string;
  name: string;
  phone: string;
}

const AllData = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "finance" | "users">("leads");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [leadsRes, financeRes, usersRes] = await Promise.all([
  //         axios.get("http://localhost:5000/api/allData"),
  //         axios.get("http://localhost:5000/api/allData"),
  //         axios.get("http://localhost:5000/api/allData"),
  //       ]);
  //       setLeads(leadsRes.data);
  //       setFinances(financeRes.data);
  //       setUsers(usersRes.data);
  //     } catch (err) {
  //       console.error("Ошибка при получении данных:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get("https://statistics-api.myata-flowers.ru/api/allData");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const leadsArr = res.data.map((d : any) => ({
          ...d.lead,
          _id: d._id,
        }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const financesArr = res.data.map((d: any) => ({
          ...d.finance,
          _id: d._id,
        }))

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usersArr = res.data.map((d: any) => ({
          ...d.user,
          _id: d._id,
        }))

        setLeads(leadsArr);
        setFinances(financesArr);
        setUsers(usersArr);

      } catch(err) {
          console.error("Ошибка при получении данных:", err);
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  },[])

  if (loading) return <p className="text-center">Загрузка данных...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Все данные</h1>

      {/* Переключатели табов */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "leads" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("leads")}
        >
          Заказы
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "finance" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("finance")}
        >
          Финансы
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Пользователи
        </button>
      </div>

      {/* Контент табов */}
      {/* {activeTab === "leads" && (
        <div className="grid gap-3 md:grid-cols-2">
          {leads.map((lead) => (
            <div key={lead._id} className="p-4 rounded-xl bg-white shadow">
              <p><b>Дата заказа:</b> {lead.orderDate}</p>
              <p><b>Дата отправки:</b> {lead.shippingDate}</p>
              <p><b>Время доставки:</b> {lead.deliveryTime}</p>
              <p><b>Источник:</b> {lead.source}</p>
              <p><b>Заказчик:</b> {lead.customerName} ({lead.customerPhone})</p>
              <p><b>Получатель:</b> {lead.recipientName} ({lead.recipientPhone})</p>
              <p><b>Адрес:</b> {lead.deliveryAddress}</p>
              <p><b>Событие:</b> {lead.event}</p>
              <p><b>Состав заказа:</b> {lead.orderStructure}</p>
              <p><b>Комментарий:</b> {lead.orderNote}</p>
              <p><b>Стоимость букета:</b> {lead.salePrice} ₽</p>
              <p><b>Стоимость доставки(клиент):</b> {lead.deliveryCost} ₽</p>
              <p><b>Выручка:</b> {lead.deliveryCost + lead.salePrice} ₽</p>
              <p><b>Себестоимость букета:</b> {lead.bouquetCost} ₽</p>
              <p><b>Доставка(курьер):</b> {lead.purchasePrice} ₽</p>
              <p><b>Прочие расходы:</b> {lead.extraExpenses} ₽</p>
              <p><b>Статус оплаты:</b> {lead.paymentStatus}</p>
              <p><b>Статус выполнения:</b> {lead.completionStatus}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "finance" && (
        <div className="grid gap-3 md:grid-cols-2">
          {finances.map((f) => (
            <div key={f._id} className="p-4 rounded-xl bg-white shadow">
              <p><b>Дата:</b> {f.date}</p>
              <p><b>ID заказа:</b> {typeof f.leadId === "object" ? f.leadId._id : f.leadId}</p>
              <p><b>Выручка:</b> {f.salePrice} ₽</p>
              <p><b>Доставка:</b> {f.deliveryCost} ₽</p>
              <p><b>Себестоимость букета:</b> {f.bouquetCost} ₽</p>
              <p><b>Закупка:</b> {f.purchasePrice} ₽</p>
              <p><b>Прочие расходы:</b> {f.extraExpenses} ₽</p>
              <p className="font-bold"><b>Прибыль:</b> {f.profit} ₽</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "users" && (
        <div className="grid gap-3 md:grid-cols-2">
          {users.map((u) => (
            <div key={u._id} className="p-4 rounded-xl bg-white shadow">
              <p><b>Имя:</b> {u.name}</p>
              <p><b>Телефон:</b> {u.phone}</p>
            </div>
          ))}
        </div>
      )} */}
      {activeTab === "leads" && (
  <div className="grid gap-3 md:grid-cols-2">
    {leads.map((lead, idx) => {
      const finance = finances[idx]; // связываем лид и финансы по индексу
      return (
        <div key={lead._id} className="p-4 rounded-xl bg-white shadow">
          <p><b>Дата заказа:</b> {lead.orderDate}</p>
          <p><b>Дата отправки:</b> {lead.shippingDate}</p>
          <p><b>Время доставки:</b> {lead.deliveryTime}</p>
          <p><b>Источник:</b> {lead.source}</p>
          <p><b>Заказчик:</b> {lead.customerName} ({lead.customerPhone})</p>
          <p><b>Получатель:</b> {lead.recipientName} ({lead.recipientPhone})</p>
          <p><b>Адрес:</b> {lead.deliveryAddress}</p>
          <p><b>Событие:</b> {lead.event}</p>
          <p><b>Состав заказа:</b> {lead.orderStructure}</p>
          <p><b>Комментарий:</b> {lead.orderNote}</p>
          <p><b>Стоимость букета:</b> {lead.salePrice} ₽</p>
          <p><b>Стоимость доставки(клиент):</b> {lead.deliveryCost} ₽</p>
          <p><b>Выручка:</b> {finance ? finance.salePrice + finance.deliveryCost : "—"} ₽</p>
          <p><b>Себестоимость букета:</b> {lead.bouquetCost} ₽</p>
          <p><b>Доставка(курьер):</b> {lead.purchasePrice} ₽</p>
          <p><b>Прочие расходы:</b> {lead.extraExpenses} ₽</p>
          <p className="font-bold"><b>Прибыль:</b> {finance ? finance.profit : "—"} ₽</p>
          <p><b>Статус оплаты:</b> {lead.paymentStatus}</p>
          <p><b>Статус выполнения:</b> {lead.completionStatus}</p>
        </div>
      );
    })}
  </div>
)}

{activeTab === "finance" && (
  <p className="text-center text-gray-500">Финансовые данные будут здесь чуть позже</p>
)}

{activeTab === "users" && (
  <div className="grid gap-3 md:grid-cols-2">
    {users.map((u) => (
      <div key={u._id} className="p-4 rounded-xl bg-white shadow">
        <p><b>Имя:</b> {u.name}</p>
        <p><b>Телефон:</b> {u.phone}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default AllData;


