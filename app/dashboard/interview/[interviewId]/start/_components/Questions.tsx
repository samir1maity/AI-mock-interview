/** @format */

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const Questions = ({ activeQuestion }: { activeQuestion: number }) => {
  return (
    data && (
      <div className=''>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data &&
            data.map((d, i) => (
              <p
                key={i}
                className={`border border-gray-400 p-3 rounded-lg ${
                  activeQuestion === i && "bg-slate-900 text-white"
                }`}>
                Questions #{`${i + 1}`}
              </p>
            ))}
        </div>
        <h2 className='text-md my-4 md:text-lg'>
          {data[activeQuestion].question}
        </h2>
        <Volume2 onClick={() => textToSpeach(data[activeQuestion].question)} />
        <div className='bg-yellow-300'>
          <h2 className='flex gap-2 items-center'>
            <Lightbulb />
            <strong>note :</strong>
          </h2>
        </div>
      </div>
    )
  );
};

export default Questions;
