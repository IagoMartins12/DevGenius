import prisma from '@/app/libs/prismadb';

import getCurrentUser from './getCurrentUser';

export async function getLikedPosts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const likes = await prisma.like.findMany();

    return likes;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDeslikedPost() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const deslikes = await prisma.deslike.findMany();

    return deslikes;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFavoritedPosts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.favorite.findMany();

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
