/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { run } from "../utils/geminiAIModel";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

interface PublicUserData {
  identifier?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

const saveMessagesToLocalStorage = (messages: Message[]) => {
  localStorage.setItem("currentChatSession", JSON.stringify(messages));
};

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem("currentChatSession");
  return savedMessages ? JSON.parse(savedMessages) : [];
};

/**
 *
 * user details need to save in localstorage
 *
 */

const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { interviewId } = useParams();
  const { session } = useSession();
  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier, firstName, lastName } = publicUserData;

  const [messages, setMessages] = useState<Message[]>(
    loadMessagesFromLocalStorage() || [
      {
        id: 1,
        content: `Hello ${firstName} ${lastName} ! I'm your AI interviewer. Let's begin the mock interview. What position are you applying for?`,
        sender: "ai",
      },
    ]
  );
  const [input, setInput] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearOfExp, setYearOfExperience] = useState("");
  // const [initialPrompt, setInitialPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to scroll to the latest message and save to local storage
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    saveMessagesToLocalStorage(messages);
  };

  useEffect(scrollToBottom, [messages]);

  // Initialize interview details and set up initial prompt
  useEffect(() => {
    const initializeChat = async () => {
      try {
        await fetchInterviewDetails();
        // setupInitialPrompt();
        // initiateChat();
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initializeChat();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const response = await fetch(
        `/api/interview/?identifier=${identifier}&interviewId=${interviewId}`
      );
      if (!response.ok) throw new Error("Failed to fetch interview details");
      const data = await response.json();
      console.log("data", data);
      setJobRole(data.jobRole || "");
      setJobDescription(data.jobDescription || "");
      setYearOfExperience(data.yearOfExp || "");
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  // const setupInitialPrompt = () => {
  //   setInitialPrompt(
  //     `generate a question related to ${jobRole} and ${jobDescription} and ${yearOfExp} years of experience. Generate 3 questions, then give feedback on all responses.`
  //   );
  // };

  // const initiateChat = async () => {
  //   setLoading(true);
  //   try {
  //     const aiData = await generateAiResponse(initialPrompt);
  //     await sendAiMessage(aiData.question);
  //   } catch (error) {
  //     console.error("Error in initial AI message:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const generateAiResponse = async (inputPrompt: string) => {
    const formattedPrompt = `You are an AI interviewer for ${jobRole} with ${yearOfExp} years of experience. Job description: ${jobDescription}.\n\nConversation history:\n${messages
      .map((msg) => `- ${msg.content}`)
      .join("\n")}\n\n${inputPrompt}\n\nAsk the next question.`;
    try {
      const result = await run(formattedPrompt);
      const data = result.replace("```json", "").replace("```", "");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  };

  const sendAiMessage = async (content: string) => {
    try {
      const response = await fetch(`/api/chat/${interviewId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          identifier: "ai",
          isAi: true,
          isUser: false,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      setMessages((prev) => [...prev, data.response]);
    } catch (error) {
      console.error("Error sending AI message:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput("");
    setLoading(true);

    try {
      // Send user message
      const userMessage = await fetch(`/api/chat/${interviewId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: input,
          identifier: "user",
          isAi: false,
          isUser: true,
        }),
      });
      const userResponse = await userMessage.json();
      console.log("userResponse", userResponse);
      setMessages((prev) => [...prev, userResponse.response]);

      // Generate and send AI response
      const aiData = await generateAiResponse(input);
      await sendAiMessage(aiData.question);
    } catch (error) {
      console.error("Error in handleSend:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndChatSession = () => {
    localStorage.removeItem("currentChatSession");
    setMessages([]);
  };

  return (
    <div className='flex flex-col h-screen bg-indigo-500 text-white'>
      <header className='bg-indigo-600 p-4 text-center'>
        <h1 className='text-2xl font-bold'>AI Mock Interview</h1>
      </header>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-indigo-400" : "bg-indigo-600"
                }`}>
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 bg-indigo-600'>
        <div className='flex space-x-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder='Type your answer...'
            className='flex-1 bg-indigo-500 text-white placeholder-indigo-300 border border-indigo-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label='Type your answer'
          />
          <button
            onClick={handleSend}
            className='bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label='Send message'>
            <Send size={20} />
          </button>
          <button onClick={handleEndChatSession}>End Interview</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
