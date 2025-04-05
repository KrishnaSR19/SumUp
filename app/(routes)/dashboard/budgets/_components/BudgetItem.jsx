import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPer = () => {
    // (spend/total)*100
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link
      href={"/dashboard/expenses/" + budget?.id}
      className="p-5 border rounded-lg hover:shadow-sm cursor-pointer h-[170px] "
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-2 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-400">{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-indigo-600 text-lg">{budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-red-400">
            ${budget.totalSpend ? budget.totalSpend : 0} Spend
          </h2>
          <h2 className="text-xs text-green-400">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 color-indigo-600 h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${
              calculateProgressPer() > 80 ? "bg-red-600" : "bg-indigo-600"
            }`}
            style={{
              width: `${calculateProgressPer()}%`,
            }}
          ></div>
          {calculateProgressPer() == 100 && (
            <p className="text-red-600 text-sm mt-2">Budget is finished sucker 😭..</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
