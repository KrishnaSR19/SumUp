"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Cardinfo from "./_components/Cardinfo";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { and, desc,getTableColumns, eq, sql } from "drizzle-orm";
import { useParams } from "next/navigation";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  // State to store list of budgets fetched from the database
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList,setExpensesList]=useState([]);

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
      .orderBy(desc(Budgets.id))
      ;                                  // Group by budget ID to aggregate

    // console.log("Fetched budgets:", result);
    setBudgetList(result); // Save the result to state
    getAllExpenses();
  };
 
  //Used to get all Expenses belong to users
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
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi , {user?.fullName}😃</h2>
      <p className="text-gray-500">
        Here's what happening with your money.Lets Manage
      </p>
      <Cardinfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-1.5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList}/>
      <ExpenseListTable
      expensesList={expensesList}
      refreshData={()=>{
        getBudgetList();
      }}
      />
        </div>

      <div className="grid gap-5">
        <h2 className="font-bold text-2xl">Latest Budgets</h2>
         {budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} key={index}/>

         ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
