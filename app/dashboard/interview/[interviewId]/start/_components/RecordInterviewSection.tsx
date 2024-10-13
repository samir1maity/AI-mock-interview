"use client";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/geminiAIModel";
import { Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

type QuestionData = {
  category: string;
  difficulty: string;
  question: string;
  explanation: string;
};

/*
 * hardcoded response (interview questions)
 */
const data: QuestionData[] = [
  {
    category: "Next.js Fundamentals",
    difficulty: "Medium",
    question:
      "Describe the process of routing requests in a Next.js application. How does it differ from routing in a traditional web application framework?",
    explanation:
      "This question tests understanding of Next.js's file-system based routing and how it contrasts with traditional server-side routing. The candidate should be able to explain how Next.js handles routing on the client and server side, as well as concepts like dynamic routes and nested routing.",
  },
  {
    category: "Next.js Concepts",
    difficulty: "Medium",
    question:
      "Explain the concept of Server-Side Rendering (SSR) in Next.js. What are the benefits of using SSR, and how would you implement it in a practical scenario?",
    explanation:
      "This question assesses the candidate's grasp of SSR, its advantages (e.g., SEO, faster initial load times), and practical implementation strategies using Next.js features like `getStaticProps` or `getServerSideProps`. The candidate should be able to provide specific examples.",
  },
  {
    category: "Data Management",
    difficulty: "Hard",
    question:
      "How would you handle data fetching and caching in a Next.js application? Discuss the different strategies available and when you would choose each one.",
    explanation:
      "This question delves into data fetching and caching strategies. The candidate should be able to explain techniques like `getStaticProps`, `getServerSideProps`, data fetching libraries like `SWR`, and caching strategies (e.g., in-memory, local storage, server-side caching). They should also be able to justify their choices based on specific scenarios.",
  },
  {
    category: "Next.js API Routes",
    difficulty: "Medium",
    question:
      "Describe a situation where you used Next.js's API routes to build a backend API endpoint. Explain the steps involved in creating the API route and how you handled data validation and error handling.",
    explanation:
      "This question assesses the candidate's experience with building APIs using Next.js API routes. They should be able to describe the process of creating an API route, data validation using middleware or libraries, and implementing error handling mechanisms. They should also be able to provide a practical example.",
  },
  {
    category: "Deployment and Production",
    difficulty: "Hard",
    question:
      "Explain how you would approach deploying a Next.js application to a production environment. What considerations do you need to make regarding server configuration, database setup, and security?",
    explanation:
      "This question explores the candidate's understanding of deploying a Next.js application. They should be able to discuss various deployment options (e.g., Vercel, Netlify, AWS), server configuration (e.g., Node.js, Nginx), database setup (e.g., MongoDB, PostgreSQL), and security considerations (e.g., authentication, authorization, SSL/TLS). They should demonstrate a practical understanding of production-level deployments.",
  },
];

const RecordInterviewSection = ({
  activeQuestion,
}: {
  activeQuestion: number;
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  interface SpeechResult {
    transcript: string;
    timestamp: number;
  }

  /*
   * storing transript texts into a local state
   */
  useEffect(() => {
    (results as SpeechResult[]).map((result) => {
      setUserAnswer((p) => p + result?.transcript);
      console.log("userAnswer", userAnswer);
    });
  }, [results]);

  console.log("userAnswer it is outside", userAnswer);

  /*
   * handler for start and stop recording
   */
  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.trim() === "") {
        toast("something went wrong, try again.");
        return;
      }
      const feedbackPrompt: string = `question: ${data[activeQuestion].question} and its answer is: ${userAnswer}. you have to judge the answer of the corresponding question and rate out of 5 and give some feedback message like where need to improvements in some sort of detail under 50 words. give response in JSON formate`;
      try {
        const response = await chatSession.sendMessage(feedbackPrompt);
        const cleanedResult = await response.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const feedback = JSON.parse(cleanedResult);
        setUserAnswer("");
      } catch (err) {
        toast("Failed to get feedback, please try again.");
        console.error("API Error:", err);
      }
    } else {
      startSpeechToText();
      setUserAnswer("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <Webcam mirrored={true} style={{ height: "300px", width: "100%" }} />
      </div>
      <Button onClick={saveUserAnswer}>
        {isRecording ? (
          <h2 className="flex gap-1">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Start Recording"
        )}
      </Button>
    </div>
  );
};

export default RecordInterviewSection;
