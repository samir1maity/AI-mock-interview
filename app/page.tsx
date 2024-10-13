"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Header />
      <div className="container mx-auto px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Ace Your Next Interview with AI
            </h1>
            <p className="my-6 text-xl text-gray-500">
              Practice makes perfect. Our AI-powered mock interviews help you
              prepare for your dream job with realistic scenarios and instant
              feedback.
            </p>
            <Link href="/dashboard" className="mt-10">
              <Button className="group text-lg" size="lg">
                Start Your Free Interview
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-purple-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
              </div>
              <div className="relative">
                <Bot className="w-full h-auto text-indigo-600 animate-float" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <feature.icon className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
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

// Add this CSS to your global styles or a separate file
const styles = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;
