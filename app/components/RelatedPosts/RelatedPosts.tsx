'use client';

import { useGlobalContext } from '@/app/context/store';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FeaturedCarrousel } from '../Carrousel/FeaturedCarrousel';

export const RelatedPosts = ({
  categoriesPost,
  currentPost,
}: {
  categoriesPost: CategoryRelationsPosts[];
  currentPost: Post | null;
}) => {
  const { postsState, categoriesState } = useGlobalContext();
  const { theme } = useTheme();
  const { navigateToUrl } = useNavigate();

  const postsIds = categoriesPost.map(categoryPost => categoryPost.postId);
  const relatedPosts = postsState.filter(post => {
    return postsIds.includes(post.id) && post.id !== currentPost?.id;
  });

  return (
    <div className={`flex flex-col w-11/12 mx-auto pt-8`}>
      <FeaturedCarrousel
        posts={relatedPosts}
        categoriesPosts={categoriesPost}
      />
    </div>
  );
};
