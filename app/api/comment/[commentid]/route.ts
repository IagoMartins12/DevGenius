import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  commentId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: {params: IParams}
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { commentId } = params;

  if (!commentId || typeof commentId !== 'string') {
    return NextResponse.error()

  }

  const body = await request.json();

  const { 
    postId,
   } = body;

  const deslike = await prisma.comment.deleteMany({
    where: {
      id: commentId,
      postId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(deslike);
}