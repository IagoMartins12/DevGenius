import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './UserPage';
import { HorizontalCard } from '../HorizontalCard/HorizontalCard';

export const SavedPosts: React.FC<UserProps> = ({ currentUser }) => {
  const { favoritesState, postsState } = useGlobalContext();

  const favoritePostById = favoritesState
    .filter(like => like.userId == currentUser.id)
    .map(like => like.postId);

  const favoritePostByUser = postsState.filter(post =>
    favoritePostById.includes(post.id),
  );

  return (
    <div>
      <div className='flex flex-col w-11/12 mx-auto items-center justify-center'>
        <div className='flex flex-col gap-y-8 w-full'>
          <h1 className='text-2xl font-bold text-center '>Posts Salvos:</h1>
          {favoritePostByUser.length > 0 ? (
            favoritePostByUser.map(post => {
              return (
                <div className='flex flex-col gap-y-3'>
                  <HorizontalCard post={post} />
                </div>
              );
            })
          ) : (
            <div className='w-full flex items-center justify-center'>
              <h1 className='font-bold text-xl text-center'>
                {currentUser.username} ainda não salvou nenhum post!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
