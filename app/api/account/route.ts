import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  username?: string;
  firstName?: string;
  secondName?: string;
  email?: string;
  password?: string;
  image?: string;
  birthday?: string;
  bio?: string;
  gender?: string;
  website?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  uf?: string;
  state?: string;
  city?: string;
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    username,
    firstName,
    secondName,
    birthday,
    image,
    email,
    bio,
    gender,
    website,
    github,
    instagram,
    facebook,
    twitter,
    youtube,
    uf,
    state,
    city,
  } = body;

  const dataToUpdate: Partial<IParams> = {};

  // Verifica se cada campo existe no corpo da solicitação e adiciona ao objeto de atualização
  if (username) {
    dataToUpdate.username = username;
  }
  if (firstName) {
    dataToUpdate.firstName = firstName;
  }
  if (secondName) {
    dataToUpdate.secondName = secondName;
  }
  if (birthday) {
    dataToUpdate.birthday = birthday;
  }
  if (image) {
    dataToUpdate.image = image;
  }
  if (email) {
    dataToUpdate.email = email;
  }
  if (bio) {
    dataToUpdate.bio = bio;
  }
  if (gender) {
    dataToUpdate.gender = gender;
  }
  if (website) {
    dataToUpdate.website = website;
  }
  if (github) {
    dataToUpdate.github = github;
  }
  if (instagram) {
    dataToUpdate.instagram = instagram;
  }
  if (facebook) {
    dataToUpdate.facebook = facebook;
  }
  if (twitter) {
    dataToUpdate.twitter = twitter;
  }
  if (youtube) {
    dataToUpdate.youtube = youtube;
  }

  if (state) {
    dataToUpdate.state = state;
  }

  if (city) {
    dataToUpdate.city = city;
  }

  if (uf) {
    dataToUpdate.uf = uf;
  }

  const userUpdated = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: dataToUpdate,
  });

  return NextResponse.json(userUpdated);
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const userDeleted = prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(userDeleted);
  } catch (err) {
    NextResponse.error();
  }
}
