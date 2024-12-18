/** @format */

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/geminiAIModel";
import { useRouter } from "next/navigation";
import { Play, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@clerk/nextjs";

type PublicUserData = {
  identifier?: string;
};

const AiInterviewForm = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDec, setJobDec] = useState<string>("");
  const [yearOfExp, setYearOfExp] = useState<number>(0);
  const router = useRouter();

  const { session } = useSession();

  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier } = publicUserData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const interviewData = await fetch("api/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, jobPosition, jobDec, yearOfExp }),
    });

    if (!interviewData.ok) {
      return;
    }
    const { response } = await interviewData.json();
    const interviewId = response.id;
    router.push(`/dashboard/interview/${interviewId}`);
  };

  return (
    <>
      <div className="text-xl" onClick={() => setOpenForm(true)}>
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
                  <div className="mt-4 mb-4 flex flex-col items-start">
                    <label className="py-1 text-600">Your job role</label>
                    <Input
                      placeholder="enter your job role"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 mb-4 flex flex-col items-start">
                    <label className="py-1 text-600">Your job description</label>
                    <Textarea
                      placeholder="ex:- React, Node.js"
                      required
                      onChange={(e) => setJobDec(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 mb-4 flex flex-col items-start">
                    <label className="py-1 text-600">Year of experience</label>
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
    </>
  );
};

export default AiInterviewForm;
