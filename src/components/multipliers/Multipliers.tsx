import useGlobalContext from "../../hooks/useGlobalContext";

const Multipliers = () => {
  const { state } = useGlobalContext();
  const costPrice = state.leads.reduce((acc, lead) => acc + lead.costPrice, 0);
  const orderSum = state.leads.reduce((acc, lead) => acc + lead.orderSum, 0);
  const expenses = state.expenses.reduce((acc, expense) => acc + expense.spentOnAdvertising, 0);
  const expensesOther = state.expenses.reduce((acc, expense) => acc + expense.spentOther, 0);

  const romi = expenses? (orderSum - expenses) / expenses * 100 : 0;
  const roas = expenses? orderSum / expenses : 0;
  const profit = orderSum - costPrice;
  const netProfit = profit - (expenses + expensesOther);
  
  if (!state.leads.length || !state.expenses.length) {
    return <div>Загрузка данных...</div>;
  }
  return (
    <div>
      <h1>Multipliers</h1>
      <div>
        <h2>ROAS</h2>
        <div>{isNaN(roas) ? '—' : roas.toFixed(2)} %</div>
      </div>
      <div>
        <h2>ROMI</h2>
        <div>{isNaN(romi) ? '—' : romi.toFixed(2)} %</div>
      </div>
      <div>
        <h2>Чистая прибыль</h2>
        <div>{netProfit}</div>
      </div>
      <div>
        <h2>Доход</h2>
        <div>{orderSum}</div>
      </div>
    </div>
  )
}

export default Multipliers;