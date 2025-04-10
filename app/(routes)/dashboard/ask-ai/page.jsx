"use client";

import Image from "next/image";
import React from "react";


function AskAiPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/gemini.svg"
                  alt="Gemini AI"
                  width={20}
                  height={20}
                />
        <h1 className="text-2xl font-bold text-gray-800">Ask with AI</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600 text-lg">
          Hello 👋! You can ask anything related to your finances, budgeting, or expenses. 
          I’ll try to assist you smartly!
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Type your question..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Placeholder: Add AI response box below */}
        </div>
      </div>
    </div>
  );
}

export default AskAiPage;
