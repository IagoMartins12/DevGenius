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


  const deslike = await prisma.deslike.create({
   data: {
        postId: postId,
        userId: params.userId,
   }
  });

  return NextResponse.json(deslike);
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

  const deslike = await prisma.deslike.deleteMany({
    where: {
      id: postId,

    }
  });

  return NextResponse.json(deslike);
}

