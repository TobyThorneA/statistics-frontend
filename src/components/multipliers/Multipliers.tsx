// import useGlobalContext from "../../hooks/useGlobalContext";

// const Multipliers = () => {
//   const { state } = useGlobalContext();
//   const costPrice = state.leads.reduce((acc, lead) => acc + lead.costPrice, 0);
//   const orderSum = state.leads.reduce((acc, lead) => acc + lead.orderSum, 0);
//   const expenses = state.expenses.reduce((acc, expense) => acc + expense.spentOnAdvertising, 0);
//   const expensesOther = state.expenses.reduce((acc, expense) => acc + expense.spentOther, 0);

//   const romi = expenses? (orderSum - expenses) / expenses * 100 : 0;
//   const roas = expenses? orderSum / expenses : 0;
//   const profit = orderSum - costPrice;
//   const netProfit = profit - (expenses + expensesOther);
  
//   if (!state.leads.length || !state.expenses.length) {
//     return <div>Загрузка данных...</div>;
//   }
//   return (
//     <div>
//       <h1>Multipliers</h1>
//       <div>
//         <h2>ROAS</h2>
//         <div>{isNaN(roas) ? '—' : roas.toFixed(2)} %</div>
//       </div>
//       <div>
//         <h2>ROMI</h2>
//         <div>{isNaN(romi) ? '—' : romi.toFixed(2)} %</div>
//       </div>
//       <div>
//         <h2>Чистая прибыль</h2>
//         <div>{netProfit}</div>
//       </div>
//       <div>
//         <h2>Доход</h2>
//         <div>{orderSum}</div>
//       </div>
//     </div>
//   )
// }

// export default Multipliers;

import useGlobalContext from "../../hooks/useGlobalContext";

const Multipliers = () => {
  const { state } = useGlobalContext();

  // Собираем все лиды из всех дней
  const allLeads = state.flatMap(day => day.leads);

  // Собираем все расходы (meta) из всех дней
  const allExpenses = state.map(day => day.meta);

  // Себестоимость (сумма bouquetCost по всем лидам)
  const costPrice = allLeads.reduce((acc, lead) => acc + lead.bouquetCost, 0);

  // Выручка (сумма salePrice по всем лидам)
  const orderSum = allLeads.reduce((acc, lead) => acc + lead.salePrice, 0);

  // Рекламные расходы
  const expenses = allExpenses.reduce((acc, meta) => acc + meta.adSpend, 0);

  // Прочие расходы
  const expensesOther = allExpenses.reduce((acc, meta) => acc + meta.otherSpend, 0);

  // Метрики
  const romi = expenses ? ((orderSum - expenses) / expenses) * 100 : 0;
  const roas = expenses ? orderSum / expenses : 0;
  const profit = orderSum - costPrice;
  const netProfit = profit - (expenses + expensesOther);

  if (allLeads.length === 0 || allExpenses.length === 0) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      <h1>Multipliers</h1>
      <div>
        <h2>ROAS</h2>
        <div>{isNaN(roas) ? "—" : roas.toFixed(2)} %</div>
      </div>
      <div>
        <h2>ROMI</h2>
        <div>{isNaN(romi) ? "—" : romi.toFixed(2)} %</div>
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
  );
};

export default Multipliers;

