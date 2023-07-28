'use client';

import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './UserPage';
import { HorizontalCard } from '../HorizontalCard/HorizontalCard';

export const LikedPosts: React.FC<UserProps> = ({ currentUser }) => {
  const { likeState, postsState } = useGlobalContext();

  const likedPostsByUserId = likeState
    .filter(like => like.userId == currentUser.id)
    .map(like => like.postId);

  const likekPostsByUser = postsState.filter(post =>
    likedPostsByUserId.includes(post.id),
  );

  return (
    <div>
      <div className='flex flex-col w-11/12 mx-auto items-center justify-center'>
        <div className='flex flex-col gap-y-8 w-full'>
          <h1 className='text-2xl font-bold text-center '>Posts Curtidos:</h1>
          {likekPostsByUser.map(post => {
            return (
              <div className='flex flex-col gap-y-3'>
                <HorizontalCard post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
