"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ import useParams
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';

function ExpensesScreen() {
  const { user } = useUser();
  const params = useParams(); // ✅ use the hook
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    if (user && params?.id) {
      getBudgetInfo();
    }
  }, [user, params]);

  const getBudgetInfo = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const currentBudgetId = Number(params.id); // ✅ renamed here

    if (!userEmail || !currentBudgetId) {
      console.warn("⚠️ Missing userEmail or currentBudgetId");
      return;
    }

    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, userEmail),
          eq(Budgets.id, currentBudgetId) // ✅ use the renamed variable
        )
      )
      .groupBy(Budgets.id);

    console.log("🎯 Final result from DB:", result);
    setBudgetInfo(result?.[0] || null);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
      <AddExpense/>
      </div>
    </div>
  );
  
}

export default ExpensesScreen;
