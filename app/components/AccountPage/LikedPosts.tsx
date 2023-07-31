'use client';

import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './AccountPage';
import { HorizontalCard } from '../HorizontalCard/HorizontalCard';

export const LikedPosts: React.FC<UserProps> = ({
  currentUser,
  isMyAccount = true,
}) => {
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
          {likedPostsByUserId.length > 0 ? (
            likekPostsByUser.map(post => {
              return (
                <div className='flex flex-col gap-y-3'>
                  <HorizontalCard post={post} />
                </div>
              );
            })
          ) : (
            <div className='w-full flex items-center justify-center'>
              {isMyAccount ? (
                <h1 className='font-bold text-xl text-center'>
                  Você ainda não curtiu nenhum post!
                </h1>
              ) : (
                <h1 className='font-bold text-xl text-center'>
                  {currentUser.username} ainda não curtiu nenhum post!
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
