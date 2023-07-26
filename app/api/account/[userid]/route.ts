import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
  userid: string;
  username?: string;
  firstName?: string;
  secondName?: string;
  role?: number;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const body = await request.json();

  const { username, firstName, secondName, role } = body;
  const { userid } = params;

  if (!userid || typeof userid !== 'string') {
    throw new Error('Invalid ID');
  }

  const dataToUpdate: Partial<IParams> = {
    username,
    firstName,
    secondName,
    role,
  };

  const userUpdated = await prisma.user.update({
    where: {
      id: userid,
    },
    data: dataToUpdate,
  });

  return NextResponse.json(userUpdated);
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
