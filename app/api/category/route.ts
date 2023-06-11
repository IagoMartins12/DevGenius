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
    category_name,
   } = body;

  const category = await prisma.category.create({
    data: {
      category_name,
    }
  });

  return NextResponse.json(category);
}