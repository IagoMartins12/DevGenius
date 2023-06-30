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
