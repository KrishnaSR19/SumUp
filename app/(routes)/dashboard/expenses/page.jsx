"use client";
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
// import Budgets from '../budgets/page';
import { Budgets, Expenses } from '@/utils/schema';




function ExpenseRoute() {
  
  const [expensesList,setExpensesList]=useState([]);

  // Accessing logged-in user details from Clerk
  const { user } = useUser();


  // Run when user object changes
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      // getBudgetList(); // Fetch budgets when user email is available
      getAllExpenses();
    }
  }, [user]);


  // Fetch budgets created by the current user, along with spend & item count
  // const getBudgetList = async () => {
  //   const userEmail = user?.primaryEmailAddress?.emailAddress;
  //   if (!userEmail) return;

  //   const result = await db
  //     .select({
  //       ...getTableColumns(Budgets), // All budget fields
  //       totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number), // Total expenses for each budget
  //       totalItem: sql`count(${Expenses.id})`.mapWith(Number),    // Number of expense entries
  //     })
  //     .from(Budgets)
  //     .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)) // Join with expenses table
  //     .where(eq(Budgets.createdBy, userEmail))               // Filter by current user's email
  //     .groupBy(Budgets.id)
  //     .orderBy(desc(Budgets.id))
  //     ;                                  // Group by budget ID to aggregate

  //   // console.log("Fetched budgets:", result);
  //   setBudgetList(result); // Save the result to state
  // };

    const getAllExpenses=async()=>{
      const result =await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
  
      }).from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
  
      setExpensesList(result);
    }

  return (
    <div className='p-3'>
        <ExpenseListTable expensesList={expensesList} refreshData={()=>{
        getBudgetList();
      }}/>
    </div>
  )
}

export default ExpenseRoute