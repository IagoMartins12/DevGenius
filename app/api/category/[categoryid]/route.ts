import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  categoryid: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { categoryid } = params;

  if (!categoryid || typeof categoryid !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();

  const { category_name } = body;

  const category = await prisma.category.update({
    where: {
      id: categoryid,
    },
    data: {
      category_name,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { categoryid } = params;

  if (!categoryid || typeof categoryid !== 'string') {
    throw new Error('Invalid ID');
  }

  const category = await prisma.category.delete({
    where: {
      id: categoryid,
    },
  });

  return NextResponse.json(category);
}
