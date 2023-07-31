'use client';

import { CategoryRelationsPosts, Post, User } from '@prisma/client';
import Image from 'next/image';
import { useGlobalContext } from '@/app/context/store';
import { compareDesc } from 'date-fns';
import { useTheme } from 'next-themes';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

interface PostCard {
  categoriesPost: CategoryRelationsPosts[];
  allUsers: User[];
}

export const PostCard: React.FC<PostCard> = ({ categoriesPost, allUsers }) => {
  const { theme } = useTheme();
  const { navigateToUrl } = useNavigate();

  const { categoriesState, postsState } = useGlobalContext();

  const sortedPostsState = [...postsState].sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  return (
    <>
      <div className='flex flex-col lg:!px-28 px-2 py-4 bg-color'>
        <div className='py-1'>
          <h2 className='font-bold'>Posts recentes: </h2>
        </div>

        <div className='py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
          {sortedPostsState.map((post: Post, index: number) => {
            const author = allUsers.filter(user => user.id === post.userId);

            return (
              <div
                className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer
            ${theme === 'light' ? 'card-white' : 'card-dark'}`}
                key={post.id}
                onClick={() => navigateToUrl('post', post.id)}
              >
                <div className='aspect-video w-full relative overflow-hidden rounded-xl'>
                  <Image
                    fill
                    className='object-cover h-1 w-full group-hover:scale-110 transition'
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
                      const categoryName = category
                        ? category.category_name
                        : '';
                      return (
                        <span
                          className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
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
            );
          })}
        </div>
      </div>
    </>
  );
};
