"use client";

import { useState } from "react";
import AiInterviewForm from "./_components/AiInterviewForm";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg">Start Interview</h2>
      <h2 className="text-sm text-gray-500"> create a new interview with AI</h2>
      <div>
        <AiInterviewForm/>
      </div>
    </div>
  );
};

export default Dashboard;
