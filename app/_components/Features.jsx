"use client";
import React from "react";
import {
  PieChart,
  Wallet2,
  Bot,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Visual Expense Breakdown",
    description:
      "Understand where your money goes with interactive pie charts and graphs.",
    icon: <PieChart className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Budget Planning",
    description:
      "Set monthly budgets for different categories and track your progress easily.",
    icon: <Wallet2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Manage with AI",
    description:
      "Ask financial queries or get tips using our smart AI assistant powered by Google Gemini.",
    icon: <Bot className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Financial Insights",
    description:
      "Analyze spending patterns with monthly reports and actionable insights.",
    icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Features That Empower You
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover how our smart tools simplify money management and help you reach your financial goals.
        </p>

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-indigo-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
