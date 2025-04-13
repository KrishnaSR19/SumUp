import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import moment from "moment/moment";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const params = useParams(); // use the hook
  // const { user } = useUser();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Used to Add New Expense
   */

  const addNewExpense = async () => {
    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt: moment().format('DD/MM/YYYY')
        })
        .returning({ insertedId: Budgets.id });

      setAmount('');
      setName('');

      // console.log("Data Saved Bhai", result);
      if (result) {
        setLoading(false);
        refreshData();
        //show success message
        toast.success("New Expense Added");
      }
      setLoading(false);
      // Show error message
    } catch (error) {
      toast.error("Error creating budget: " + error.message); // Show error message if insertion fails
    }
  };

  return (
    <div className="border p-3 ml-3 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white">Add Expense</h2>

      <div className="mt-2">
        <h2 className="text-black dark:text-gray-300 font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Gaming Room"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white dark:bg-gray-700 dark:text-white text-black"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black dark:text-gray-300 font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g., ₹10000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white dark:bg-gray-700 dark:text-white text-black"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={addNewExpense}
        className="mt-3 w-full bg-indigo-600 cursor-pointer dark:bg-indigo-700 dark:hover:bg-indigo-600"
      >
        {loading ? <Loader className="animate-spin" /> : "Add Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
