import { Comment, User } from '@prisma/client';
import { IoMdCloseCircle } from 'react-icons/io';

export const CommentCard = ({
  comment,
  user,
  currentUser,
}: {
  comment: Comment;
  user: User | undefined;
  currentUser: User | null;
}) => {
  return (
    <div className='flex h-32 border-2 border-black p-2'>
      <div className='w-1/12 flex items-start justify-center'>
        <div className='w-14 h-14 rounded-full bg-slate-500'></div>
      </div>
      <div className='w-11/12 flex items-center border-black  flex-col gap-y-3'>
        <div className='w-full h-full py-1 px-2 flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-3 justify-between'>
            <div className='flex items-center gap-x-3'>
              <span className='font-bold text-lg text-center'>
                {user?.username}
              </span>
              <span className='text-sm text-center'>
                {comment.createdAt.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            {user?.id === currentUser?.id && (
              <div className='flex'>
                <IoMdCloseCircle
                  size={20}
                  className='cursor-pointer'
                  onClick={() => {}}
                />
              </div>
            )}
          </div>

          <span className='font-normal text-base'>{comment.content}</span>
        </div>
      </div>
    </div>
  );
};
