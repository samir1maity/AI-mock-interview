/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { run } from "../utils/geminiAIModel";
import { useRouter } from "next/navigation";
import {
  Send,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
// import { Textarea } from '@/components/ui/textarea'
// import { Progress } from '@/components/ui/progress'

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

const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { interviewId } = useParams();
  const { session } = useSession();
  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier, firstName, lastName } = publicUserData;
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = loadMessagesFromLocalStorage();
    return savedMessages.length > 0
      ? savedMessages
      : [
          {
            id: 1,
            content: `Hello ${firstName} ${lastName}! I'm your AI interviewer. Let's begin the mock interview. What position are you applying for?`,
            sender: "ai",
          },
        ];
  });

  const [input, setInput] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearOfExp, setYearOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [notes, setNotes] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    saveMessagesToLocalStorage(messages);
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await fetch(
          `/api/interview/?identifier=${identifier}&interviewId=${interviewId}`
        );
        if (!response.ok) throw new Error("Failed to fetch interview details");
        const data = await response.json();
        console.log("data", data);
        setJobRole(data.response.jobRole);
        setJobDescription(data.response.jobDescription);
        setYearOfExperience(data.response.experienceYears);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    fetchInterviewDetails();
  }, []);

  const generateAiResponse = async (inputPrompt: string) => {
    console.log("inputPrompt", inputPrompt);
    const formattedPrompt = `You are an AI interviewer for ${jobRole} with ${yearOfExp} years of experience. Job description: ${jobDescription}.\n\nask most ralevent interview questions.\n\nConversation history:\n${messages
      .map((msg) => `- ${msg.content}`)
      .join("\n")}\n\n${inputPrompt}\n\ngive response in json format`;
    try {
      console.log("formattedPrompt", formattedPrompt);
      const result = await run(formattedPrompt);
      const data = result.replace("```json", "").replace("```", "");
      console.log("data", data);
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

  const handleEndChatSession = async () => {
    let input = `give feedback basis of total history of interview, response should be json format and only fields need feedback, improvements, rating out of 10`;
    const temp = await generateAiResponse(input);
    localStorage.removeItem("currentChatSession");
    router.push(`/dashboard/interview/${interviewId}/feedback`);
    setMessages([]);
  };

  return (
    // <div className="flex flex-col h-screen bg-indigo-500 text-white">
    //   <header className="bg-indigo-600 p-4 text-center">
    //     <h1 className="text-2xl font-bold">AI Mock Interview</h1>
    //   </header>
    //   <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //     <AnimatePresence>
    //       {messages.map((message) => (
    //         <motion.div
    //           key={message.id}
    //           initial={{ opacity: 0, y: 50 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           exit={{ opacity: 0, y: -50 }}
    //           transition={{ duration: 0.3 }}
    //           className={`flex ${
    //             message?.sender === "user" ? "justify-end" : "justify-start"
    //           }`}
    //         >
    //           <div
    //             className={`max-w-[80%] p-3 rounded-lg ${
    //               message?.sender === "user" ? "bg-indigo-400" : "bg-indigo-600"
    //             }`}
    //           >
    //             {message.content}
    //           </div>
    //         </motion.div>
    //       ))}
    //     </AnimatePresence>
    //     <div ref={messagesEndRef} />
    //   </div>
    //   <div className="p-4 bg-indigo-600">
    //     <div className="flex space-x-2">
    //       <input
    //         type="text"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         onKeyPress={(e) => e.key === "Enter" && handleSend()}
    //         placeholder="Type your answer..."
    //         className="flex-1 bg-indigo-500 text-white placeholder-indigo-300 border border-indigo-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
    //         aria-label="Type your answer"
    //       />
    //       <button
    //         onClick={handleSend}
    //         className="bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white"
    //         aria-label="Send message"
    //       >
    //         <Send size={20} />
    //       </button>
    //       <button onClick={handleEndChatSession}>End Interview</button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        {sidebarOpen && (
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Interview Progress</h2>
            {/* <Progress value={(currentStage / (interviewStages.length - 1)) * 100} className="mb-4" /> */}
            {/* <ScrollArea className="flex-grow mb-4">
              <ul className="space-y-2">
                {interviewStages.map((stage, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {index <= currentStage ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={index <= currentStage ? 'text-black' : 'text-gray-500'}>{stage}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea> */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Interview Tips</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Be concise and specific in your answers</li>
                <li>Provide examples to support your points</li>
                <li>Ask for clarification if needed</li>
                <li>Stay calm and take your time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <Textarea
                placeholder="Take notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-32 resize-none"
              />
            </div>
          </div>
        )}
      </aside>
      <main className="flex flex-col flex-grow">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 text-white hover:bg-gray-800"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <h1 className="text-xl font-bold text-gray-800">AI Interview</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-800 border-white hover:bg-white hover:text-black"
          >
            End Interview
          </Button>
        </header>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message?.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message?.sender === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-white text-black border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {message?.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-black border border-gray-200 max-w-[80%] p-3 rounded-lg rounded-bl-none">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <footer className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2 max-w-3xl mx-auto">
            <Input
              type="text"
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-black text-white rounded-full hover:bg-gray-800"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Chat;
