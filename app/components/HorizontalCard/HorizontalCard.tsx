import { useEffect, useState } from 'react';
import { Post } from '@prisma/client';
import Image from 'next/image';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

interface HorizontalCardProps {
  post: Post;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ post }) => {
  const [MAX_RESUME_LENGTH, setMaxResumeLength] = useState(180); // Default value for smaller screens

  const { navigateToUrl } = useNavigate();

  const resumeText = post.resume ?? '';
  const truncatedResume =
    resumeText.length > MAX_RESUME_LENGTH
      ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
      : resumeText;

  useEffect(() => {
    const handleWindowSizeChange = () => {
      const width = window.innerWidth;
      setMaxResumeLength(width > 820 ? 350 : 150);
    };

    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div
      className='w-full flex shadow-lg p-3 gap-3 cursor-pointer h-52 sm:h-auto overflow-hidden'
      onClick={() => navigateToUrl('post', post.id)}
    >
      <div className='w-4/12 lg:w-2/12'>
        <div className='aspect-video w-full h-full relative flex cursor-pointer'>
          <Image
            fill
            className='object-cover w-full'
            src={post.photo_background}
            alt='Post'
          />
        </div>
      </div>
      <div className='flex flex-col w-8/12 lg:w-10/12 gap-y-2'>
        <span className='text-base lg:text-xl font-bold lg:font-semibold'>
          {post.title}
        </span>
        <span className='text-sm font-medium overflow-hidden'>
          {' '}
          {truncatedResume}
        </span>
      </div>
    </div>
  );
};
