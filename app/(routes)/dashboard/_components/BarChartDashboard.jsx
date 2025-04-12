import React from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 mr-2">
      <h2 className="font-bold mb-2">Summary</h2>
      <ResponsiveContainer width={"80%"} height={300}>
      <BarChart
        data={budgetList}
        margin={{
          top: 7,
         
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" fill="#7e22ce" />  // purple-600
        <Bar dataKey="amount" fill="#c084fc" />      // purple-300
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
