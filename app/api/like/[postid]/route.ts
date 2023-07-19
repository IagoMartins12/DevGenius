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
    throw new Error('Invalid ID');
  }

  const like = await prisma.like.create({
    data: {
      postId: postid,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(like);
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

  const like = await prisma.like.deleteMany({
    where: {
      postId: postid,
    },
  });

  return NextResponse.json(like);
}
