'use client';

import useThemes, { Themes } from '@/app/hooks/useTheme';
import {
  Category,
  CategoryRelationsPosts,
  Favorite,
  Post,
  User,
} from '@prisma/client';
import HeartButton from '../HeartButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CategoryCard = ({
  posts,
  categoriesPost,
  categories,
  currentUser,
  favorites,
  categoryName,
}: {
  posts: Post[];
  categoriesPost: CategoryRelationsPosts[];
  categories: Category[];
  currentUser: User | null;
  favorites: Favorite[];
  categoryName: string | undefined;
}) => {
  const themes: Themes = useThemes().theme;
  const router = useRouter();

  const navigate = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  console.log(posts);

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
      <div className=''>
        <h2 className=' text-xl font-bold'>
          {categoryName ? <> {categoryName}: </> : 'Categoria não encontrada'}{' '}
        </h2>
      </div>
      {posts.length > 0 ? (
        <div className='py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
          {posts.map((post: Post, index: number) => (
            <div
              className={`rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer
            ${themes === 'light' ? 'card-white' : 'card-dark'}`}
              key={post.id}
              onClick={() => navigate(post.id)}
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
                    currentUser={currentUser}
                    favorites={favorites}
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
      ) : (
        <div className='w-full h-40 flex items-center justify-center'>
          <h1 className='text-2xl font-bold text-center'>
            Nenhum artigo encontrado!
          </h1>
        </div>
      )}
    </div>
  );
};
