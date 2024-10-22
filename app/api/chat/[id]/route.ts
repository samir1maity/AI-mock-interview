/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    console.log("params.id", params.id);
    const chatId = Number(params.id);
    const { identifier } = await req.json();
    console.log("ide", identifier);
    if (typeof identifier !== "string") {
      return NextResponse.json(
        { msg: "invalid interview id" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        sessionId: chatId,
        sender: identifier,
        isUser: true,
        content: "hello whats up bro!",
        isAi: false,
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
