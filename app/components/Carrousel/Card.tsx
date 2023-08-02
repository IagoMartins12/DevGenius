import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import { Post } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface CardProps {
  post: Post;
}

export const Card: React.FC<CardProps> = ({ post }) => {
  const MAX_RESUME_LENGTH = 250;
  const resumeText = post.resume ?? '';
  const truncatedResume =
    resumeText.length > MAX_RESUME_LENGTH
      ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
      : resumeText;

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
        <div className='aspect-video w-full h-2/6 relative overflow-hidden'>
          <Image
            fill
            className='object-cover w-full group-hover:scale-110 transition'
            src={post.photo_background}
            alt='Listing'
          />
        </div>

        <div className='px-6 py-4 h-4/6 flex flex-col gap-y-4'>
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
