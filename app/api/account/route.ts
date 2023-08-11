import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  username?: string;
  firstName?: string;
  secondName?: string;
  email?: string;
  password?: string;
  image?: string;
  birthday?: string;
  bio?: string;
  gender?: string;
  website?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  uf?: string;
  state?: string;
  city?: string;
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const allowedProperties: (keyof IParams)[] = [
    'username',
    'firstName',
    'secondName',
    'birthday',
    'image',
    'email',
    'bio',
    'gender',
    'website',
    'github',
    'instagram',
    'facebook',
    'twitter',
    'youtube',
    'uf',
    'state',
    'city',
  ];

  const dataToUpdate: Partial<IParams> = {};

  for (const property of allowedProperties) {
    if (body[property] !== undefined) {
      dataToUpdate[property] = body[property];
    }
  }

  const userUpdated = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: dataToUpdate,
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
