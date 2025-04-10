"use client";
import React, { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
// import Budgets from '../budgets/page';
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable from "../_components/ExpenseListTable";

function ExpenseRoute() {
  const [expensesList, setExpensesList] = useState([]);

  // Accessing logged-in user details from Clerk
  const { user } = useUser();

  // Run when user object changes
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      // getBudgetList(); // Fetch budgets when user email is available
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="p-3">
          <h2 className="font-bold text-lg">All Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => {
          getBudgetList();
        }}
      />
    </div>
  );
}

export default ExpenseRoute;
