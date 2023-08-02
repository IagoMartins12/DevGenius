'use client';

import { useGlobalContext } from '@/app/context/store';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { RelatedCarousel } from '../Carrousel/relatedCarousel';

export const RelatedPosts = ({
  categoriesPost,
  currentPost,
}: {
  categoriesPost: CategoryRelationsPosts[];
  currentPost: Post | null;
}) => {
  const { postsState } = useGlobalContext();

  const postsIds = categoriesPost.map(categoryPost => categoryPost.postId);
  const relatedPosts = postsState.filter(post => {
    return postsIds.includes(post.id) && post.id !== currentPost?.id;
  });

  return (
    <div className={`flex flex-col w-11/12 mx-auto pt-8`}>
      <RelatedCarousel posts={relatedPosts} />
    </div>
  );
};
