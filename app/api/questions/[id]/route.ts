/** @format */

// /** @format */

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../lib/prisma"; // Adjust this path as necessary

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const interviewId = params.id;

//   if (!interviewId) {
//     console.error("interviewId is required.");
//     throw new Error("interviewId is required.");
//   }

//   console.log("Fetching questions for interviewId:", interviewId);

//   try {
//     const interviewWithQuestions = await prisma.question.findMany({
//       where: {
//         interviewId: interviewId,
//       },
//     });

//     if (interviewWithQuestions.length === 0) {
//       console.log("No questions found for interviewId:", interviewId);
//       return NextResponse.json(
//         {
//           body: { error: "No questions found for this interview." },
//         },
//         { status: 404 }
//       );
//     }

//     console.log("Retrieved questions:", interviewWithQuestions);
//     return NextResponse.json({
//       status: 200,
//       body: interviewWithQuestions,
//     });
//   } catch (error) {
//     console.error(
//       "Error fetching questions for interviewId:",
//       interviewId,
//       error
//     );
//     return NextResponse.json({
//       status: 500,
//       body: { error: "Internal server error while fetching questions." },
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
