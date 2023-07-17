import prisma from '@/app/libs/prismadb';

export interface ICategories {
  postId?: string;
}

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPostCategories(params?: ICategories) {
  try {
    const categories = await prisma.categoryRelationsPosts.findMany();

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPostsByCategory(categoryId: string) {
  try {
    const categoryRelationsPosts = await prisma.categoryRelationsPosts.findMany(
      {
        where: {
          categoryId: categoryId,
        },
      },
    );

    const postsId = categoryRelationsPosts.map(
      categoryRelation => categoryRelation.postId,
    );

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postsId,
        },
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCategoriesPerId(postId: string) {
  try {
    const categoryRelationsPosts = await prisma.categoryRelationsPosts.findMany(
      {
        where: {
          postId: postId,
        },
      },
    );

    return categoryRelationsPosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
