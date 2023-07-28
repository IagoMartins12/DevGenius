import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './UserPage';
import { HorizontalCard } from '../HorizontalCard/HorizontalCard';

export const DeslikedPosts: React.FC<UserProps> = ({ currentUser }) => {
  const { deslikeState, postsState } = useGlobalContext();

  const deslikedPostsByUserId = deslikeState
    .filter(deslike => deslike.userId == currentUser.id)
    .map(deslike => deslike.postId);

  const desliked = postsState.filter(post =>
    deslikedPostsByUserId.includes(post.id),
  );

  return (
    <div>
      <div className='flex flex-col w-11/12 mx-auto items-center justify-center'>
        <div className='flex flex-col gap-y-8 w-full'>
          <h1 className='text-2xl font-bold text-center '>
            Posts Descurtidos:
          </h1>
          {desliked.map(post => {
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
