'use client';

import useThemes, { Themes } from '@/app/hooks/useTheme';
import { CategoryRelationsPosts, Post, User } from '@prisma/client';
import HeartButton from '../HeartButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

export const PostCard = ({
  categoriesPost,
}: {
  categoriesPost: CategoryRelationsPosts[];
}) => {
  const themes: Themes = useThemes().theme;
  const router = useRouter();

  const { categoriesState, likeState, postsState, currentUserState } =
    useGlobalContext();

  const navigatePost = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const navigateCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };
  return (
    <div
      className={`
      flex 
      flex-col 
      px-10 
      lg:px-32
      pt-7
      pb-16
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
    >
      <div className='pt-1'>
        <h2 className='font-bold'>Posts recentes: </h2>
      </div>

      <div className='py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
        {postsState.map((post: Post, index: number) => (
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
            key={post.id}
            onClick={() => navigatePost(post.id)}
          >
            <div className='aspect-video w-full relative overflow-hidden rounded-xl'>
              <Image
                fill
                className='object-cover h-1 w-full group-hover:scale-110 transition'
                src={post.photo_background}
                alt='Listing'
              />
              <div className='absolute top-3 right-3'>
                <HeartButton
                  postId={post.id}
                  currentUser={currentUserState}
                  liked={likeState}
                />
              </div>
            </div>

            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{post.title}</div>
              <p className='text-base'>{post.resume}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              {categoriesPost
                .filter(element => element.postId === post.id)
                .filter(categoryPost =>
                  categoriesState.some(
                    category => category.id === categoryPost.categoryId,
                  ),
                )
                .map(categoryPost => {
                  const category = categoriesState.find(
                    category => category.id === categoryPost.categoryId,
                  );
                  const categoryName = category ? category.category_name : '';
                  return (
                    <span
                      className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                      key={categoryPost.id}
                      onClick={ev => {
                        ev.stopPropagation();
                        navigateCategory(categoryPost.categoryId);
                      }}
                    >
                      {categoryName}
                    </span>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
