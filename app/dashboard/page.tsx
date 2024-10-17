"use client";

import { useState } from "react";
import AiInterviewForm from "./_components/AiInterviewForm";

// const Dashboard: React.FC = () => {
//   return (
//     // <div className="flex flex-col border border-gray-400 p-6 w-72 rounded-sm items-center justify-center bg-slate-100">
//     //   <h2 className="text-lg ">Start Interview</h2>
//     //   <h2 className="text-sm text-gray-500 "> create a new interview with AI</h2>
//     //   <div>
//     //     <AiInterviewForm />
//     //   </div>
//     // </div>
//   );
// };

// export default Dashboard;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Clock, Calendar, BarChart, Play } from "lucide-react";
import Link from "next/link";
import Header from "./_components/Header";
import AuthPages from "@/screens/AuthPages";
import { useSession } from "@clerk/nextjs";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // console.log('useSession()', useSession())

  const previousInterviews = [
    {
      id: 1,
      title: "Software Engineering",
      date: "2023-10-15",
      duration: "45 min",
      score: 85,
    },
    {
      id: 2,
      title: "Data Science",
      date: "2023-10-10",
      duration: "60 min",
      score: 92,
    },
    {
      id: 3,
      title: "Product Management",
      date: "2023-10-05",
      duration: "50 min",
      score: 78,
    },
  ];

  if (!isLoggedIn) return <AuthPages />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Interview AI Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Ready for your next mock interview?
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Interview Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/50 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                Start New Interview
              </CardTitle>
              <Play className="h-6 w-6 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Choose a role and start your AI-powered mock interview.
              </p>
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> New Interview
              </Button>
            </CardContent>
          </Card>

          {/* Previous Interviews */}
          {previousInterviews.map((interview) => (
            <Card
              key={interview.id}
              className="bg-white/50 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {interview.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-indigo-500"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">View details</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    {interview.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4" />
                    {interview.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Score
                  </span>
                  <div className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-indigo-500" />
                    <span className="font-bold text-indigo-500">
                      {interview.score}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Total Interviews",
            "Avg. Score",
            "Highest Score",
            "Interview Time",
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/30 backdrop-blur-sm border-none shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {index === 0 && "24"}
                  {index === 1 && "85%"}
                  {index === 2 && "96%"}
                  {index === 3 && "14.5 hrs"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 bg-white/50 backdrop-blur-lg border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                "Completed Software Engineering interview",
                "Reviewed feedback for Data Science interview",
                "Scheduled Product Management interview",
                "Improved score in System Design interview",
              ].map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <p className="text-sm text-gray-600">{activity}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
