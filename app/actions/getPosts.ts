import prisma from '@/app/libs/prismadb';

export interface IPosts {
  title?: string;
  category?: string;
  username?: string;
  id?: string;
}

export default async function getPosts(params?: IPosts) {
  try {
    let query: any = {};

    if (params?.category) {
      query.category = params.category;
    }

    if (params?.title) {
      query.title = params.title;
    }

    if (params?.username) {
      query.username = params.username;
    }

    const post = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPostsPerId(id: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}
