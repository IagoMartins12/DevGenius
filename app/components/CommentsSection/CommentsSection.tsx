import { Comment, User } from '@prisma/client';
import { CommentCard } from './CommentCard';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import Image from 'next/image';
import { BiCommentAdd } from 'react-icons/bi';
import { RefObject } from 'react';
import { useGlobalContext } from '@/app/context/store';

export const CommentsSection = ({
  register,
  onSubmit,
  handleSubmit,
  allUsers,
  commentsSectionRef,
  postId,
}: {
  register: UseFormRegister<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  allUsers: User[];
  commentsSectionRef: RefObject<HTMLDivElement>;
  postId: string;
}) => {
  const { currentUserState, commentsState } = useGlobalContext();

  const comments = commentsState.filter(comment => comment.postId === postId);

  const getUser = (id: string) => {
    const user = allUsers.find((user: User) => user.id === id);
    return user;
  };

  return (
    <div className='w-full flex flex-col gap-y-4' ref={commentsSectionRef}>
      <div className='flex items-center justify-start '>
        <h1 className='font-bold text-xl'>
          Comentarios:{' '}
          <span className='font-semibold text-lg'>{comments.length}</span>
        </h1>
      </div>
      <div className='flex h-44'>
        <div className='w-2/12 sm:w-1/12 flex items-start justify-center'>
          <div className='aspect-video w-12 h-12 relative'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={currentUserState?.image ?? '/user.png'}
              alt='Post'
            />
          </div>
        </div>
        <div className='w-10/12 sm:w-11/12 flex items-center  flex-col gap-y-3'>
          <textarea
            className='w-full h-3/4 p-2 resize-none border-1 border-black'
            id=''
            placeholder='Adicionar comentario...'
            {...register('commentContent')}
          />
          <button
            className='actionButton w-full'
            onClick={handleSubmit(onSubmit)}
          >
            <BiCommentAdd size={25} />
            Comentar
          </button>
        </div>
      </div>
      <hr />
      <div className='mt-8 pb-20 sm:pb-12 flex flex-col gap-y-4'>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => {
            const user = getUser(comment.userId);
            return (
              <CommentCard
                comment={comment}
                user={user}
                currentUser={currentUserState}
              />
            );
          })
        ) : (
          <div className='flex w-full items-center justify-center'>
            <h1 className='font-bold text-2xl text-center'>
              Ainda não há nenhum comentario neste artigo.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
