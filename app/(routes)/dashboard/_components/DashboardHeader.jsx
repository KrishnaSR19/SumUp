import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return <div className="p-5 shadow-sm border-b flex justify-between">
    <div className="font-bold text-2xl text-[#5e503f]">
    SumUp your way, save every day...
    </div>
    <div>
        <UserButton/>
    </div>
  </div>;
}

export default DashboardHeader;
