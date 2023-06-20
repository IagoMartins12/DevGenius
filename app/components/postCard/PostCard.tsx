'use client';

import useThemes from '@/app/hooks/useTheme';
import { Category, CategoryRelationsPosts, Post } from '@prisma/client';

interface PostProps {
  posts?: Post | null;
  categoriesPost?: CategoryRelationsPosts[];
  categories?: Category[];
}

export const PostCard = async ({
  posts,
  categoriesPost,
  categories,
}: {
  posts: Post[];
  categoriesPost: CategoryRelationsPosts[];
  categories: Category[];
}) => {
  const theme = useThemes();
  const themes: any = theme.theme;
  console.log(categories);
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

      <div className='py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
        {posts.map((post: Post, index: number) => (
          <div
            className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
            key={post.id}
          >
            <img
              className='d-block w-100 h-3/12'
              src={post.photo_background}
              alt='Third slide'
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{post.title}</div>
              <p className='text-gray-700 text-base'>{post.resume}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              {categoriesPost
                .filter(element => element.postId === post.id)
                .filter(categoryPost =>
                  categories.some(
                    category => category.id === categoryPost.categoryId,
                  ),
                )
                .map(categoryPost => {
                  const category = categories.find(
                    category => category.id === categoryPost.categoryId,
                  );
                  const categoryName = category ? category.category_name : '';
                  return (
                    <span
                      className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                      key={categoryPost.id}
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
