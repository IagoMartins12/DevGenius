import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface IParams {
  password?: string;
  newPassword?: string;
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { newPassword } = body;

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  console.log('newPassword', newPassword);
  console.log('hashedPassword', hashedPassword);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
