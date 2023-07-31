import prisma from '@/app/libs/prismadb';

export async function getAllFollowers() {
  try {
    const Followers = await prisma.followers.findMany();

    return Followers;
  } catch (error: any) {
    throw new Error(error);
  }
}
