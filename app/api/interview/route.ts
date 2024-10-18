/** @format */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { identifier } = await req.json();

    // Validate the user input
    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { msg: "Invalid user email provided." },
        { status: 400 }
      );
    }

    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: identifier },
    });

    if (!existingUser) {
      return NextResponse.json(
        { msg: "User does not exist." },
        { status: 404 }
      );
    }

    // Create a new interview
    const interview = await prisma.interview.create({
      data: {
        userEmail: identifier,
        date: new Date(),
        feedback: null,
      },
    });

    console.log("interview", interview);

    // Return success response
    return NextResponse.json(
      {
        msg: "Successfully created an interview",
        response: interview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating interview:", error);
    // Generic error response
    return NextResponse.json(
      { msg: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
