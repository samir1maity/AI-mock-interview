/** @format */

"use client";

// import Link from "next/link";
import Header from "./_components/Header";


export default function Dashboard() {
import AiInterviewForm from "./_components/AiInterviewForm";
import ListOfCompleteInterviews from "./_components/ListOfCompleteInterviews";
import RecentActivity from "./_components/RecentActivity";
import QuickStats from "./_components/QuickStats";


  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Interview AI Dashboard
          </h1>
          <p className='text-gray-600'>
            Welcome back! Ready for your next mock interview?
          </p>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* New Interview Card */}
          <AiInterviewForm />

          {/* Previous Interviews */}
          <ListOfCompleteInterviews />
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
}
