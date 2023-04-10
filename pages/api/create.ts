// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, email } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: { email: email },
      },
    },
  });
  res.json(result);
}
