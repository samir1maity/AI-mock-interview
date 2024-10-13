import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="">{children}</div>
    </div>
  );
};

export default DashboardLayout;
