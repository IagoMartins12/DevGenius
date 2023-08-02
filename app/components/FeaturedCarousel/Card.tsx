import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import { Post } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { FeaturedIcon } from '../FeaturedIcon';

interface CardProps {
  post: Post;
}

export const Card: React.FC<CardProps> = ({ post }) => {
  const [MAX_RESUME_LENGTH, setMaxResumeLength] = useState(180); // Default value for smaller screens

  const resumeText = post.resume ?? '';
  const truncatedResume =
    resumeText.length > MAX_RESUME_LENGTH
      ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
      : resumeText;

  const { navigateToUrl } = useNavigate();

  return (
    <div className='FeaturedCard w-[100%] overflow-hidden '>
      <div
        className={`rounded h-full cursor-pointer relative`}
        key={post.id}
        onClick={() => navigateToUrl('post', post.id)}
      >
        <div className='px-6 py-4 flex flex-col gap-y-4 absolute bottom-0 z-30 w-10/12 mx-auto'>
          <div className='font-bold text-lg text-white'>{post.title}</div>
          <div className='font-semibold text-sm text-white'>
            {truncatedResume}
          </div>
        </div>

        <div className='aspect-video w-full h-full overflow-hidden'>
          <img src={post.photo_background} alt='' className=' w-full h-full ' />
        </div>
        <FeaturedIcon />
      </div>
    </div>
  );
};
