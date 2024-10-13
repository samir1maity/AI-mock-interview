"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { Bluetooth, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
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

const Interview = () => {
  const [webcamEnabled, setWebcamEnabled] = useState<Boolean>(false);

  return (
    <div>
      {webcamEnabled ? (
        <Webcam
          onUserMedia={() => setWebcamEnabled(true)}
          onUserMediaError={() => setWebcamEnabled(false)}
          mirrored={true}
        />
      ) : (
        <Camera onClick={() => setWebcamEnabled(true)} />
      )}
      <Button>Start interview</Button>
    </div>
  );
};

export default Interview;
