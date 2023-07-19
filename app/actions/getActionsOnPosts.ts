import prisma from '@/app/libs/prismadb';

export async function getLikedPosts() {
  try {
    const likes = await prisma.like.findMany();

    return likes;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDeslikedPost() {
  try {
    const deslikes = await prisma.deslike.findMany();

    return deslikes;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFavoritedPosts() {
  try {
    const favorites = await prisma.favorite.findMany();

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
