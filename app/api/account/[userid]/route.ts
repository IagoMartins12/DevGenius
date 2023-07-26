import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
  userid: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const { userid } = params;

  if (!userid || typeof userid !== 'string') {
    throw new Error('Invalid ID');
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userid,
    },
  });

  return NextResponse.json(deletedUser);
}
