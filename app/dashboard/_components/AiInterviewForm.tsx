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

const AiInterviewForm: React.FC = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDec, setJobDec] = useState<string>("");
  const [yearOfExp, setYearOfExp] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(jobPosition, jobDec, yearOfExp)

    const response = await chatSession()
  };

  return (
    <div>
      <div className="text-xl h-8 w-12" onClick={() => setOpenForm(true)}>
        add
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
