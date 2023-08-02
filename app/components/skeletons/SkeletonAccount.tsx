'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonAccount = () => {
  const numberOfMenu = [1, 2, 3, 4, 5];
  const numberOfInfo = [1, 2, 3, 4];
  const numberOfInfo2 = [1, 2, 3, 4, 5, 6];

  return (
    <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
      <div className='flex flex-col w-full sm:w-2/6 lg:w-2/12 items-center justify-start gap-y-12'>
        <div className='flex flex-col gap-y-3 items-center justify-center'>
          <div className='aspect-video w-36 h-36 relative flex cursor-pointer'>
            <Skeleton
              circle
              className='w-36 h-36'
              containerClassName='w-full'
            />
          </div>
          <div className='flex flex-col w-full'>
            <Skeleton containerClassName='w-full' className='w-full' />

            <Skeleton containerClassName='w-9/12 mx-auto' height={20} />
          </div>
          <div className='flex gap-x-2 w-full'>
            <Skeleton containerClassName='w-6/12' height={20} />
            <Skeleton containerClassName='w-6/12' height={20} />
          </div>
        </div>
        <div className='flex flex-row sm:!flex-col w-full sm:w-4/5 gap-3 sm:gap-4 justify-center sm:justify-normal'>
          {numberOfMenu.map(menu => (
            <Skeleton
              containerClassName='w-[15%] sm:w-full'
              className='w-full'
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col-reverse justify-start gap-y-12 lg:flex-row w-11/12 mx-auto sm:w-4/6 lg:w-9/12 sm:gap-x-2'>
        <div className='flex flex-col w-full sm:w-9/12 gap-y-8 mx-auto items-center justify-center'>
          <div className='flex flex-col gap-y-8 w-full'>
            <Skeleton containerClassName='w-4/12 mx-auto' />
            <div className='flex flex-col gap-y-3'>
              {numberOfInfo.map(number => (
                <div className='flex gap-4' key={number}>
                  <Skeleton
                    className='w-full h-full'
                    containerClassName='w-3/12 sm:w-1/12 h-5'
                  />
                  <Skeleton
                    className='w-full h-full'
                    containerClassName='w-9/12 sm:w-4/12 h-5'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-y-8 w-full'>
            <Skeleton containerClassName='w-3/12 mx-auto' />
            <div className='flex flex-col gap-y-3'>
              {numberOfInfo2.map(number => (
                <div className='flex gap-4' key={number}>
                  <Skeleton
                    className='w-full h-full'
                    containerClassName='w-3/12 sm:w-1/12 h-5'
                  />
                  <Skeleton
                    className='w-full h-full'
                    containerClassName='w-9/12 sm:w-4/12 h-5'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-start items-start w-full sm:w-11/12 mx-auto lg:w-3/12 gap-8 sm:gap-0'>
          <div className='flex flex-col gap-y-6 w-full'>
            <div className='flex flex-col '>
              <Skeleton className='w-5/12' containerClassName='w-5/12' />
              <Skeleton
                className='w-full h-10 sm:h-16'
                containerClassName='w-full'
              />
            </div>
            <div className='flex flex-col'>
              <Skeleton className='w-5/12' containerClassName='w-5/12' />
              <Skeleton
                className='w-full h-10 sm:h-16'
                containerClassName='w-full'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
