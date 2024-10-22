/** @format */

import React, { useState, useRef, useEffect } from "react";
import { Send, PlusCircle, Paperclip, ChevronUp } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ModernChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. What can I help you ship today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setTimeout(() => {
        const botReply: Message = {
          id: messages.length + 2,
          text: getBotReply(input),
          sender: "bot",
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  const getBotReply = (userInput: string): string => {
    const replies = [
      "That's an interesting project! Can you tell me more about it?",
      "I'd be happy to help you ship that. What's your first step?",
      "Great idea! Let's break that down into manageable tasks.",
      "I can certainly assist with that. What's your timeline for this project?",
      "Excellent choice! What resources do you have available for this?",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <div className='flex flex-col h-screen bg-gradient-to-br from-teal-500 to-blue-600 text-white'>
      <header className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4'>
        <h1 className='text-2xl font-bold text-center'>
          AI Shipping Assistant
        </h1>
      </header>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-white bg-opacity-20"
                  : "bg-white bg-opacity-10"
              }`}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg'>
        <div className='flex items-center space-x-2'>
          <button className='text-white opacity-70 hover:opacity-100 transition-opacity'>
            <PlusCircle size={24} />
          </button>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder='What do you want to ship?'
            className='flex-1 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white'
          />
          <button className='text-white opacity-70 hover:opacity-100 transition-opacity'>
            <Paperclip size={24} />
          </button>
          <button
            onClick={handleSend}
            className='bg-white text-teal-500 rounded-full p-2 hover:bg-opacity-90 transition-colors'>
            <Send size={20} />
          </button>
        </div>
        <div className='mt-4 flex justify-between text-sm text-white text-opacity-70'>
          <button className='hover:text-opacity-100 transition-colors'>
            Generate a SaaS pricing calculator
          </button>
          <button className='hover:text-opacity-100 transition-colors'>
            How can I structure LLM output?
          </button>
          <button className='hover:text-opacity-100 transition-colors'>
            Calculate the factorial of a number
          </button>
        </div>
      </div>
      <div className='bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-2 flex justify-center'>
        <button className='text-white opacity-70 hover:opacity-100 transition-opacity flex items-center'>
          <ChevronUp size={20} />
          <span className='ml-1'>Upgrade Plan</span>
        </button>
      </div>
    </div>
  );
};

export default ModernChatbot;
