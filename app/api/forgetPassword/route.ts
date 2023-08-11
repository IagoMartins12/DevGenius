import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { parse } from 'url';

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
