'use client';

import useThemes, { Themes } from '@/app/hooks/useTheme';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonCreatePost = () => {
  const themes: Themes = useThemes().theme;

  return (
    <div
      className={`flex flex-col sm:px-24 sm:py-24
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
    >
      <h3 className='sm:mx-6 mt-6 mx-6 font-bold text-3xl '>
        <Skeleton width={100} height={30} />
      </h3>
      <div className='flex flex-col lg:flex-row gap-8 mx-6 my-6'>
        <div className='flex flex-col w-full lg:w-4/12 lg:flex-row'>
          <div className='flex flex-col w-full'>
            <div className=''>
              <Skeleton className='h-64' />
            </div>
            <div className='w-full pt-3'>
              <Skeleton containerClassName='rounded-full w-full' height={30} />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full lg:w-8/12 border-2 pb-4'>
          <div className='flex flex-col gap-y-4 '>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <Skeleton containerClassName='w-1/12' />
              <Skeleton containerClassName='w-full' height={45} />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <Skeleton containerClassName='w-3/12' />
              <Skeleton containerClassName='w-full h-3/12' height={45} />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <Skeleton containerClassName='w-2/12' />
              <Skeleton containerClassName='w-full h-3/12' height={70} />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <Skeleton containerClassName='w-1/12' />
              <Skeleton containerClassName='w-full h-3/12' height={275} />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3 h-14'>
              <div className='flex justify-center gap-3'>
                <Skeleton containerClassName='w-10 ' />
                <Skeleton containerClassName='w-1/12' />
              </div>
            </div>
            <div className='flex flex-col gap-y-2 mx-6 justify-center items-center'>
              <Skeleton containerClassName='rounded-full w-full sm:w-4/12' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
