"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode on first load based on localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  // Update the theme on body element and save the mode to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Show current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }));

    // Cycle quotes every 10 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="  p-5 shadow-sm border-b bg-slate-100 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Branding + Quote */}
        <div>
          <h2 className="text-2xl mb-1 font-bold text-[#5e503f] dark:text-white">
            SumUp your way, save every day!
          </h2>
          <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">
            {motivationalQuotes[quoteIndex]}
          </p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{currentDate}</p>
        </div>

        {/* User */}
        <div className="mt-2 md:mt-0 flex items-center gap-3">
          <UserButton />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              // Moon Icon (for dark mode)
              <span className="text-yellow-500">🌞</span>
            ) : (
              // Sun Icon (for light mode)
              <span className="text-gray-900">🌙</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
