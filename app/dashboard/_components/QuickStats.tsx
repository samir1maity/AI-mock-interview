/** @format */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const QuickStats = () => {
  return (
    <div>
      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          "Total Interviews",
          "Avg. Score",
          "Highest Score",
          "Interview Time",
        ].map((stat, index) => (
          <Card
            key={index}
            className='bg-white/30 backdrop-blur-sm border-none shadow'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                {stat}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-800'>
                {index === 0 && "24"}
                {index === 1 && "85%"}
                {index === 2 && "96%"}
                {index === 3 && "14.5 hrs"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
