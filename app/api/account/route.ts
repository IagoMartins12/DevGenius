import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  photo_url?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { username, first_name, last_name, email, password, photo_url } = body;

  const userUpdated = prisma.user.updateMany({
    where: {
      id: currentUser.id,
    },
    data: {
      username,
      first_name,
      last_name,
      email,
      password,
      photo_url,
    },
  });

  return NextResponse.json(userUpdated);
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const userDeleted = prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(userDeleted);
  } catch (err) {
    NextResponse.error();
  }
}
