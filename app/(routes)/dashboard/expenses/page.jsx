"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];

function DailyExpense() {
  const { user } = useUser();
  const [getDailyExpenseList, setDailyExpenseList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getDailyExpense();
    }
  }, [user]);

  const getDailyExpense = async () => {
    const formattedDate = moment().format("DD/MM/YYYY");

    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
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

    // Parse amounts to numbers (important for chart)
    const parsedResult = result.map((item) => ({
      ...item,
      amount: Number(item.amount),
    }));

    setDailyExpenseList(parsedResult);
  };

  // Custom Tooltip for Line Chart and Pie Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, amount } = payload[0].payload;
      return (
        <div className="custom-tooltip p-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <p className="text-gray-800 dark:text-white">
            <strong>Expense: </strong>{name}
          </p>
          <p className="text-gray-800 dark:text-white">
            <strong>Amount: </strong>&#8377;{amount}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Today's Expenses</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/expenses/allexpense")}
          title="Go to All Expenses"
          className="flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition hover:cursor-pointer"
        >
          <Notebook className="w-5 h-5" strokeWidth={1.5} />
          All Expenses
        </Button>
      </div>

      {getDailyExpenseList.length > 0 ? (
        <>
          <ExpenseListTable
            expensesList={getDailyExpenseList}
            refreshData={() => getDailyExpense()}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Pie Chart */}
            <div className="w-full h-80 bg-white p-4 rounded-xl shadow dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-2">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDailyExpenseList}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {getDailyExpenseList.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="w-full h-80 bg-white p-4 rounded-xl shadow dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-2">Expense Trend (Today)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getDailyExpenseList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* Custom Tooltip */}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <p className="dark:text-gray-300">No expenses recorded for today.</p>
      )}
    </div>
  );
}

export default DailyExpense;
