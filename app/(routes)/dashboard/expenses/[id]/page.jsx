"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation"; // ✅ import useParams
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowLeftIcon,
  PenBox,
  PenBoxIcon,
  Router,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen() {
  const { user } = useUser();
  const params = useParams(); //  use the hook
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user && params?.id) {
      getBudgetInfo();
    }
  }, [user, params]);

  //Get Budget Information
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

    // console.log(" Final result from DB:", result);
    setBudgetInfo(result?.[0] || null);
    getExpenseList();
  };

  //Get Budget List
  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    // console.log(result);
  };

  //Used to delete Budget
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();
    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
      // console.log(result);
    }
    toast.success("Budget & Expenses Deleted!");
    router.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeftIcon
            onClick={() => router.replace("/dashboard/budgets")}
            className="cursor-pointer mt-1"
          />
          My Expenses
        </span>

        <div className="flex gap-2 items-center mt-2">
          <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2 w-20 mt-2 cursor-pointer" variant="destructive">
              <Trash />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                current budget along with expenses and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getBudgetInfo()}
      />
    </div>
  );
}

export default ExpensesScreen;
