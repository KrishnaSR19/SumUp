"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import Image from "next/image";

function BudgetList() {
  // State to store list of budgets fetched from the database
  const [budgetList, setBudgetList] = useState([]);

  // Accessing logged-in user details from Clerk
  const { user } = useUser();

  // Run when user object changes
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getBudgetList(); // Fetch budgets when user email is available
    }
  }, [user]);

  // Fetch budgets created by the current user, along with spend & item count
  const getBudgetList = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;

    const result = await db
      .select({
        ...getTableColumns(Budgets), // All budget fields
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number), // Total expenses for each budget
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),    // Number of expense entries
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)) // Join with expenses table
      .where(eq(Budgets.createdBy, userEmail))               // Filter by current user's email
      .groupBy(Budgets.id)
      ;                                  // Group by budget ID to aggregate

    // console.log("Fetched budgets:", result);
    setBudgetList(result); // Save the result to state
  };

  return (
    <div className="mt-7">
      {/* Grid layout for budget cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Component to create a new budget */}
        <CreateBudget refreshData={getBudgetList} />

        {/* If budgets exist, show them. Else, show loading placeholders (Skeleton effect) */}
        {budgetList.length > 0
          ? budgetList.map((budget) => (
              <BudgetItem budget={budget} key={budget.id} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 dark:bg-slate-700 rounded-lg h-[150px] animate-pulse flex items-center justify-center"
              >
                  {/* <Image className="w-25 animate-spin animate-pulse" src="/loader.svg" alt="loader" width={10} height={5} /> */}

              </div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
