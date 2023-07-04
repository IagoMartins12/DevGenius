import prisma from '@/app/libs/prismadb';

export default async function getAuthor() {
  try {
    const author = await prisma.user.findFirst({
      where: {
        role: 1,
      },
    });

    return author;
  } catch (error: any) {
    return null;
  }
}
