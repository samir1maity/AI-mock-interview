/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/geminiAIModel";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

interface Questions {
  concept: number;
  question_txt: string;
  difficulty: string;
}
interface Props {
  allQuestions: Questions[];
  currentQuestion: number;
}
interface SpeechResult {
  transcript: string;
  timestamp: number;
}

const RecordInterviewSection: React.FC<Props> = ({
  allQuestions,
  currentQuestion,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const { isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    (results as SpeechResult[]).map((result) => {
      console.log("first");
      setUserAnswer((p) => p + result?.transcript);
    });
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.trim() === "") {
        toast("something went wrong, try again.");
        return;
      }
      const feedbackPrompt: string = `question: ${allQuestions[currentQuestion].question_txt} and its answer is: ${userAnswer}. you have to judge the answer of the corresponding question and rate out of 5 and give some feedback message like where need to improvements in some sort of detail under 50 words. give response in JSON formate`;
      try {
        const response = await chatSession.sendMessage(feedbackPrompt);
        const cleanedResult = await response.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        const feedback = JSON.parse(cleanedResult);
        setUserAnswer("");
      } catch (err) {
        toast("Failed to get feedback, please try again.");
        console.error("API Error:", err);
      }
    } else {
      startSpeechToText();
      setUserAnswer("");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <Button onClick={saveUserAnswer}>
        {isRecording ? (
          <h2 className='flex gap-1'>
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Start Recording"
        )}
      </Button>
      <div>{userAnswer}</div>
    </div>
  );
};

export default RecordInterviewSection;
