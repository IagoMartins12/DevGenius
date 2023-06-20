'use client';
import useThemes from '@/app/hooks/useTheme';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonHome = () => {
  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <div
      className={`${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
    >
      <div className='px-10 lg:px-32'>
        <Skeleton className='d-block w-100 imgCarousel ' />
      </div>

      <div className={`pt-1 px-10 lg:px-32 `}>
        <Skeleton width={120} />
        <div className='py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer flex flex-col 
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
          >
            <Skeleton containerClassName='d-block w-100 h-3/12' height={180} />
            <div className=''>
              <div className='max-w-full px-6 pt-4 flex flex-col gap-y-3'>
                <Skeleton height={20} className='w-full' />
                <Skeleton height={50} className='w-full' />
              </div>
              <div className='flex items-start justify-start px-6 pt-4'>
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
              </div>
            </div>
          </div>
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer flex flex-col 
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
          >
            <Skeleton containerClassName='d-block w-100 h-3/12' height={180} />
            <div className=''>
              <div className='max-w-full px-6 pt-4 flex flex-col gap-y-3'>
                <Skeleton height={20} className='w-full' />
                <Skeleton height={50} className='w-full' />
              </div>
              <div className='flex items-start justify-start px-6 pt-4'>
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
              </div>
            </div>
          </div>
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer flex flex-col 
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
          >
            <Skeleton containerClassName='d-block w-100 h-3/12' height={180} />
            <div className=''>
              <div className='max-w-full px-6 pt-4 flex flex-col gap-y-3'>
                <Skeleton height={20} className='w-full' />
                <Skeleton height={50} className='w-full' />
              </div>
              <div className='flex items-start justify-start px-6 pt-4'>
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
                <Skeleton containerClassName='rounded-full py-1 text-sm mr-2 mb-2 w-2/12' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
