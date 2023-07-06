import { lightSocialIcons } from '@/app/utils/SocialIcons';
import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface AuthorCardProps {
  author: User | null;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className='w-full mx-auto h-4/5 gap-y-4 flex flex-col items-center'>
      <div
        className='flex justify-center items-end'
        style={{
          height: '25%',
        }}
      >
        <div className='aspect-video w-24 h-24 relative'>
          <Image
            fill
            className='object-cover rounded-full h-1 w-full '
            src={author?.image ?? ''}
            alt='Post'
          />
        </div>
      </div>
      <div className='flex items-center justify-center flex-col gap-y-2 w-11/12 mx-auto'>
        <h2 className='font-bold text-xl'>
          {author?.firstName} {author?.secondName}
        </h2>
        <h3 className='font-semibold text-lg text-center'>{author?.bio}</h3>
        <div className='flex gap-3 mt-3'>
          {lightSocialIcons.map(element => element)}
        </div>
      </div>
    </div>
  );
};
