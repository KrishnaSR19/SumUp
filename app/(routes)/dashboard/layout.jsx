"use client"; // Enables client-side rendering

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { useUser } from "@clerk/nextjs"; // Clerk authentication for user data

// Import necessary components
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";

// Import database and schema
import { Budgets } from "@/utils/schema"; 
import { db } from "@/utils/dbConfig"; // Ensure this is correctly exported in dbConfig.js

import { eq } from "drizzle-orm"; // Import Drizzle ORM query function

function DashboardLayout({ children }) {
  // Get the logged-in user from Clerk
  const { user } = useUser();

  // Initialize Next.js router
  const router = useRouter();

  // Debugging logs to check if imports and user data are correctly loaded
  console.log("DB Instance:", db); // Ensure `db` is properly imported
  console.log("Budgets Schema:", Budgets); // Verify that `Budgets` schema is imported correctly
  console.log("User Object:", user); // Check if the user object is available

  // Run `checkUserBudgets` when the `user` state changes
  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  // Function to check if the user has any budgets
  const checkUserBudgets = async () => {
    try {
      console.log("User Email:", user?.primaryEmailAddress?.emailAddress); // Log user email for debugging

      // Ensure `db` and `Budgets` schema are correctly initialized
      if (!db || !Budgets) {
        throw new Error("DB or Budgets schema is not properly initialized");
      }

      // Ensure user email is available before querying the database
      if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User email is undefined");
      }

      // Query the database to check if the user has any budgets
      const result = await db
        .select() // Select all columns
        .from(Budgets) // From the `Budgets` table
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress)) // Filter by user's email
        .execute(); // Execute the query (required for Drizzle ORM)

      console.log("Query Result:", result); // Log the result for debugging

      // If the user has no budgets, redirect them to the budgets page
      if (!result || result.length === 0) {
        router.replace("/dashboard/budgets"); // Redirect user to budget creation page
      }
    } catch (error) {
      console.error("Error fetching budgets:", error); // Log any errors
    }
  };

  return (
    <div>
      {/* Sidebar Navigation */}
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>

      {/* Main Content Area */}
      <div className="md:ml-64">
        <DashboardHeader />
        {children} {/* Render child components */}
      </div>
    </div>
  );
}

export default DashboardLayout; // Export the layout component
