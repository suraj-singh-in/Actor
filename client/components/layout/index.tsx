import React from "react";
import Header from "@/components/layout/header";
import SideBar from "./Sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary pb-1">
          {children}
        </main>
      </div>
    </>
  );
};
