interface OrderStatusFiltersProps {
  setPaymentStatus: (value: string) => void;
  setCompletionStatus: (value: string) => void;
}

const OrderStatusFilters: React.FC<OrderStatusFiltersProps> = ({ setPaymentStatus, setCompletionStatus }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
      <div className="flex flex-col items-start">
        <span className="text-sm mb-1">Статус оплаты</span>
        <label className="flex items-center gap-2 w-40">
          <select
            id="paymentStatus"
            className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-center"
            onChange={(e) =>  setPaymentStatus(e.target.value)}
          >
            <option value="">Любой</option>
            <option value="Ждет оплату">Ждет оплату</option>
            <option value="Предоплата">Предоплата</option>
            <option value="Оплачен">Оплачен</option>
            <option value="Отказ">Отказ</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm mb-1">Статус выполнения</span>
        <label className="flex items-center gap-2 w-40">
          <select
            id="completionStatus"
            className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-center"
            onChange={(e) =>  setCompletionStatus(e.target.value)}
          >
            <option value="">Любой</option>
            <option value="Ожидает сборки">Ожидает сборки</option>
            <option value="В работе">В работе</option>
            <option value="Выполнен">Выполнен</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default OrderStatusFilters;