import { CategoryRelationsPosts, Post, User } from '@prisma/client';
import Image from 'next/image';
import { FeaturedIcon } from '../FeaturedIcon';
import { useTheme } from 'next-themes';
import { useGlobalContext } from '@/app/context/store';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

interface PostCardProps {
  post: Post;
  author: User[];
  categoriesPost: CategoryRelationsPosts[];
  truncatedResume: string;
  withHeight?: boolean;
}
export const PostCard: React.FC<PostCardProps> = ({
  post,
  author,
  categoriesPost,
  truncatedResume,
  withHeight = false,
}) => {
  const { theme } = useTheme();
  const { categoriesState } = useGlobalContext();
  const { navigateToUrl } = useNavigate();

  return (
    <div
      className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer sm:col-span-6 lg:col-span-3 ${
        withHeight ? 'card-height' : ''
      } ${theme === 'light' ? 'card-white' : 'card-dark'}`}
      key={post.id}
      onClick={() => navigateToUrl('post', post.id)}
    >
      <div
        className='aspect-video w-full relative overflow-hidden rounded-xl'
        style={{
          height: '40%',
        }}
      >
        <Image
          fill
          className='object-cover w-full group-hover:scale-110 transition'
          src={post.photo_background}
          alt='Listing'
        />

        <div className='absolute top-3 left-3'>
          <div className='aspect-video w-8 h-8 relative flex cursor-pointer'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={author[0].image ?? '/user.png'}
              alt='Post'
            />
          </div>
        </div>
        {post.featured === 1 ? <FeaturedIcon /> : null}
      </div>

      <div
        className='flex flex-col justify-around overflow-hidden px-3'
        style={{
          height: '60%',
        }}
      >
        <div className='py-3 flex items-center flex-col justify-center gap-y-3'>
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

        <div className='pb-2'>
          {categoriesPost
            .filter(element => element.postId === post.id)
            .map(categoryPost => {
              const category = categoriesState.find(
                category => category.id === categoryPost.categoryId,
              );
              const categoryName = category ? category.category_name : '';

              return (
                <span
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2'
                  key={categoryPost.id}
                  onClick={ev => {
                    ev.stopPropagation();
                    navigateToUrl('category', categoryPost.categoryId);
                  }}
                >
                  {categoryName}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};
