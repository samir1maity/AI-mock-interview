"use client";
import React, { useState } from "react";
import Questions from "./_components/Questions";
import RecordInterviewSection from "./_components/RecordInterviewSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lightbulb,
  Mic,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";

const StartInterview: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const questions = [
    "Tell me about yourself.",
    "What are your greatest strengths?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "Do you have any questions for us?",
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* // <div className="grid grid-cols-1 md:grid-cols-2"> */}
      {/* <Questions activeQuestion={activeQuestion} />
      
      <RecordInterviewSection activeQuestion={activeQuestion} /> */}

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {/* Webcam Section */}
            <Card
              className={`bg-white/80 backdrop-blur-lg shadow-xl ${
                isFullscreen ? "fixed inset-0 z-50" : ""
              }`}
            >
              <CardContent className="p-4">
                <div
                  className={`relative ${
                    isFullscreen ? "h-full" : "h-32 sm:h-48 md:h-64"
                  }`}
                >
                  {isCameraOn ? (
                    <video
                      className="w-full h-full rounded-lg object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                      <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/50"
                      onClick={toggleFullscreen}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/50"
                      onClick={() => setIsCameraOn(!isCameraOn)}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Section */}
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentQuestion === index + 1 ? "default" : "outline"
                      }
                      className={`w-8 h-8 rounded-full text-xs ${
                        currentQuestion === index + 1
                          ? "bg-indigo-500 text-white"
                          : "bg-white text-gray-600"
                      }`}
                      onClick={() => setCurrentQuestion(index + 1)}
                    >
                      Q{index + 1}
                    </Button>
                  ))}
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Question {currentQuestion}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {questions[currentQuestion - 1]}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-indigo-600 border-indigo-600"
                  >
                    <Mic className="w-3 h-3 mr-1" />
                    Listen
                  </Button>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg flex items-start space-x-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-indigo-800 mb-1 text-xs">
                      Tip:
                    </h3>
                    <p className="text-xs text-indigo-700">
                      Use STAR: Situation, Task, Action, Result.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 1}
                    className="bg-indigo-500 text-white hover:bg-indigo-600"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Prev
                  </Button>
                  <Button variant="destructive" size="sm" className="px-2">
                    <X className="w-4 h-4" />
                    End
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === questions.length}
                    className="bg-indigo-500 text-white hover:bg-indigo-600"
                    size="sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default StartInterview;
