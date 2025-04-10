"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function SideNav() {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { id: 3, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
    {
      id: 4,
      name: "Manage with AI",
      icon: () => (
        <Image
          src="/gemini.svg"
          alt="Gemini AI"
          width={20}
          height={20}
        />
      ),
      path: "/dashboard/ask-ai",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm bg-slate-100">
      {/* Logo */}
      <div className="flex justify-center pr-6">
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={50}
            priority
            style={{ height: "auto" }}
          />
        </Link>
      </div>

      {/* Navigation List */}
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id} className="block">
            <h2
              className={`flex gap-2 items-center mb-2 text-gray-700 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-600 hover:bg-blue-100
              ${path === menu.path ? "text-indigo-600 bg-blue-100" : ""}`}
            >
              <menu.icon className="w-5 h-5" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* User Button with Increased Size */}
      <div className="fixed bottom-10 left-15 scale-130">
        <UserButton />
      </div>
    </div>
  );
}

export default SideNav;
