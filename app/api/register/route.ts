import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const userEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const userUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (userUsername) {
    return new Response(JSON.stringify({ error: 'Username already exist' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (userEmail) {
    return new Response(JSON.stringify({ error: 'Email already exist' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      username,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
