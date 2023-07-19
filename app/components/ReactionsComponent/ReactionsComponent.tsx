'use client';

import { FcLike, FcDislike } from 'react-icons/fc';
import { FaRegComments } from 'react-icons/fa';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Favorite, Like, User } from '@prisma/client';
import HeartButton from '../HeartButton';

interface IReactionsComponent {
  likeAction: () => void;
  dislikeAction: () => void;
  commentAction: () => void;
  saveAction: () => void;
  commentsLenght: number;
  postId: string;
  currentUser?: User | null;
  liked: Like[];
}
export const ReactionsComponent: React.FC<IReactionsComponent> = ({
  likeAction,
  dislikeAction,
  commentAction,
  saveAction,
  commentsLenght,
  postId,
  currentUser,
  liked,
}) => {
  const likedLenght = liked.filter(liked => liked.postId === postId).length;
  return (
    <div className='flex flex-col gap-y-4 fixed top-1/4 left-12'>
      <Tooltip id='my-tooltip' style={{ zIndex: '9999' }} />
      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Like!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <HeartButton liked={liked} postId={postId} currentUser={currentUser} />
        <span>{likedLenght}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Deslike!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <FcDislike size={30} onClick={dislikeAction} />
        <span>4</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Comentarios!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <FaRegComments size={30} onClick={commentAction} />
        <span>{commentsLenght}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Salvar!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
        href='commentArea'
      >
        <BsBookmark size={30} onClick={saveAction} />
        <span>4</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Compartilhar!'
        data-tooltip-place='right'
        className='z-20'
      >
        <BiDotsHorizontalRounded size={30} />
      </a>
    </div>
  );
};
