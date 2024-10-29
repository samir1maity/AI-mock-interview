/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { identifier, feedback, rating } = await req.json();
    const { id } = params;

    console.log("id ", id, "identifier", identifier);

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { msg: "Something went wrong with your email address." },
        { status: 400 }
      );
    }
    const interviewSession = await prisma.interviewSession.findFirst({
      where: {
        id: Number(id),
        userEmail: identifier,
      },
    });

    if (!interviewSession) {
      return NextResponse.json(
        { message: "No interview sessions found for the given user." },
        { status: 404 }
      );
    }

    const updatedSession = await prisma.interviewSession.update({
      where: {
        id: interviewSession.id,
      },
      data: {
        feedback: feedback,
        rating: Number(rating),
      },
    });

    return NextResponse.json(
      {
        success: true,
        msg: "Successfully updated interview session.",
        data: updatedSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating interview session:", error);
    return NextResponse.json(
      { message: "Could not update interview session." },
      { status: 500 }
    );
  }
}
