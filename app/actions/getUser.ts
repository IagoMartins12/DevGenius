import prisma from '@/app/libs/prismadb';

export async function getAllUsers() {
  try {
    const User = await prisma.user.findMany();

    return User;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserPerId(id: string) {
  try {
    const User = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return User;
  } catch (error: any) {
    throw new Error(error);
  }
}
