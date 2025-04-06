import React from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis, Legend } from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 mr-2">
      <h2 className="font-bold mb-2">Summary</h2>
      <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{
          top: 7,

        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
      </BarChart>
    </div>
  );
}

export default BarChartDashboard;
