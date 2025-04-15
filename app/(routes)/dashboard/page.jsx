"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Cardinfo from "./_components/Cardinfo";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, desc, getTableColumns, eq, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { Input } from "@/components/ui/input";

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user]);

  /**
   Gets all the budget created by user
   */

  const getBudgetList = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, userEmail))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  /**
   * Gets all the expenses created by user
   */

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
    setFilteredExpenses(result); // Default view
  };

  /*
   logic for searching in expense
  */

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = expensesList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExpenses(filtered);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}! 😃</h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let’s manage it wisely.
      </p>

      <Cardinfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-1.5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          {/* Search input */}
          <Input
            placeholder="🔎Search expenses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="my-4"
          />

          <ExpenseListTable
            expensesList={filteredExpenses}
            refreshData={() => {
              getBudgetList();
            }}
          />
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-2xl">Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
