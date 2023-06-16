'use client';
import useThemes from '@/app/hooks/useTheme';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonHome = () => {
  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <div
      className={`      ${
        themes === 'light' ? 'bg-color-white' : 'bg-color-dark'
      }`}
    >
      <Skeleton className='d-block w-100 imgCarousel' />

      <div className={`pt-1 px-10 lg:px-32 `}>
        <Skeleton width={120} />
        <div className='flex gap-x-16 gap-y-8 flex-wrap py-4 '>
          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>

          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>

          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>

          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>

          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>

          <div className='postWidth flex gap-3 flex-col px-3 py-3  cursor-pointer border-1'>
            <Skeleton containerClassName='w-full h-full' height={180} />
            <div className='flex gap-3 items-center justify-start max-w-full '>
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
              <Skeleton containerClassName=' h-8 rounded w-3/12' />
            </div>
            <div className='max-w-full'>
              <Skeleton height={75} />
            </div>
            <div className='flex items-center  justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2 w-4/6'>
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton containerClassName='w-full pl-4' />
              </div>
              <div className='w-2/6'>
                <Skeleton containerClassName='w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
