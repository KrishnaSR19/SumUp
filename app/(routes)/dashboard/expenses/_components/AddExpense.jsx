import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({budgetId,user,refreshData}) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  // const { user } = useUser();
  const params = useParams(); //  use the hook

  const addNewExpense = async () => {
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name:name,
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt:moment().format('DD/MM/YYYY')
            
        })
        .returning({insertedId:Budgets.id});

      console.log("Data Saved Bhai",result);
      if (result) {
        refreshData();
        //show success message
        toast.success("New Expense Added");
      }
      // Show error message
    } catch (error) {
      toast.error("Error creating budget: " + error.message); // Show error message if insertion fails
    }
  };

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
      <Button
        disabled={!(name && amount)}
        onClick={addNewExpense}
        className="mt-3 w-full bg-indigo-600"
      >
        Add Expense
      </Button>
    </div>
  );
}

export default AddExpense;
