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
