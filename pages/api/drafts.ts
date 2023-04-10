import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const session = await getSession();
  try {
    const drafts = await prisma.post.findMany({
      where: {
        author: { email: session?.user?.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return res.status(200).json(drafts);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
