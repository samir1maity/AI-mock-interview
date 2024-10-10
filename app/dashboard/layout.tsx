import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
