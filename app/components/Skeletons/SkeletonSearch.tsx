import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonSearch = () => {
  const numberOfCards = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className='lg:!px-28 px-2 w-full'>
        <div>
          <Skeleton width={100} height={20} />
        </div>
        <div className='py-10 grid grid-cols-1 sm:grid-cols-12 gap-5 max-w-full '>
          {numberOfCards.map(number => (
            <div
              className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer sm:col-span-6 lg:col-span-3 card-height`}
              key={number}
            >
              <div
                style={{
                  height: '40%',
                }}
              >
                <Skeleton className='d-block w-full h-full' />
              </div>
              <div
                className='flex flex-col justify-around overflow-hidden px-3'
                style={{
                  height: '60%',
                }}
              >
                <div className='max-w-full flex flex-col gap-y-3'>
                  <Skeleton height={20} className='w-full' />
                  <Skeleton height={70} className='w-full' />
                </div>
                <div className='flex items-start justify-start pb-2 gap-x-4 '>
                  <Skeleton containerClassName='rounded-full py-1 w-3/12' />
                  <Skeleton containerClassName='rounded-full py-1 w-3/12' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
