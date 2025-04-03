import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function SideNav() {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid },
    { id: 2, name: "Budgets", icon: PiggyBank },
    { id: 3, name: "Expenses", icon: ReceiptText },
    { id: 4, name: "Upgrade", icon: ShieldCheck },
  ];

  return (
    <div className="h-screen p-5 border shadow-sm">
      {/* Logo */}
      <div className="flex justify-center pr-6">
        <Image src="/logo.svg" alt="logo" width={100} height={50} />
      </div>

      {/* Navigation List */}
      <div className="mt-5">
        {menuList.map((menu) => (
          <h2
            key={menu.id}
            className="flex gap-2 items-center text-gray-700 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-600 hover:bg-blue-100"
          >
            <menu.icon className="w-5 h-5" />
            {menu.name}
          </h2>
        ))}
      </div>

      {/* User Button with Increased Size */}
      <div className="fixed bottom-10 left-15">
        <div className="scale-150"> {/* ✅ Scales the UserButton */}
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
