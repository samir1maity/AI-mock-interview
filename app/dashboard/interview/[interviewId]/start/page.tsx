'use client'
import React, { useState } from "react";
import Questions from "./_components/Questions";
import RecordInterviewSection from "./_components/RecordInterviewSection";

const StartInterview: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {/* Questions */}
      <Questions activeQuestion={activeQuestion} />
      {/* video / audio recordings */}
      <RecordInterviewSection activeQuestion={activeQuestion} />
    </div>
  );
};

export default StartInterview;
