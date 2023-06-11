import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
  userId?: string;
}

export async function POST(
  request: Request, 
  { params }: {params: IParams}
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { 
    content,
    postId
   } = body;

  if (!postId || typeof postId !== 'string') {
    return NextResponse.error()

  }

  const comment = await prisma.comment.create({
    data: {
      postId, 
      content,
      userId: currentUser.id,
      createdAt: Date(),
    }
  });

  return NextResponse.json(comment);
}