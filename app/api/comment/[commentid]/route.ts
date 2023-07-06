import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  commentid?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { commentid } = params;

  if (!commentid || typeof commentid !== 'string') {
    return NextResponse.error();
  }

  const deslike = await prisma.comment.deleteMany({
    where: {
      id: commentid,
    },
  });

  return NextResponse.json(deslike);
}
