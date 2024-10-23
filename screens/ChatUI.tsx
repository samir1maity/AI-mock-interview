'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI interviewer. Let's begin the mock interview. What position are you applying for?", sender: 'ai' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' }
      setMessages([...messages, newMessage])
      setInput('')
      setTimeout(() => {
        const aiReply: Message = { id: messages.length + 2, text: getAIReply(input), sender: 'ai' }
        setMessages(prev => [...prev, aiReply])
      }, 1000)
    }
  }

  const getAIReply = (userInput: string): string => {
    // This is a mock AI response. In a real application, you'd integrate with an AI service.
    const replies = [
      "That's an interesting point. Can you elaborate on that?",
      "How would you handle a situation where...?",
      "What experience do you have with...?",
      "Can you give me an example of a time when you...?",
      "What do you think are the most important skills for this role?",
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  return (
    <div className="flex flex-col h-screen bg-indigo-500 text-white">
      <header className="bg-indigo-600 p-4 text-center">
        <h1 className="text-2xl font-bold">AI Mock Interview</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-indigo-400' : 'bg-indigo-600'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-indigo-600">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer..."
            className="flex-1 bg-indigo-500 text-white placeholder-indigo-300 border border-indigo-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Type your answer"
          />
          <button
            onClick={handleSend}
            className="bg-white text-indigo-500 rounded-full p-2 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat