"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
import { useUser } from "@clerk/nextjs";

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyA-f6-cEkfoOhZIZF1SU06mek2y8ggCBYk",
});

export default function AskAiPage() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    const userMessage = {
      sender: "user",
      message: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      const geminiResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (geminiResponse) {
        const assistantMessage = {
          sender: "assistant",
          message: geminiResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setChats((prev) => [...prev, userMessage, assistantMessage]);
        setInput("");
      } else {
        throw new Error("No response received.");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("Something went wrong. Please check your API key or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="bg-slate-200 dark:bg-gray-900 transition-colors">
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-900 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image src="/gemini.svg" alt="Gemini AI" width={24} height={24} />
            <h1 className="text-4xl font-bold text-blue-700 dark:text-white">Ask with AI</h1>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 dark:bg-gray-900 rounded-lg">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Hi {user?.fullName}. Start by asking a question.
            </div>
          ) : (
            chats.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 text-sm shadow-sm transition-all ${
                    chat.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 gap-4">
                    <span className="font-semibold">
                      {chat.sender === "user" ? "You" : "Gemini"}
                    </span>
                    <span className="text-xs text-gray-300 dark:text-gray-400 whitespace-nowrap">
                      {chat.time}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{chat.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-4 z-10 flex justify-center px-4">
          <div className="relative w-full max-w-3xl">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="w-full pr-14 p-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-slate-300 dark:bg-gray-700 dark:text-white resize-none"
              rows={3}
            />
            <button
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className="absolute bottom-3 right-3 w-10 h-10 p-2 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="text-white text-xs animate-pulse">...</span>
              ) : (
                <Image src="/send.svg" alt="Send" width={20} height={20} priority />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}
