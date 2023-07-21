import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  postid?: string;
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

  const { postid } = params;

  if (!postid || typeof postid !== 'string') {
    throw new Error('Invalid ID');
  }

  const relationPost = await prisma.categoryRelationsPosts.deleteMany({
    where: {
      postId: postid,
    },
  });

  const post = await prisma.post.delete({
    where: {
      id: postid,
    },
  });

  return NextResponse.json({ post: post, relationPost: relationPost });
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postid } = params;
  const body = await request.json();

  const { title, featured, photo_background, content, resume } = body;

  if (!postid || typeof postid !== 'string') {
    throw new Error('Invalid ID');
  }

  const postUpdated = await prisma.post.update({
    where: {
      id: postid,
    },
    data: {
      content: content,
      featured: featured,
      title: title,
      photo_background: photo_background,
      resume: resume,
    },
  });

  return NextResponse.json(postUpdated);
}
