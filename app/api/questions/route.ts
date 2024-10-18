/** @format */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { useSession } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const { interviewId, questions } = req.body;

  if (!interviewId) {
    return NextResponse.json(
      { msg: "interview id is not valid" },
      { status: 400 }
    );
  }

  const result = prisma.question.create({
    data: {
      interviewId: interviewId,
      question_txt: questions,
    },
  });
}

//it is need to create - remain
