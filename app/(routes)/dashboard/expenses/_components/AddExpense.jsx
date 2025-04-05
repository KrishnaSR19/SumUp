import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function AddExpense() {

    const [name,setName]=useState();
    const [amount,setAmount]=useState();



  return (
    <div className="border p-3 ml-3 rounded-lg ">
        <h2 className="font-bold text-lg">Add Expense</h2>
     
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Gaming Room"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g., ₹10000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name&&amount)} className="mt-3 w-full bg-indigo-600">Add</Button>
    </div>
  );
}

export default AddExpense;
