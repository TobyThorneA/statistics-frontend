// src/components/AllData.tsx
import {  useState } from "react";
// import axios from "axios";
// import type { Lead } from "../../types/interface";
import AdAnalytics from "../adAnalytics/AdAnalytics";
import type { User } from "../../types/user";
import Users from "../users/Users";
import { getUsersByPhone, getUsersNoNumber } from "../../api/usersApi";
import Leads from "../leads/Leads";
import type { LeadWrapper } from "../../types/interface";
import { fetchDataShippingByDate } from "../../api/allDataApi";
import ChoosingDates from "../choosingDates/ChoosingDates";
import Finance from "../financesRender/Finance";
import OrderStatusFilters from "../orderStatusFilters/OrderStatusFilters";


const AllData = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"leads" | "finance"| "adAnalytics" | "users">("leads");
  const [leads, setLeads] = useState<LeadWrapper[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const toISODateString = (date: string): `${number}-${number}-${number}` => {
  return date as `${number}-${number}-${number}`;
  }

  const handleSearchByNumber = async () => {
    if(phoneNumber.length !== 4) return;
    try {
      const result = await getUsersByPhone(phoneNumber);
      setUsers(result);
    } catch (err) {
      console.error("Ошибка поиска:", err);
    }
  }

  const handlerSearchNoNumberUsers = async () => {
    try {
      const result = await getUsersNoNumber()
      setUsers(result)
    } catch (err) {
      console.error("Ошибка поиска:", err);
    }
  }

  const fetchDataLeads = async () => {
    setLoadingLeads(true);
    const data = await fetchDataShippingByDate(toISODateString(startDate), toISODateString(endDate), completionStatus, paymentStatus)
    console.log('dataLeads', data)
    if(data) setLoadingLeads(false)

    setLeads(data);
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Все данные</h1>

      {/* Переключатели табов */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${activeTab === "leads" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("leads")}
        >
          Заказы
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${activeTab === "finance" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("finance")}
        >
          Финансы
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${activeTab === "adAnalytics" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("adAnalytics")}
        >
          Рекламная аналитика
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("users")}
        >
          Пользователи
        </button>
      </div>

      {/* Контент табов */}
      {activeTab === "leads" && (
        <div>
          <div>
            <ChoosingDates startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            <OrderStatusFilters setCompletionStatus={setCompletionStatus} setPaymentStatus={setPaymentStatus}/>
            <button className="border" onClick={ fetchDataLeads }>дать лидов</button>
          </div>
          <Leads leads={leads} loading={loadingLeads} fetchLeads={fetchDataLeads}/>
        </div>
        
      )}

      {activeTab === "finance" && (
      <div className="flex flex-wrap gap-3">
        <ChoosingDates startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
        <Finance
          startDate={toISODateString(startDate)}
          endDate={toISODateString(endDate)}
        />
      </div>

      // <div>хуй</div>
      )}

      {activeTab === "adAnalytics" && (
        <div className="flex flex-col items-center gap-3 mb-4">
          <ChoosingDates startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
          <AdAnalytics
            startDate={toISODateString(startDate)}
            endDate={toISODateString(endDate)}
          />
        </div>
      )}

      {activeTab === "users" && (
        <div className="gap-1">
          <label className="flex items-center gap-2 w-40">
            Введите последние 4 цифры номера телефона
            <button onClick={handlerSearchNoNumberUsers}>без номера</button>
            <input
              type="text"
              placeholder="1234"
              id=""
              value={phoneNumber}
              onChange={(e) => {
                // Берём только цифры
                const value = e.currentTarget.value.replace(/\D/g, "");
                // Ограничиваем максимум 4 символа
                setPhoneNumber(value.slice(0, 4));
              }}
              maxLength={4}
              className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-center"
            />
          </label>
          <button
            onClick={handleSearchByNumber}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded mb-10"
          >
            Найти
          </button>
          <Users users={users}/>
        </div>
      )}
    </div>
  );
};

export default AllData;
