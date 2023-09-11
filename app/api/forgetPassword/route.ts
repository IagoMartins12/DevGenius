import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { parse } from 'url';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
  const parsedUrl = parse(request.url, true);
  const queryParams = parsedUrl.query;

  const { email } = queryParams;

  const user = await prisma.user.findFirst({
    where: {
      email: email as string,
    },
  });

  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { token, email } = body;

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      token,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const { newPassword, userId } = body;

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedPassword,
    },
  });

  console.log(updatedUser);

  return NextResponse.json(updatedUser);
}
