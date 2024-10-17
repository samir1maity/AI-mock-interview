/** @format */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const RecentActivity = () => {
  return (
    <div>
      {" "}
      <Card className='mt-8 bg-white/50 backdrop-blur-lg border-none shadow-lg'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            {[
              "Completed Software Engineering interview",
              "Reviewed feedback for Data Science interview",
              "Scheduled Product Management interview",
              "Improved score in System Design interview",
            ].map((activity, index) => (
              <li key={index} className='flex items-center space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='w-2 h-2 rounded-full bg-indigo-500'></div>
                </div>
                <p className='text-sm text-gray-600'>{activity}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
