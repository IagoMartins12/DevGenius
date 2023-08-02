'use client';

import { CategoryRelationsPosts, Post, User } from '@prisma/client';

import { useGlobalContext } from '@/app/context/store';

import { PostCard } from '../PostCard/PostCard';

export const CategoryPageComponent = ({
  posts,
  categoriesPost,
  categoryId,
  allUsers,
}: {
  posts: Post[];
  categoriesPost: CategoryRelationsPosts[];
  categoryId: string;
  allUsers: User[];
}) => {
  const { categoriesState } = useGlobalContext();
  const MAX_RESUME_LENGTH = 180;

  const categoryName = categoriesState.find(
    category => category.id === categoryId,
  );

  return (
    <div className='flex flex-col px-10 lg:px-32 pt-7 pb-16'>
      <div className=''>
        <h2 className=' text-xl font-bold'>
          {categoryName ? (
            <> {categoryName.category_name}: </>
          ) : (
            'Categoria não encontrada'
          )}{' '}
        </h2>
      </div>
      {posts.length > 0 ? (
        <div className='py-10 grid grid-cols-1 sm:grid-cols-12 gap-5 max-w-full '>
          {posts.map((post: Post) => {
            const author = allUsers.filter(user => user.id === post.userId);
            const resumeText = post.resume ?? '';
            const truncatedResume =
              resumeText.length > MAX_RESUME_LENGTH
                ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
                : resumeText;

            return (
              <PostCard
                post={post}
                truncatedResume={truncatedResume}
                categoriesPost={categoriesPost}
                author={author}
              />
            );
          })}
        </div>
      ) : (
        <div className='w-full flex items-center justify-center'>
          <h1 className='text-2xl font-bold text-center'>
            Nenhum artigo encontrado!
          </h1>
        </div>
      )}
    </div>
  );
};
