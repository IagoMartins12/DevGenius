'use client';

import { CategoryRelationsPosts, Post, User } from '@prisma/client';
import { useGlobalContext } from '@/app/context/store';
import { compareDesc } from 'date-fns';
import { FeaturedCarousel } from '../FeaturedCarousel/FeaturedCarousel';
import { PostCard } from '../PostCard/PostCard';

interface HomeComponentProps {
  categoriesPost: CategoryRelationsPosts[];
  allUsers: User[];
}

export const HomeComponent: React.FC<HomeComponentProps> = ({
  categoriesPost,
  allUsers,
}) => {
  const { postsState } = useGlobalContext();
  const MAX_RESUME_LENGTH = 250;

  const sortedPostsState = [...postsState].sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  return (
    <>
      <div className='lg:!px-28 px-2 w-full'>
        <div className='py-10 grid grid-cols-1 sm:grid-cols-12 gap-5 max-w-full '>
          <div className='sm:col-span-12 lg:col-span-6 carousel-height'>
            <FeaturedCarousel />
          </div>
          {sortedPostsState.map((post: Post, index: number) => {
            const author = allUsers.filter(user => user.id === post.userId);
            const resumeText = post.resume ?? '';
            const truncatedResume =
              resumeText.length > MAX_RESUME_LENGTH
                ? resumeText.substring(0, MAX_RESUME_LENGTH) + '...'
                : resumeText;

            return (
              <PostCard
                author={author}
                truncatedResume={truncatedResume}
                categoriesPost={categoriesPost}
                post={post}
                withHeight
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
