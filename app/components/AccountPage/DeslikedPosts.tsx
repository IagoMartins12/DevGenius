import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './AccountPage';
import { HorizontalCard } from '../HorizontalCard/HorizontalCard';

export const DeslikedPosts: React.FC<UserProps> = ({
  currentUser,
  isMyAccount = true,
}) => {
  const { deslikeState, postsState } = useGlobalContext();

  const deslikedPostsByUserId = deslikeState
    .filter(deslike => deslike.userId == currentUser.id)
    .map(deslike => deslike.postId);

  const deslikedPostByUser = postsState.filter(post =>
    deslikedPostsByUserId.includes(post.id),
  );

  return (
    <div>
      <div className='flex flex-col w-11/12 mx-auto items-center justify-center'>
        <div className='flex flex-col gap-y-8 w-full'>
          <h1 className='text-2xl font-bold text-center '>
            Posts Descurtidos:
          </h1>
          {deslikedPostByUser.length > 0 ? (
            deslikedPostByUser.map(post => {
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
                  Você ainda não descurtiu nenhum post!
                </h1>
              ) : (
                <h1 className='font-bold text-xl text-center'>
                  {currentUser.username} ainda não descurtiu nenhum post!
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
