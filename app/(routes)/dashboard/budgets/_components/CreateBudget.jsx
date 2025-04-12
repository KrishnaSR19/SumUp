"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs"; // Import Clerk Auth for user authentication

function CreateBudget({ refreshData }) {
  const { user } = useUser(); // Fetch authenticated user details
  const [emojiIcon, setEmojiIcon] = useState("😊"); // State for budget category icon
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false); // State to toggle emoji picker
  const [name, setName] = useState(""); // State for budget name
  const [amount, setAmount] = useState(""); // State for budget amount

  // Helper: Display a message based on amount
  const getBudgetMessage = () => {
    const amt = parseFloat(amount);
    if (amt <= 0 || isNaN(amt)) return "⚠️ Enter a valid positive amount.";
    if (amt < 500) return "⚠️ Small budget. Prioritize wisely.";
    if (amt < 2000) return "🙂 Moderate budget. Plan your categories.";
    if (amt < 10000) return "💡 Healthy budget. Track expenses regularly.";
    return "🚀 Large budget! Use wisely and review often.";
  };

  // Function to handle budget creation
  const onCreateBudget = async () => {
    if (!name || !amount) {
      toast.error("Please enter name and amount"); // Show error if fields are empty
      return;
    }

    try {
      // Insert budget details into the database
      const result = await db
        .insert(Budgets)
        .values({
          name,
          amount: parseFloat(amount), // Convert amount to float
          createdBy: user?.primaryEmailAddress?.emailAddress || "unknown@example.com", // Ensure valid email
          icon: emojiIcon, // Store selected emoji as budget icon
        })
        .returning();

      if (result) {
        refreshData();
        toast.success("🎉 New Budget Created!");
      }
    } catch (error) {
      toast.error("Error creating budget: " + error.message);
    }
  };

  return (
    <div>
      {/* Dialog for creating a new budget */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full h-full bg-slate-100 p-10  rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md hover:bg-green-100">
            <h2 className="text-3xl">+</h2>
            Create New Budget
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a budget.
            </DialogDescription>
          </DialogHeader>

          <div>
            {/* Button to open emoji picker */}
            <Button
              variant="outline"
              className="text-large"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>

            {/* Emoji picker component */}
            {openEmojiPicker && (
              <div className="absolute z-20">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}

            {/* Input for budget name */}
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g., Home Decor"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input for budget amount */}
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="number"
                placeholder="e.g., ₹5000"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Show budget insight message */}
            {amount && (
              <div className="text-sm mt-2 text-gray-600 italic">
                {getBudgetMessage()}
              </div>
            )}

            {/* Button to create budget */}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  disabled={!(name && amount)}
                  onClick={onCreateBudget}
                  className="mt-5 w-full"
                >
                  Create Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
