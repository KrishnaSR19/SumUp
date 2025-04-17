"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import useDarkMode from "../_hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

function Header() {
  const { user, isSignedIn } = useUser();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md rounded-sm bg-slate-100 dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <Link href="/">
        <Image
          src={isDarkMode?"/logo_white.png":"/logo_black.png"}
          alt="logo"
          width={100}
          height={50}
          priority
          style={{ height: "auto" }}
        />
      </Link>

      {/* Right-side buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        {/* <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border dark:border-gray-600 border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          )}
        </button> */}

        {/* Auth Button */}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button className="border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
