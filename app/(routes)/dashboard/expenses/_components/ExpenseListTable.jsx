import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expenses) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expenses.id))
      .returning();

    if (result) {
      refreshData();
      toast.success("Expense Deleted!");
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 dark:bg-gray-700 p-2 rounded font-semibold text-black dark:text-white">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold flex items-center justify-center">Action</h2>
      </div>
      {Array.isArray(expensesList) && expensesList.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div
            key={index}
            className="grid grid-cols-4 bg-slate-50 dark:bg-gray-800 p-2 rounded my-2"
          >
            <h2 className="text-black dark:text-white">{expenses.name}</h2>
            <h2 className="text-red-400 dark:text-red-400">
              &#x20B9;{expenses.amount}
            </h2>
            <h2 className="break-words whitespace-normal text-black dark:text-white">
              {expenses.createdAt}
            </h2>
            <h2 className="flex items-center justify-center">
              <Trash
                className="text-red-600 cursor-pointer dark:text-red-400"
                onClick={() => deleteExpense(expenses)}
              />
            </h2>
          </div>
        ))
      ) : (
        <p className="mt-3 text-gray-500 dark:text-gray-400">No expenses found.</p>
      )}
    </div>
  );
}

export default ExpenseListTable;
