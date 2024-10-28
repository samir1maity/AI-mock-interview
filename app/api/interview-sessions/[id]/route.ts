/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log("params", id);

    if (id.trim() === "" || typeof id !== "string") {
      return NextResponse.json(
        { msg: "something went wrong in your email adress" },
        { status: 400 }
      );
    }

    const interviewSessions = await prisma.interviewSession.findMany({
      where: {
        userEmail: id,
      },
    });

    if (interviewSessions.length === 0) {
      return NextResponse.json(
        {
          message: "No interview sessions found for the given user.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "successfully created",
        data: interviewSessions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching interview sessions:", error);
    throw new Error("Could not retrieve interview sessions.");
  }
}
