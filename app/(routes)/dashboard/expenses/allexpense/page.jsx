"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, eq } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import ExpenseListTable from "../_components/ExpenseListTable";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ExpenseRoute() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
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

    const parsed = result.map((item) => ({
      ...item,
      amount: Number(item.amount),
    }));

    setExpensesList(parsed);
  };

  return (
    <div className="p-3">
      <h2 className="font-bold text-lg mb-4">All Expenses</h2>

      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => {
          getAllExpenses();
        }}
      />

      {/* Line Chart */}
      {expensesList.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Expense Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expensesList.reverse()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ExpenseRoute;
