import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 mr-2">
      <h2 className="font-bold mb-2">Summary</h2>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart
          data={budgetList}
          margin={{ top: 7 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`₹${value}`, name === "amount" ? "Total Amount" : "Spend Amount"]}
            labelFormatter={(label) => `Category: ${label}`}
            cursor={{ fill: "rgba(126, 34, 206, 0.1)" }}
          />
          <Legend />
          <Bar dataKey="totalSpend" fill="#7e22ce" /> {/* Spend Amount */}
          <Bar dataKey="amount" fill="#c084fc" />     {/* Total Amount */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
