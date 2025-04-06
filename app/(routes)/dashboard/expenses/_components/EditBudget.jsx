"use client"

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({budgetInfo,refreshData}) {
    const { user } = useUser(); // Fetch authenticated user details
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon); // State for budget category icon
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false); // State to toggle emoji picker
    const [name, setName] = useState(budgetInfo?.name); // State for budget name
    const [amount, setAmount] = useState(budgetInfo?.amount); // State for budget amount

    useEffect(()=>{
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon);
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount);
        }
  

    },[budgetInfo])

    const onUpdateBudget=async()=>{
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result){
            refreshData();
            toast.success("Budget Updated!")
        }
    }



  return (
    <div>

      <Dialog>
        <DialogTrigger asChild>
      <Button className="cursor-pointer">
        <PenBox/>
        Edit
      </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the budget.
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
                    setEmojiIcon(e.emoji); // Update selected emoji
                    setOpenEmojiPicker(false); // Close picker after selection
                  }}
                />
              </div>
            )}

            {/* Input for budget name */}
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input
                placeholder="e.g., Home Decor"
                defaultValue={budgetInfo?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input for budget amount */}
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input
                type="number"
                defaultValue={budgetInfo?.amount}
                placeholder="e.g., ₹5000"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Button to create budget */}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  disabled={!(name && amount)} // Disable button if fields are empty
                  onClick={()=>onUpdateBudget()}
                  className="mt-5 w-full cursor-pointer"
                >
                 Update
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
