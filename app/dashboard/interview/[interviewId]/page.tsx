/** @format */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Camera, Play } from "lucide-react";
import Webcam from "react-webcam";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function InterviewPage() {
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);
  // const router = useRouter();
  const params = useParams();

  console.log("params", params);

  // const startInterview = () => {
  //   router.push(`dashborad/interview/${params.interviewId}/start`);
  // };

  const toggleWebcam = () => {
    setWebcamEnabled((p) => !p);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 transform transition-all hover:scale-105'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
          Virtual Interview
        </h1>

        <div className='space-y-4 sm:space-y-6'>
          <Link href={`${params.interviewId}/start`}>
            <Button
              // onClick={startInterview}
              className='w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-purple-300 focus:outline-none'>
              <Play className='mr-2 h-5 w-5 sm:h-6 sm:w-6' /> Start Interview
            </Button>
          </Link>

          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0'>
            <div className='flex items-center space-x-2'>
              <Camera className='h-4 w-4 sm:h-5 sm:w-5 text-indigo-500' />
              <span className='text-sm sm:text-base text-indigo-500 font-medium'>
                Enable Webcam
              </span>
            </div>
            <Switch
              checked={webcamEnabled}
              onCheckedChange={toggleWebcam}
              className='data-[state=checked]:bg-indigo-500'
            />
          </div>
        </div>

        {webcamEnabled && (
          <div className='mt-4 bg-gray-200 rounded-lg p-3 sm:p-4 text-center'>
            <p className='text-sm sm:text-base text-indigo-500'>
              Webcam is now active
            </p>
            {/* Add your webcam component or placeholder here */}
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
