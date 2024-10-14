import prisma from "../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, firstName, lastName } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
        },
      });

      res.status(200).json({ msg: "User stored successfully", user });
    } catch (error) {
      console.log(`error in store user in DB api, error is --> ${error}`);
      res.status(500).json({ msg: `failed to store user ${error}` });
    }
  }
  res.status(405).json({ msg: `Method not allowed` });
}
