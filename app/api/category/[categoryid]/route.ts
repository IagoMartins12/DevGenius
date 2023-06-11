import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  category_id: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { category_id } = params;

  if (!category_id || typeof category_id !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();

  const { category_name } = body;

  const category = await prisma.category.updateMany({
    where: {
      id: category_id,
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

  const { category_id } = params;

  if (!category_id || typeof category_id !== 'string') {
    throw new Error('Invalid ID');
  }

  const category = await prisma.category.delete({
    where: {
      id: category_id,
    },
  });

  return NextResponse.json(category);
}
