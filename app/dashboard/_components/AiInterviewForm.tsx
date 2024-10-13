"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiAIModel";
import { useRouter } from "next/navigation";
import { Plus } from 'lucide-react';

const AiInterviewForm: React.FC = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDec, setJobDec] = useState<string>("");
  const [yearOfExp, setYearOfExp] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputPrompt: string = `Generate ${process.env.NEXT_PUBLIC_QUESTIONS_LIMIT} of interview questions for a ${jobPosition} with ${yearOfExp} of experience. The candidate should be proficient in ${jobDec}. Ensure the questions difficulty level should depends on experince level , focusing on practical and theoretical knowledge relevant to the role. The questions should be valid for an interview setting and cover various concepts within the tech stack to effectively evaluate the candidate’s skills.give data in json format`;
    try {
      const response = await chatSession.sendMessage(inputPrompt);
      const result = response.response.text();
      const data = result.replace("```json", "").replace("```", "");
      const temp = JSON.parse(data);
      console.log("temp", temp);
      router.push(`/dashboard/interview/id123`);
    } catch (error) {
      console.error("Error during chat session:", error);
    }
  };

  return (
    <div>
      <div className="text-xl h-8 w-12" onClick={() => setOpenForm(true)}>
        <Plus className="mt-3"/>
      </div>
      <Dialog open={openForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us more about job description</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add details about job position, description, and tech stacks
                  </h2>
                  <div className="mt-4 mb-2">
                    <label>your job role</label>
                    <Input
                      placeholder="enter your job role"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>your job description</label>
                    <Textarea
                      placeholder="ex:- React, Node.js"
                      required
                      onChange={(e) => setJobDec(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 mb-2">
                    <label>Year of experience</label>
                    <Input
                      placeholder="ex:-2,4"
                      type="number"
                      max={50}
                      required
                      onChange={(e) => setYearOfExp(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenForm(false)}
                  >
                    cancel
                  </Button>
                  <Button type="submit"> Start interview </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AiInterviewForm;
