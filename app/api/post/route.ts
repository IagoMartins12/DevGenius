import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    content,
    featured,
    photo_background,
    category_id
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const post = await prisma.post.create({
    data: {
      title,
      content,
      photo_background,
      featured,
      userId: currentUser.id,
      createdAt: Date(),
      category_id
    }
  });

  return NextResponse.json(post);
}