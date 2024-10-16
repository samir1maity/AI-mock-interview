/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Clock, PlusCircle } from "lucide-react";
import React from "react";

const ListOfCompleteInterviews = () => {
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

  return (
    <div>
      {previousInterviews.map((interview) => (
        <Card
          key={interview.id}
          className='bg-white/50 backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-shadow'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-xl font-semibold'>
              {interview.title}
            </CardTitle>
            <Button
              variant='ghost'
              size='icon'
              className='text-gray-500 hover:text-indigo-500'>
              <PlusCircle className='h-5 w-5' />
              <span className='sr-only'>View details</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex items-center text-sm text-gray-500'>
                <Calendar className='mr-2 h-4 w-4' />
                {interview.date}
              </div>
              <div className='flex items-center text-sm text-gray-500'>
                <Clock className='mr-2 h-4 w-4' />
                {interview.duration}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-gray-700'>Score</span>
              <div className='flex items-center'>
                <BarChart className='mr-2 h-4 w-4 text-indigo-500' />
                <span className='font-bold text-indigo-500'>
                  {interview.score}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListOfCompleteInterviews;
