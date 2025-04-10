"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const motivationalQuotes = [
  "💡 Small savings today, big rewards tomorrow!",
  "📈 Track, save, grow — one step at a time.",
  "🌱 Budgeting is self-care for your wallet.",
  "💰 Make your money work for you!",
];

function DashboardHeader() {
  const { user } = useUser();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Show current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    }));

    // Cycle quotes every 5 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 shadow-sm border-b bg-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Branding + Quote */}
        <div>
          <h2 className="text-2xl font-bold text-[#5e503f]">
            SumUp your way, save every day!
          </h2>
          <p className="text-sm text-gray-600 ">{motivationalQuotes[quoteIndex]}</p>
          <p className="text-xs text-gray-500">{currentDate}</p>
        </div>



        {/* User */}
        <div className="mt-2 md:mt-0">
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
