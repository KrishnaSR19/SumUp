"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Features from "./Features";
import { ThumbsUp, ShieldCheck, Zap } from "lucide-react";
import useDarkMode from "../_hooks/useDarkMode";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="flex flex-col items-center">
        <div className="w-full max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Manage Your Expense <br />
            <span className="text-indigo-600">Control Your Money</span>
          </h1>

          <p className="mt-4 text-base text-gray-700 dark:text-gray-300 sm:text-lg max-w-2xl mx-auto">
            Easily manage your income, expenses, and savings — all in one place.
            Get real-time insights, set smart budgets, and stay in control of your finances.
          </p>

          {!isSignedIn && (
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="/sign-in"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-block rounded-lg border border-indigo-600 px-6 py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                Learn More
              </a>
            </div>
          )}
        </div>

        {/* Dynamic Hero Image */}
        <img
          src={isDarkMode ? "/dashboard_black.png" : "/dashboard_white.png"}
          alt="Dashboard preview"
          width={1000}
          height={500}
          className="-mt-8 rounded-xl border shadow-md"
        />

        <div className="mt-5">
          <Features />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white dark:bg-gray-950 py-20 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            Why Choose SumUp?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Designed with simplicity and power in mind, we help you master your finances effortlessly.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-indigo-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                Secure and Private
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Your data is encrypted and protected with bank-grade security.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-10 h-10 text-indigo-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                Smart Automation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Automatically categorize transactions and get AI-powered insights.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-10 h-10 text-indigo-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                User Friendly
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Intuitive design made for everyone—from students to professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 dark:bg-gray-800 py-20 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            What Users Are Saying
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { quote: "This app helped me save ₹5,000 in just two months!", name: "Aarav M." },
              { quote: "Simple, elegant, and powerful. Best budgeting app I’ve used.", name: "Mrudula T." },
              { quote: "ExpenseEase keeps me on track with my monthly goals.", name: "Rohit S." }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border dark:border-gray-700"
              >
                <p className="text-gray-700 dark:text-gray-300 italic">“{testimonial.quote}”</p>
                <p className="mt-4 font-semibold text-indigo-600">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to take control of your finances?</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Join thousands who use SumUp to budget smarter and grow their savings.
        </p>
        {!isSignedIn && (
          <div className="mt-6">
            <a
              href="/sign-in"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Free Today
            </a>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full bg-indigo-50 dark:bg-gray-800 border-t dark:border-gray-700 mt-12 py-6 px-4 text-center">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} SumUp. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="mailto:support@expenseease.com" className="hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
