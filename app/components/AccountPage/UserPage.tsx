'use client';

import { Post, User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { BsBookmarkStar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { TbFileDislike, TbFileLike } from 'react-icons/tb';
import { Profile } from './Profile';
import { LikedPosts } from './LikedPosts';
import { DeslikedPosts } from './DeslikedPosts';
import { SavedPosts } from './SavedPosts';

export interface UserProps {
  currentUser: User;
  post?: Post;
}
export const UserPage: React.FC<UserProps> = ({ currentUser }) => {
  const [isActive, setIsActive] = useState<number>(0);

  return (
    <>
      <div className='flex flex-col w-2/12 items-center justify-center gap-y-12'>
        <div className='flex flex-col gap-y-3 items-center justify-center'>
          <div className='aspect-video w-36 h-36 relative flex cursor-pointer'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={currentUser.image ?? '/user.png'}
              alt='Post'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>
              {currentUser.firstName} {currentUser.secondName}
            </span>
            <span className='text-sm font-semibold'>
              Desenvolvedor FullStack
            </span>
          </div>
          <div className='flex gap-x-2'>
            <span> 100 Seguidores</span>
            <span> 100 Seguindo </span>
          </div>
        </div>
        <div className='flex flex-col w-4/5 gap-y-4'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsActive(0)}
          >
            <span
              className={` ${
                isActive === 0
                  ? 'text-xl font-extrabold'
                  : 'text-xl font-medium '
              }`}
            >
              Profile
            </span>
            <CgProfile size={22} />
          </div>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsActive(1)}
          >
            <span
              className={` ${
                isActive === 1
                  ? 'text-xl font-extrabold'
                  : 'text-xl font-medium '
              }`}
            >
              Posts curtidos
            </span>
            <TbFileLike size={22} />
          </div>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsActive(2)}
          >
            <span
              className={` ${
                isActive === 2
                  ? 'text-xl font-extrabold'
                  : 'text-xl font-medium '
              }`}
            >
              Posts não curtidos
            </span>
            <TbFileDislike size={22} />
          </div>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsActive(3)}
          >
            <span
              className={` ${
                isActive === 3
                  ? 'text-xl font-extrabold'
                  : 'text-xl font-medium '
              }`}
            >
              Posts salvos
            </span>
            <BsBookmarkStar size={22} />
          </div>
        </div>
      </div>
      <div className='flex w-9/12 gap-x-2'>
        <div className='w-9/12 '>
          {isActive === 0 && <Profile currentUser={currentUser} />}
          {isActive === 1 && <LikedPosts currentUser={currentUser} />}
          {isActive === 2 && <DeslikedPosts currentUser={currentUser} />}
          {isActive === 3 && <SavedPosts currentUser={currentUser} />}
        </div>
        <div className='flex flex-col w-3/12'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col '>
              <span className='text-lg font-extraligh text-violet-600'>
                Biografia:
              </span>
              <span className='text-lg font-semibold'> {currentUser.bio}</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-lg font-extralight text-violet-600'>
                Localização:
              </span>
              <span className='text-lg font-semibold'>
                {currentUser.city}, {currentUser.state}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
