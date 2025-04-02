import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

function SideNav() {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid },
    { id: 2, name: "Budgets", icon: PiggyBank },
    { id: 3, name: "Expenses", icon: ReceiptText },
    { id: 4, name: "Upgrade", icon: ShieldCheck },
  ];

  return (
    <>
      <div className="h-screen p-5 border shadow-sm">
        <Image src={"/logo.svg"} alt="logo" width={100} height={50} />
      </div>

      <div>
        {menuList.map((menu) => (
          <h2 key={menu.id}>
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </>
  );
}

export default SideNav;
