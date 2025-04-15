import React from 'react';
import BudgetList from './_components/BudgetList';

function Budgets() {
  return (
    <div className="p-10 bg-white dark:bg-slate-900">
      <h2 className="font-bold text-3xl text-black dark:text-white">My Budget</h2>
      <BudgetList />
    </div>
  );
}

export default Budgets;
