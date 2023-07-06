import { Comment, User } from '@prisma/client';
import { CommentCard } from './CommentCard';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

export const CommentsSection = ({
  comments,
  setComments,
  currentUser,
  register,
  onSubmit,
  handleSubmit,
  allUsers,
}: {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  currentUser: User | null;
  register: UseFormRegister<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  allUsers: User[];
}) => {
  const getUser = (id: string) => {
    const user = allUsers.find((user: User) => user.id === id);

    return user;
  };

  console.log('postPage 2', comments);

  return (
    <div className='w-full flex flex-col gap-y-4'>
      <div className='flex items-center justify-start '>
        <h1 className='font-bold text-xl'>
          Comentarios:{' '}
          <span className='font-semibold text-lg'>{comments.length}</span>
        </h1>
      </div>
      <div className='flex h-44'>
        <div className='w-1/12 flex items-start justify-center'>
          <div className='aspect-video w-12 h-12 relative'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={currentUser?.image ?? '/user.svg'}
              alt='Post'
            />
          </div>
        </div>
        <div className='w-11/12 flex items-center border-black  flex-col gap-y-3'>
          <textarea
            className='w-full h-3/4 p-2 resize-none border-2 border-black'
            id=''
            placeholder='Adicionar comentario...'
            {...register('commentContent')}
          />
          <input
            type='button'
            value='Comentar'
            className='w-full h-1/4 border-2 border-black'
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
      <hr />
      <div className='my-8 flex flex-col gap-y-4'>
        {comments.map((comment: Comment) => {
          const user = getUser(comment.userId);
          return (
            <CommentCard
              comment={comment}
              user={user}
              currentUser={currentUser}
              setCommentsSection={setComments}
            />
          );
        })}
      </div>
    </div>
  );
};
