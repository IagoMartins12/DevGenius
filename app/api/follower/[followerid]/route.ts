import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  followerid?: string;
  userId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { followerid } = params;

  if (!followerid || typeof followerid !== 'string') {
    throw new Error('Invalid ID');
  }

  console.log(followerid);

  if (!currentUser.id || typeof currentUser.id !== 'string') {
    throw new Error('Invalid ID');
  }

  const newFollowing = await prisma.followers.create({
    data: {
      followerId: currentUser.id,
      followingId: followerid,
    },
  });

  console.log(newFollowing);

  return NextResponse.json(newFollowing);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { followerid } = params;

  if (!followerid || typeof followerid !== 'string') {
    throw new Error('Invalid ID');
  }

  const removeFollower = await prisma.followers.deleteMany({
    where: {
      followerId: currentUser.id,
      followingId: followerid,
    },
  });

  return NextResponse.json(removeFollower);
}
