'use client';

import { useTheme } from 'next-themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './style.module.scss';

export const SkeletonPost = () => {
  const { theme } = useTheme();
  const numberOfIcons = [1, 2, 3, 4];
  const numberOfCards = [1, 2, 3];

  return (
    <div className={`w-full flex gap-x-4 sm:px-16 lg:px-32 sm:py-10`}>
      <div
        className={`${styles.Container} flex items-center justify-center ${
          theme === 'light' ? 'reactIcons-white' : 'reactIcons-dark'
        }`}
      >
        {numberOfIcons.map(icon => (
          <>
            <Skeleton
              containerClassName='pb-4'
              height={30}
              width={30}
              key={icon}
            />
          </>
        ))}
      </div>
      <div className='w-full sm:w-10/12 flex-col h-full mx-auto'>
        <div className='w-11/12 mx-auto my-6'>
          <div className='aspect-video w-full  overflow-hidden rounded-xl relative'>
            <Skeleton className='w-full h-full' />
          </div>
        </div>
        <div className='w-11/12 mx-auto h-auto my-6'>
          <Skeleton className='w-full h-full' />
        </div>
        <div className='w-11/12 mx-auto h-auto my-6'>
          <Skeleton className='w-full h-full' height={700} />
        </div>
        <hr className='w-11/12 mx-auto' />
        <div className='w-full flex-col  sm:flex-row sm:w-6/12 mx-auto flex p-7 items-center justify-center gap-4'>
          <div className='w-4/12 flex justify-center'>
            <div className='aspect-video w-28 h-28 relative'>
              <Skeleton circle className='w-full h-full' />
            </div>
          </div>
          <div className='w-6/12 flex flex-col gap-y-2'>
            <Skeleton className='w-full h-full' height={15} />
            <Skeleton className='w-full h-full' height={30} />
            <div className='flex gap-3 w-full items-center justify-center sm:justify-start'>
              {numberOfIcons.map(icon => (
                <>
                  <Skeleton
                    className='w-3/12'
                    height={15}
                    width={30}
                    key={icon}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        <hr className='w-11/12 mx-auto' />
        <div className={`flex flex-col w-11/12 mx-auto pt-8`}>
          <div className='pt-1 w-full flex justify-between'>
            <div className='w-3/12'>
              <Skeleton className='w-full' />
            </div>
            <div className='flex gap-4 w-3/12 justify-end'>
              <Skeleton width={50} />
              <Skeleton width={50} />
            </div>
          </div>
          <div className='carousel my-4 flex items-center justify-start overflow-x-hidden'>
            {numberOfCards.map(number => (
              <div
                className={`card w-[33%] m-2 rounded-lg overflow-hidden card-height ${
                  theme === 'light' ? 'relatedCard-white' : 'relatedCard-dark'
                }`}
                key={number}
              >
                <div className={`rounded h-full cursor-pointer`}>
                  <div className='aspect-video w-full h-2/6 relative overflow-hidden'>
                    <Skeleton className='w-full h-full' />
                  </div>

                  <div className='px-6 py-4 h-4/6 flex flex-col gap-y-4'>
                    <div className='h-1/5'>
                      <Skeleton className='w-6/12' />
                    </div>
                    <div className='h-4/5'>
                      <Skeleton className='w-6/12 h-full' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
