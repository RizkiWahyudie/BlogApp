// pages/api/publish/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId: any = req.query.id;
  const post = await prisma.post.delete({
    where: { id: postId }
  });
  res.json(post);
}
