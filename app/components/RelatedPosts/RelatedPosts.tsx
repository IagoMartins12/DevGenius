'use client';

import { useGlobalContext } from '@/app/context/store';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const RelatedPosts = ({
  categoriesPost,
  currentPost,
}: {
  categoriesPost: CategoryRelationsPosts[];
  currentPost: Post | null;
}) => {
  const router = useRouter();

  const { postsState, categoriesState } = useGlobalContext();
  const { theme } = useTheme();

  const postsIds = categoriesPost.map(categoryPost => categoryPost.postId);

  const relatedPosts = postsState.filter(post => {
    return postsIds.includes(post.id) && post.id !== currentPost?.id;
  });

  const navigatePost = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const navigateCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div className={`flex flex-col w-11/12 mx-auto pt-8`}>
      <div className='pt-1'>
        <h2 className='font-bold'>Artigos relacionados: </h2>
      </div>
      <div className='py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
        {relatedPosts.map((post: Post) => (
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer
            ${theme === 'light' ? 'card-white' : 'card-dark'}`}
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
