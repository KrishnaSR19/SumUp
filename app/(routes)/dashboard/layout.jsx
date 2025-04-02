import React from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
  console.log(SideNav);
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64 bg-amber-900">
        {children}
        </div>
    </div>
  );
}

export default DashboardLayout;
