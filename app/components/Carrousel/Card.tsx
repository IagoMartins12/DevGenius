import { useGlobalContext } from '@/app/context/store';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardProps {
  post: Post;
  categoriesPosts: CategoryRelationsPosts[];
}

export const Card: React.FC<CardProps> = ({ post, categoriesPosts }) => {
  const [MAX_RESUME_LENGTH, setMaxResumeLength] = useState(180); // Default value for smaller screens

  const resumeText = post.resume ?? '';
  const truncatedResume =
    resumeText.length > MAX_RESUME_LENGTH
      ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
      : resumeText;

  useEffect(() => {
    const handleWindowSizeChange = () => {
      const width = window.innerWidth;
      setMaxResumeLength(width > 820 ? 250 : 100);
    };

    handleWindowSizeChange();

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const { navigateToUrl } = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`card w-[33%] m-2 rounded-lg overflow-hidden card-height ${
        theme === 'light' ? 'relatedCard-white' : 'relatedCard-dark'
      }`}
    >
      <div
        className={`rounded h-full cursor-pointer`}
        key={post.id}
        onClick={() => navigateToUrl('post', post.id)}
      >
        <div className='aspect-video w-full h-3/6 relative overflow-hidden'>
          <Image
            fill
            className='object-cover w-full group-hover:scale-110 transition'
            src={post.photo_background}
            alt='Listing'
          />
        </div>

        <div className='px-6 py-4 h-3/6 flex flex-col gap-y-4'>
          <div
            className={`font-bold text-base ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            {post.title}
          </div>
          <div
            className={`font-semibold text-sm  ${
              theme === 'light' ? 'text-gray-950' : 'text-white'
            }`}
          >
            {truncatedResume}
          </div>
        </div>
      </div>
    </div>
  );
};
