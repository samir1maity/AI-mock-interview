'use client'
import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Star, Award, ThumbsUp, ThumbsDown } from "lucide-react"

const interviewData = [
  {
    question: "Tell me about yourself.",
    answer: "I'm a software engineer with 5 years of experience...",
    feedback: "Good overview, but could be more concise.",
    rating: 4,
    improvement: "Try to highlight 2-3 key achievements.",
  },
  {
    question: "What is your greatest strength?",
    answer: "My ability to quickly learn and adapt to new technologies...",
    feedback: "Excellent response with specific examples.",
    rating: 5,
    improvement: "Consider adding a brief anecdote to illustrate your point.",
  },
  // ... (include the rest of the interview data here)
]

export default function EnhancedInterviewReview() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const getOverallScore = () => {
    const totalScore = interviewData.reduce((sum, item) => sum + item.rating, 0)
    return (totalScore / (interviewData.length * 5)) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-md shadow-xl mb-8 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Interview Performance Review</h1>
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-2xl font-semibold text-gray-700">Overall Score: {getOverallScore().toFixed(1)}%</span>
          </div>
          <Progress value={getOverallScore()} className="w-full h-2 bg-gray-200" />
        </Card>
        
        <div className="space-y-4">
          {interviewData.map((item, index) => (
            <Collapsible key={index} open={expandedIndex === index} onOpenChange={() => toggleExpand(index)}>
              <Card className={`bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 ${expandedIndex === index ? 'ring-2 ring-indigo-400' : 'hover:shadow-lg'}`}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 text-left font-medium"
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-2">Q{index + 1}:</span>
                      <span className="text-gray-700">{item.question}</span>
                    </div>
                    {expandedIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 px-4">
                    <div className="mb-4 bg-gray-50 p-3 rounded-md">
                      <h3 className="font-semibold text-gray-700 mb-2">Your Answer:</h3>
                      <p className="text-gray-600 italic">{item.answer}</p>
                    </div>
                    <div className="mb-4 bg-blue-50 p-3 rounded-md">
                      <h3 className="font-semibold text-blue-700 mb-2 flex items-center">
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        Feedback:
                      </h3>
                      <p className="text-blue-600">{item.feedback}</p>
                    </div>
                    <div className="mb-4 bg-green-50 p-3 rounded-md">
                      <h3 className="font-semibold text-green-700 mb-2 flex items-center">
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        Room for Improvement:
                      </h3>
                      <p className="text-green-600">{item.improvement}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-700 mr-2">Rating:</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-600">
                        Practice Again
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  )
}