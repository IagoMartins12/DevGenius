import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { category_id, post_id } = body;

  const category = await prisma.categoryRelationsPosts.create({
    data: {
      categoryId: category_id,
      postId: post_id,
    },
  });

  return NextResponse.json(category);
}
