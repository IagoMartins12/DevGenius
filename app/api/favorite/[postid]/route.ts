import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  postid?: string;
  userId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postid } = params;

  if (!postid || typeof postid !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!currentUser.id || typeof currentUser.id !== 'string') {
    throw new Error('Invalid ID2');
  }

  const favorite = await prisma.favorite.create({
    data: {
      postId: postid,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(favorite);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postid } = params;

  if (!postid || typeof postid !== 'string') {
    throw new Error('Invalid ID');
  }

  const favorite = await prisma.favorite.deleteMany({
    where: {
      postId: postid,
    },
  });

  return NextResponse.json(favorite);
}
