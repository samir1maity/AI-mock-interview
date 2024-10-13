"use client";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

const RecordInterviewSection: React.FC = () => {
  const [userAnswer, setUserAnswer] = useState<string>("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  interface SpeechResult {
    transcript: string;
    timestamp: number;
  }

  useEffect(() => {
    (results as SpeechResult[]).map((result) => {
      setUserAnswer((p) => p + result?.transcript);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <Webcam mirrored={true} style={{ height: "300px", width: "100%" }} />
      </div>
      <Button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? (
          <h2 className="flex gap-1">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Start Recording"
        )}
      </Button>
    </div>
  );
};

export default RecordInterviewSection;
