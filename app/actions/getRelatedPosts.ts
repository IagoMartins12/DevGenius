import prisma from '@/app/libs/prismadb';

export async function getRelatedPosts(id: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (!post) throw new Error('Post não encontrado');

    const postsCategories = await prisma.categoryRelationsPosts.findMany({
      where: {
        postId: post.id,
      },
    });

    const mapPosts = postsCategories.map(post => post.categoryId);

    const relatedPosts = await prisma.categoryRelationsPosts.findMany({
      where: {
        categoryId: {
          in: mapPosts,
        },
      },
    });

    return relatedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
