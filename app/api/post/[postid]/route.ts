import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  postId?: string;
  title?: string;
  content?: string;
  featured?: number;
  photo_background?: string;
  category_id?: number;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  console.log('params', params);
  console.log('postId', postId);

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid ID');
  }

  const post = await prisma.post.deleteMany({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!params.category_id || typeof params.category_id !== 'string') {
    throw new Error('Invalid ID');
  }

  const postUpdated = await prisma.post.updateMany({
    where: {
      id: postId,
    },
    data: {
      content: params.content,
      featured: params.featured,
      title: params.title,
      photo_background: params.photo_background,
      updatedAt: Date(),
    },
  });

  return NextResponse.json(postUpdated);
}
