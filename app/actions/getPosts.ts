import prisma from '@/app/libs/prismadb';

export interface IPosts {
  title?: string;
  category?: string;
  username?: string;
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

    const safePosts = post.map(post => ({
      ...post,
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
