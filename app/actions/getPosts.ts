import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  title?: string;
  category?: string;
  username?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { title, category, username } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (title) {
      query.title = title;
    }

    if (username) {
      query.username = username;
    }

    const post = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safePosts = post.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
