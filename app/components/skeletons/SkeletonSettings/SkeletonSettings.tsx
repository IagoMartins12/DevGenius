'use client';

import useThemes, { Themes } from '@/app/hooks/useTheme';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonSettings = () => {
  const themes: Themes = useThemes().theme;

  return (
    <div
      className={`flex gap-y-8 lg:gap-x-8 px-6 min-h-screen pt-8 ${
        themes === 'light' ? 'bg-color-white' : 'bg-color-dark'
      }`}
    >
      <div className='w-4/12 hidden lg:flex'>
        <div className='w-full h-48 sm:h-2/3 mt-4 sm:mt-10 m-1'>
          <Skeleton className='h-full' />
        </div>
      </div>
      <div className='flex flex-col w-full sh:w-8/12 gap-y-4'>
        <div className='flex flex-col w-full lg:w-full justify-start border-2'>
          <div className='w-full flex items-center justify-center flex-col'>
            <div className='rounded-full items-center justify-center w-32 h-32  mt-4'>
              <Skeleton className='h-full' circle />
            </div>
            <div className='flex items-center justify-center my-3 flex-col '>
              <span className='font-bold text-2xl'>
                <Skeleton height={20} width={150} />
              </span>
            </div>
          </div>
          <div className='w-full flex h-11 gap-1'>
            <div className='h-full w-3/12'>
              <Skeleton containerClassName='h-full w-full flex' />
            </div>
            <div className='h-full w-3/12'>
              <Skeleton containerClassName='h-full w-full flex' />
            </div>
            <div className='h-full w-3/12'>
              <Skeleton containerClassName='h-full w-full flex' />
            </div>
            <div className='h-full w-3/12'>
              <Skeleton containerClassName='h-full w-full flex' />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full lg:w-full border-2 self-start'></div>
      </div>
    </div>
  );
};
