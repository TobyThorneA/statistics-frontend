import { useState } from "react"
import type { User } from "../../types/user"
import type { LeadWrapper } from "../../types/interface"
import { fetchOrdersByUser } from "../../api/allDataApi";

interface UsersProps {
  users: User[],
}

const Users: React.FC<UsersProps> = ({ users }) => {

  const [userOrders, setUserOrders] = useState<Record<string, LeadWrapper[]>>({});
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleShowOrders = async (userId: string) => {
    if(userOrders[userId]){
      // Если уже есть — скрываем
      // console.log('userOrders',userOrders)
      // const copy = userOrders;
      // delete copy[userId];
      setUserOrders({});
      return;
    }

    try {
      setLoadingUserId(userId);
      const orders = await fetchOrdersByUser(userId);
      setUserOrders((prev) => ({ ...prev, [userId]: orders }))
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
    } finally {
      setLoadingUserId(null);
    }
  }

   return (
    <div className="grid gap-3 md:grid-cols-2">
      {users.map((u) => (
        <div key={u._id} className="p-4 rounded-xl bg-white shadow">
          <p><b>Имя:</b> {u.name}</p>
          <p><b>Телефон:</b> {u.phone}</p>
          <p><b>Количество заказов:</b> {u.orderCount}</p>
          <button
            onClick={() => handleShowOrders(u._id)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            {loadingUserId === u._id
              ? "Загрузка..."
              : userOrders[u._id]
              ? "Скрыть заказы"
              : "Показать заказы"}
          </button>

          {userOrders[u._id] && (
            <div className="mt-3 space-y-2 border-t pt-2">
              {userOrders[u._id].map((order) => (
                <div key={order._id} className="p-2 bg-gray-50 rounded">
                  <p><b>Дата доставки:</b> {order.lead.shippingDate}</p>
                  <p><b>Имя клиента:</b> {order.lead.customerName}</p>
                  <p><b>Адрес:</b> {order.lead.deliveryAddress}</p>
                  <p><b>Статус:</b> {order.lead.completionStatus}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Users