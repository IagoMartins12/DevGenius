import { lightSocialIcons } from '@/app/utils/SocialIcons';
import { User } from '@prisma/client';
import React from 'react';

interface AuthorCardMobile {
  author: User | null;
}

export const AuthorCardMobile: React.FC<AuthorCardMobile> = ({ author }) => {
  return (
    <div className='w-full flex-col  sm:flex-row sm:w-6/12 mx-auto flex p-7 items-center justify-center gap-4'>
      <div className='w-4/12 flex justify-center'>
        <div className='rounded-md'>
          <img src={author?.image ?? ''} alt='' className='rounded-full' />
        </div>
      </div>
      <div className='w-6/12 flex flex-col gap-y-2'>
        <div className='flex gap-x-4 items-center justify-center sm:justify-start'>
          <span className='font-semibold text-lg text-violet-500 text-center'>
            {author?.firstName} {author?.secondName}
          </span>
          {/* <span className='custom-btn'> Seguir </span> */}
        </div>
        <div className='font-medium text-lg flex'>
          <span className='text-center font-semibold text-lg'>
            Escritor e criador do @ DevGenius
          </span>
        </div>
        <div>
          <div className='flex gap-3 items-center justify-center sm:justify-start'>
            {lightSocialIcons.map(element => element)}
          </div>
        </div>
      </div>
    </div>
  );
};
