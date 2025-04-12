import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPer = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
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

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-[200px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-2 bg-slate-100 rounded-full">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold flex items-center gap-2">
                {budget.name}
                {getStatusTag()}
              </h2>
              <h2 className="text-sm text-gray-400">
                {budget.totalItem} Items
              </h2>
              {/* <span className="text-xs text-white bg-indigo-500 px-2 py-1 mt-1 inline-block rounded-full">
                {budget.category || "General"}
              </span> */}
            </div>
          </div>
          <h2 className="font-bold text-indigo-600 text-lg">
            {formatCurrency(budget.amount)}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs text-red-400">
              {formatCurrency(budget.totalSpend || 0)} Spent
            </h2>
            <h2 className="text-xs text-green-400">
              {formatCurrency(budget.amount - budget.totalSpend)} Remaining
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2" title={`${calculateProgressPer()}% of budget used`}>
            <div
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                calculateProgressPer() >= 90
                  ? "bg-red-600"
                  : calculateProgressPer() >= 75
                  ? "bg-amber-500"
                  : calculateProgressPer() >= 50
                  ? "bg-yellow-400"
                  : "bg-emerald-500"
              }`}
              style={{
                width: `${Math.min(100, calculateProgressPer())}%`,
              }}
              role="progressbar"
              aria-valuenow={calculateProgressPer()}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* Percentage Used & Message */}
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-500">
              {calculateProgressPer()}% used
            </div>
            {getSpendMessage()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
