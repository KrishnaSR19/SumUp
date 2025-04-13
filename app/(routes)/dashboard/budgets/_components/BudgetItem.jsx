import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  // Calculate progress percentage only once for optimization
  const calculateProgressPer = () => {
    if (!budget.amount || budget.amount === 0) return 0; // Avoid division by zero
    return ((budget.totalSpend / budget.amount) * 100).toFixed(2);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const getStatusTag = () => {
    const perc = calculateProgressPer();
    if (perc < 50) return <span className="text-xs text-emerald-600 font-semibold">On Track ✅</span>;
    if (perc < 90) return <span className="text-xs text-amber-500 font-semibold">Monitor ⚠️</span>;
    return <span className="text-xs text-red-600 font-semibold">Critical! 🔥</span>;
  };

  const getSpendMessage = () => {
    const perc = parseFloat(calculateProgressPer());

    if (perc === 0) return <p className="text-xs text-gray-500 mt-1">Haven’t spent anything yet.</p>;
    if (perc <= 25) return <p className="text-xs text-green-600 mt-1">Great start, keep it up! 🌱</p>;
    if (perc <= 50) return <p className="text-xs text-emerald-600 mt-1">You’re doing well, stay consistent. 💪</p>;
    if (perc <= 75) return <p className="text-xs text-yellow-600 mt-1">Keep an eye on your expenses. 👀</p>;
    if (perc <= 90) return <p className="text-xs text-amber-600 mt-1">Warning: Budget almost over! ⚠️</p>;
    if (perc < 100) return <p className="text-xs text-red-600 mt-1">Critical! Budget nearly exhausted. 🔥</p>;
    return <p className="text-red-600 text-sm mt-2 font-bold">Budget is finished 😭..</p>;
  };

  const progressPercentage = calculateProgressPer();

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-[200px] dark:bg-slate-800 dark:border-slate-600">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-2 bg-slate-100 rounded-full dark:bg-slate-700">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold flex items-center gap-2 dark:text-white">
                {budget.name}
                {getStatusTag()}
              </h2>
              <h2 className="text-sm text-gray-400 dark:text-gray-500">
                {budget.totalItem} Items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-indigo-600 text-lg dark:text-indigo-300">
            {formatCurrency(budget.amount)}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs text-red-400 dark:text-red-500">
              {formatCurrency(budget.totalSpend || 0)} Spent
            </h2>
            <h2 className="text-xs text-green-400 dark:text-green-500">
              {formatCurrency(budget.amount - budget.totalSpend)} Remaining
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-slate-600" title={`${progressPercentage}% of budget used`}>
            <div
              className={`h-2 rounded-full transition-all duration-500 ease-out ${progressPercentage >= 90
                  ? "bg-red-600"
                  : progressPercentage >= 75
                  ? "bg-amber-500"
                  : progressPercentage >= 50
                  ? "bg-yellow-400"
                  : "bg-emerald-500"}`}
              style={{
                width: `${Math.min(100, progressPercentage)}%`,
              }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* Percentage Used & Message */}
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-500 dark:text-gray-300">
              {progressPercentage}% used
            </div>
            {getSpendMessage()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
