/** @format */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type QuestionData = {
  question: string;
  concept: string;
  difficulty: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { interviewId, questions } = body;

  try {
    if (!interviewId) {
      return NextResponse.json(
        { msg: "interview id is not valid" },
        { status: 400 }
      );
    }

    /**
     * need to add more options like hasQuestion:true,
     * there should need a id because of structure
     */

    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      questions.map(async (data: QuestionData) => {
        await prisma.question.create({
          data: {
            interviewId: interviewId,
            question_txt: data.question,
            concept: data.concept,
            difficulty: data.difficulty,
          },
        });
      })
    );

    return NextResponse.json(
      {
        msg: "successfull",
        interviewId: interviewId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { msg: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
