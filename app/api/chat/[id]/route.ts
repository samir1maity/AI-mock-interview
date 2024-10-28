/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const interviewId = Number(params.id);
    const { identifier, content, isAi, isUser } = await req.json();

    console.log("identifier", identifier);
    console.log("content", content);
    console.log("isAi", isAi);
    console.log("isUser", isUser);
    // console.log("id", id);

    const isUserBoolean = isUser === "true";
    const isAiBoolean = isAi === "true";

    // if (typeof identifier !== "string") {
    //   return NextResponse.json(
    //     { msg: "invalid interview id" },
    //     { status: 400 }
    //   );
    // }

    const message = await prisma.message.create({
      data: {
        // id: id,
        sessionId: interviewId,
        sender: identifier,
        isUser: isUserBoolean,
        content: content,
        isAi: isAiBoolean,
      },
    });

    console.log("message", message);

    return NextResponse.json(
      {
        msg: "successfully sent",
        success: true,
        response: message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating at store message api -", error);
    return NextResponse.json(
      { msg: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
