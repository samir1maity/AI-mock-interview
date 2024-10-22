/** @format */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { msg: "Invalid user email provided." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: identifier },
    });

    if (!existingUser) {
      return NextResponse.json(
        { msg: "User does not exist." },
        { status: 404 }
      );
    }

    const interview = await prisma.interviewSession.create({
      data: {
        userEmail: identifier,
        jobRole: "frontend",
        jobDescription: "react, redux",
        experienceYears: 1,
        sessionStartedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        msg: "Successfully created an interview",
        response: interview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { msg: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
