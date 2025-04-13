import { PiggyBankIcon, ReceiptIcon, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function Cardinfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpend, setTotalSpend] = useState();

  useEffect(() => {
    if (budgetList) {
      CalculateCardInfo();
    }
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 mt-2 border rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h2 className="text-sm text-gray-800 dark:text-gray-300">Total Budget</h2>
              <h2 className="font-bold text-2xl text-gray-900 dark:text-white">&#x20B9;{totalBudget}</h2>
            </div>
            <PiggyBankIcon className="bg-purple-600 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 mt-2 border rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h2 className="text-sm text-gray-800 dark:text-gray-300">Total Spend</h2>
              <h2 className="font-bold text-2xl text-gray-900 dark:text-white">&#x20B9;{totalSpend}</h2>
            </div>
            <ReceiptIcon className="bg-destructive p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 mt-2 border rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h2 className="text-sm text-gray-800 dark:text-gray-300">No. Of Budgets</h2>
              <h2 className="font-bold text-2xl text-gray-900 dark:text-white">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-emerald-400 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg dark:bg-gray-700"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cardinfo;
