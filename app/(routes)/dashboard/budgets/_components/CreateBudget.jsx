"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateBudget() {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  return (
    <div className="mt-7">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-slate-100 p-10 rounded-md items-center flex flex-col border border-dashed cursor-pointer">
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
            <Button
              variant="outline"
              className="text-large"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </Button>

            {openEmojiPicker && (
              <div className="absolute">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}

            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input placeholder="e.g., Home Decor" />
            </div>

            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Budget Amount</h2>
              <Input placeholder="e.g., ₹5000" />
            </div>

            <Button className="mt-5 w-full">Create Budget</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
