'use client'

import { useState } from 'react'
import { Send, Loader2, X, ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

type Message = {
  id: number
  text: string
  sender: 'user' | 'ai'
}

const interviewStages = [
  "Introduction",
  "Background",
  "Technical Skills",
  "Behavioral Questions",
  "Case Study",
  "Your Questions"
]

export default function InterviewChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI interviewer. Let's begin the interview. Please introduce yourself.", sender: 'ai' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentStage, setCurrentStage] = useState(0)
  const [notes, setNotes] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }])
      setInput('')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { id: prev.length + 1, text: "Thank you for sharing. Here's my next question...", sender: 'ai' }])
        setCurrentStage(stage => Math.min(stage + 1, interviewStages.length - 1))
      }, 2000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        {sidebarOpen && (
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Interview Progress</h2>
            <Progress value={(currentStage / (interviewStages.length - 1)) * 100} className="mb-4" />
            <ScrollArea className="flex-grow mb-4">
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
            </ScrollArea>
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
      </div>
      <div className="flex flex-col flex-grow">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 text-white hover:bg-gray-800"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <h1 className="text-xl font-bold">AI Interview</h1>
          </div>
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black">
            End Interview
          </Button>
        </header>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white text-black border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.text}
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
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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
        </div>
      </div>
    </div>
  )
}