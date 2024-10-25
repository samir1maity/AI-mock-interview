/** @format */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { chatSession } from "../utils/geminiAIModel";

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

  /**
   * Local States
   */
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
  const [yearOfExp, setYearOfExperience] = useState("1");
  const [initialPrompt, setInitialPrompt] = useState(`
You are conducting an AI interview for a candidate applying for the role of ${jobRole} with ${yearOfExp} years of experience. The job description includes ${jobDescription}, and the role involves working with technologies like.
The interview is conversational, generating one question at a time and waiting for the candidate's response before proceeding.
Start with a brief introduction, explaining the process.
Ask questions tailored to the job role, focusing on technical skills, problem-solving, and relevant experience.
Midway, inquire about specific projects the candidate has worked on, including the tech stack and methodologies used.
After a set number of questions, summarize responses and provide feedback on strengths and areas for improvement.
If the candidate's response is off-topic, provide a warning and guide them back to relevant discussion.
Response format should be in JSON.`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // fetchInterviewDetails();
    handleChatStart();
  }, []);

  /**
   * Handle send reponse
   */

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      try {
        const result = await handleChatStart();
        setTimeout(() => {
          const aiReply: Message = {
            id: messages.length + 2,
            text: result,
            sender: "ai",
          };
          setMessages((prev) => [...prev, aiReply]);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /**
   *
   */

  async function handleChatStart() {
    try {
      const inputPrompt = initialPrompt;
      console.log("inputPrompt", inputPrompt);
      const aiGeneratedData = await chatSession.sendMessage(inputPrompt);
      const result = aiGeneratedData.response.text();
      console.log("result", result);
      const data = result.replace("```json", "").replace("```", "");
      const temp = JSON.parse(data);
      console.log("temp", temp);
    } catch (error) {
      console.log("error at generating AI response", error);
    }
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

  useEffect(() => {}, []);

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
