import { useGlobalContext } from '@/app/context/store';
import { UserProps } from './AccountPage';
import { CommentCard } from '../CommentsSection/CommentCard';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

export const Comments: React.FC<UserProps> = ({
  currentUser,
  isMyAccount = true,
}) => {
  const { commentsState } = useGlobalContext();

  const { navigateToUrl } = useNavigate();
  const commentsMade = commentsState.filter(
    comment => comment.userId == currentUser.id,
  );

  return (
    <div>
      <div className='flex flex-col w-11/12 mx-auto items-center justify-center'>
        <div className='flex flex-col gap-y-8 w-full'>
          <h1 className='text-2xl font-bold text-center '>Comentarios:</h1>
          {commentsMade.length > 0 ? (
            commentsMade.map(comment => {
              return (
                <div
                  className='flex flex-col gap-y-3 cursor-pointer'
                  onClick={() => navigateToUrl('post', comment.postId)}
                >
                  <CommentCard
                    comment={comment}
                    currentUser={currentUser}
                    user={currentUser}
                  />
                </div>
              );
            })
          ) : (
            <div className='w-full flex items-center justify-center'>
              {isMyAccount ? (
                <h1 className='font-bold text-xl text-center'>
                  Você ainda não comentou em nenhum post!
                </h1>
              ) : (
                <h1 className='font-bold text-xl text-center'>
                  {currentUser.username} ainda não comentou em nenhum post!
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
