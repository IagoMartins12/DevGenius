import { Post } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HorizontalCardProps {
  post: Post;
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ post }) => {
  const MAX_RESUME_LENGTH = 350;
  const resumeText = post.resume ?? '';
  const router = useRouter();

  const truncatedResume =
    resumeText.length > MAX_RESUME_LENGTH
      ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
      : resumeText;

  const navigateToPost = (postId: string) => {
    router.push(`post/${postId}`);
  };

  return (
    <div
      className='w-full flex shadow-lg p-3 gap-3 cursor-pointer'
      onClick={() => navigateToPost(post.id)}
    >
      <div className='w-2/12'>
        <div className='aspect-video w-full h-full relative flex cursor-pointer'>
          <Image
            fill
            className='object-cover w-full'
            src={post.photo_background}
            alt='Post'
          />
        </div>
      </div>
      <div className='flex flex-col w-10/12'>
        <span className='text-xl font-semibold'> {post.title}</span>
        <span className='text-sm font-medium'> {truncatedResume}</span>
      </div>
    </div>
  );
};
