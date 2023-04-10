import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { postId } = req.query;

    const postString = postId?.toString();

    // if (typeof postId !== 'string') {
    //   throw new Error('Invalid Id');
    // }

    // if (!postId) {
    //   throw new Error('Missing Id');
    // }

    const posts = await prisma.post.findUnique({
      where: {
        id: postString,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
        author: true,
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
