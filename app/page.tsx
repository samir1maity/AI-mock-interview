/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BrainCircuit } from "lucide-react";
import Header from "./dashboard/_components/Header";
import Link from "next/link";
import { useSession } from "@clerk/nextjs";

export default function Home() {
  console.log("useSession()", useSession());
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'>
      <Header />
      <main className='container mx-auto px-8 pb-4 pt-4 md:pt-0 md:pb-4 flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 md:pr-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-6'>
            Ace Your Next Interview with AI
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            Practice makes perfect. Our AI-powered mock interviews help you
            prepare for your dream job with realistic scenarios and instant
            feedback.
          </p>
          <Link href='/dashboard'>
            <Button
              size='lg'
              className='bg-indigo-600 hover:bg-indigo-700 text-white'>
              Start Your Free Interview
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className='md:w-1/2 mt-12 md:mt-0'>
          <div className='relative'>
            <div className='absolute inset-0 bg-indigo-300 rounded-full filter blur-2xl opacity-30'></div>
            <svg
              className='relative z-10 w-full h-auto'
              viewBox='0 0 200 200'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fill='#4F46E5'
                d='M39.5,-65.3C50.2,-56.7,57.7,-44.3,65.1,-31.1C72.5,-17.9,79.8,-3.9,78.9,9.6C78,23.1,68.9,36.1,58.1,47.1C47.3,58.2,34.7,67.4,20.6,71.9C6.4,76.4,-9.3,76.2,-22.6,71.1C-35.9,66,-46.8,56,-56.6,44.6C-66.4,33.2,-75,20.3,-77.4,6.1C-79.8,-8.1,-75.9,-23.7,-67.8,-36.6C-59.6,-49.5,-47.1,-59.7,-34,-67.1C-20.9,-74.5,-7.3,-79.1,4.4,-76.1C16.1,-73.1,28.8,-62.5,39.5,-65.3Z'
                transform='translate(100 100)'
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <BrainCircuit className='w-1/2 h-1/2 text-indigo-100 z-20' />
            </div>
          </div>
        </div>
      </main>
      <div className='my-8 mx-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
            <feature.icon className='h-8 w-8 text-indigo-600 mb-4' />
            <h3 className='text-lg font-semibold text-gray-900'>
              {feature.name}
            </h3>
            <p className='mt-2 text-gray-500'>{feature.description}</p>
          </div>
        ))}
      </div>
      <footer className='bg-blue-800 text-white py-8'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
              <h3 className='text-lg font-semibold'>InterviewAI</h3>
              <p className='text-sm text-blue-200'>
                Empowering your career journey
              </p>
            </div>
            <div className='flex space-x-4'>
              <Link
                href='#'
                className='text-blue-200 hover:text-white transition-colors'>
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-blue-200 hover:text-white transition-colors'>
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-blue-200 hover:text-white transition-colors'>
                Contact Us
              </Link>
            </div>
          </div>
          <div className='mt-8 text-center text-sm text-blue-200'>
            © {new Date().getFullYear()} InterviewAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    name: "Realistic Scenarios",
    description:
      "Experience interviews tailored to your industry and job level.",
    icon: Bot,
  },
  {
    name: "Instant Feedback",
    description:
      "Receive detailed analysis and improvement suggestions after each session.",
    icon: ArrowRight,
  },
  {
    name: "Flexible Practice",
    description: "Train anytime, anywhere, and as often as you need.",
    icon: Bot,
  },
];
