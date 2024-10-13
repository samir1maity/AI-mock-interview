import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";

const RecordInterviewSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <Webcam mirrored={true} style={{ height: "300px", width: "100%" }} />
      </div>
      <Button>Start Recording</Button>
    </div>
  );
};

export default RecordInterviewSection;
