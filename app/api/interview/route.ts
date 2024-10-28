/** @format */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { identifier, jobPosition, jobDec, yearOfExp } = await req.json();

    if (
      !identifier ||
      typeof identifier !== "string" ||
      typeof jobPosition !== "string"
    ) {
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
        jobRole: jobPosition,
        jobDescription: jobDec,
        experienceYears: yearOfExp,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const identifier = searchParams.get("identifier");
    const interviewId = searchParams.get("interviewId");

    console.log("identifier", identifier, "interviewId", interviewId);

    if (!interviewId || !identifier) {
      return NextResponse.json(
        { msg: "Invalid user email or interview Id provided." },
        { status: 400 }
      );
    }

    const interview = await prisma.interviewSession.findUnique({
      where: {
        id: Number(interviewId),
        userEmail: identifier,
      },
      include: {
        messages: true,
      },
    });

    console.log("interview", interview);

    if (!interview) {
      return NextResponse.json({
        message: "Interview session not found for the given user.",
      });
    }

    return NextResponse.json(
      { msg: "successfull", response: interview, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log("error cause in get interview", error);
    return NextResponse.json(
      {
        msg: "something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}
