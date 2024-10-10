import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  console.log('children', children)
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
