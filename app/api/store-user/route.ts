/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const identifier = req.nextUrl.searchParams.get("identifier");
  const data = await req.json();
  const { identifier } = data;
  console.log("identifier", identifier);

  // if (typeof identifier !== "string") {
  //   return NextResponse.json(
  //     { msg: "Identifier is required" },
  //     { status: 400 }
  //   );
  // }

  const existingUser = await prisma.user.findUnique({
    where: { email: identifier },
  });

  if (existingUser) {
    return NextResponse.json({ msg: "User already exists", data: existingUser}, { status: 400 });
  }

  try {
    const newUser = await prisma.user.create({ data: { email: identifier } });
    return NextResponse.json(
      { msg: "User stored successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error storing user in DB: ${error}`);
    return NextResponse.json(
      { msg: `Failed to store user: ${error}` },
      { status: 500 }
    );
  }
}
