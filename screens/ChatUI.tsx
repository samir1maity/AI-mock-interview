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
  text: string;
  sender: "user" | "ai";
}

interface PublicUserData {
  identifier?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { interviewId } = useParams();
  const { session } = useSession();
  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier, firstName, lastName } = publicUserData;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${firstName} ${lastName} ! I'm your AI interviewer. Let's begin the mock interview. What position are you applying for?`,
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [jobRole, setJobRole] = useState("frontend");
  const [jobDescription, setJobDescription] = useState("react, redux");
  const [yearOfExp, setYearOfExperience] = useState("0");
  const [initialPrompt, setInitialPrompt] = useState(
    `generate a question related to ${jobRole} and ${jobDescription} and this much ${yearOfExp}. when you generated 3 question give feedback from all history`
  );
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initiateChat = async () => {
      setLoading(true);
      try {
        const aiData = await handleChatStart(initialPrompt);
        const aiMessageId = Date.now();
        const aiMessage: Message = {
          id: aiMessageId,
          text: aiData.question,
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error in initial AI message:", error);
      } finally {
        setLoading(false);
      }
    };

    initiateChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // const messageId = Date.now();

    // const userMessage: Message = {
    //   id: messageId,
    //   text: input,
    //   sender: "user",
    // };
    // setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);
    const messageData = await fetch(`/api/chat/${interviewId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // id: messageId,
        content: input,
        sender: identifier,
        isAi: false,
        isUser: true,
      }),
    });
    const result = await messageData.json();
    console.log("result", result);
    try {
      const aiData = await handleChatStart(input);
      // const aiMessageId = Date.now();
      console.log("it is after user send response", aiData);
      // const aiMessage: Message = {
      //   id: aiMessageId,
      //   text: aiData.question,
      //   sender: "ai",
      // };
      const res = await fetch(`/api/chat/${interviewId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // id: messageId,
          content: aiData.question,
          sender: "ai",
          isAi: true,
          isUser: false,
        }),
      });
      // setMessages((prev) => [...prev, aiMessage]);
      const temp = await res.json();
      console.log("temp", temp);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleChatStart(inputPrompt: string) {
    console.log("inputPrompt", inputPrompt);
    const newPrompt = `You are an AI interviewer. ${jobRole}, ${yearOfExp} years of experience. Here's the job description: ${jobDescription}\n\nConversation history:\n${messages
      .map((msg) => `- ${msg.text}`)
      .join("\n")}\n\n${inputPrompt}\n\nAsk the next question.`;
    const result = await run(newPrompt);
    const data = result.replace("```json", "").replace("```", "");
    const temp = JSON.parse(data);
    console.log("generated res", temp);
    return temp;
  }

  async function fetchInterviewDetails() {
    try {
      const interviewDetails = await fetch(
        `/api/interview/?identifier=${identifier}&interviewId=${interviewId}`,
        {
          method: "GET",
        }
      );
      const response = await interviewDetails.json();
      console.log("response", response);
    } catch (error) {
      console.log("error occurs in chatUI page", error);
    }
  }

  console.log("messages", messages);

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
                {message.text}
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
