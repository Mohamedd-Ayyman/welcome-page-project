import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar.jsx";
import MobileNav from "./mobileNav.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 min-h-screen">
        {children || <Outlet />}
      </main>
      <MobileNav />
    </div>
  );
}
