"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "../_components/ExpenseListTable";
import moment from "moment";

function DailyExpense() {
  const { user } = useUser();
  const [getDailyExpenseList, setDailyExpenseList] = useState([]);

  useEffect(() => {
    if (user) {
      getDailyExpense();
    }
  }, [user]);

  const getDailyExpense = async () => {
    const formattedDate = moment().format("DD/MM/YYYY"); // Today's date in the saved format

    const result = await db
      .select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress),
          eq(Expenses.createdAt, formattedDate)
        )
      )
      .orderBy(desc(Expenses.id));
    
    setDailyExpenseList(result);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Expenses</h2>

      {getDailyExpenseList.length > 0 ? (
        <ExpenseListTable expenses={getDailyExpenseList} refreshData={()=>getDailyExpense()} />
      ) : (
        <p>No expenses recorded for today.</p>
      )}
    </div>
  );
}

export default DailyExpense;
