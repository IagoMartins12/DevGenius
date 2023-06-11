import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  postId?: string;
  userId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid ID');
  }


  if (!params.userId || typeof params.userId !== 'string') {
    throw new Error('Invalid ID');
  }


  const favorite = await prisma.favorite.create({
   data: {
        postId: postId,
        userId: params.userId,
   }
  });

  return NextResponse.json(favorite);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid ID');
  }

  const like = await prisma.like.deleteMany({
    where: {
      id: postId,

    }
  });

  return NextResponse.json(like);
}

