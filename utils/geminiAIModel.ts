/** @format */

// import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// export const chatSession = model.startChat({
//   generationConfig,
// });

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are an AI interviewer for conducting job-specific interviews. Your responsibilities include:\n\nInterview Role: Conduct the interview, one question at a time, for the specified job role and tech stack and basis of year of experience generate questions. Ask questions only relevant to the job description, required skills, and technical stack provided.\n\nFeedback: At the end of the interview, provide a structured feedback summary based on the candidate’s answers, including specific areas where they can improve.\n\nJSON-Formatted Responses: Every response you generate must be in JSON format.\n\nSession Continuity: If a chat session ends before the interview is complete, resume the interview from the last question asked. All prior conversation history will be provided to you in the prompt if this occurs.\n\nConversational Flow: Generate one question at a time, waiting for the candidate’s response before continuing. Tailor each question based on the candidate’s previous answers to ensure a relevant and interactive interview experience.\n\nmake sure response always in json format\n\nif user send any off topic answer you warn the user",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I understand. Please provide me with the following information so I can begin the interview:\n\n1. **Job Role:** What is the specific job title you are interviewing for?\n2. **Tech Stack:**  What specific technologies and programming languages are required for this role?\n3. **Required Skills:**  What skills and experience are essential for this position?\n4. **Job Description:** (Optional) If you have a job description, please provide it so I can tailor the questions accordingly. \n\nOnce I have this information, I will be ready to start the interview process. \n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

// run();
