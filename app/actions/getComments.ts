import prisma from '@/app/libs/prismadb';

export default async function getComments() {
  try {
    const comment = await prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return comment;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCommentsPerID(postId: string) {
  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return comment;
  } catch (error: any) {
    throw new Error(error);
  }
}
