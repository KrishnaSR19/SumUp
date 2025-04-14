"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";

import { Budgets } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      if (!db || !Budgets) throw new Error("DB or schema is not properly initialized");

      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) throw new Error("User email not found");

      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, email));

      // Some Drizzle dialects (like Planetscale/MySQL) may need `.execute()`:
      // const result = await db
      //   .select()
      //   .from(Budgets)
      //   .where(eq(Budgets.createdBy, email))
      //   .execute();

      if (!result || result.length === 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      toast.error("Error checking budgets: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      {/* Sidebar */}
      <div className="fixed md:w-64 hidden md:block h-full border-r border-gray-200 dark:border-gray-700">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
