'use client';

import { FaRegComments } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import LikedButton from './LikedButton';
import DeslikedButton from './DeslikedButton';
import FavoritedButton from './FavoriteButton';
import { useGlobalContext } from '@/app/context/store';
import useShareLinks from '@/app/hooks/modals/useShareLinks';
import { useTheme } from 'next-themes';

interface IReactionsComponent {
  commentAction: () => void;
  postId: string;
}
export const ReactionsComponent: React.FC<IReactionsComponent> = ({
  commentAction,
  postId,
}) => {
  const {
    likeState,
    deslikeState,
    favoritesState,
    currentUserState,
    commentsState,
  } = useGlobalContext();

  const comments = commentsState.filter(comment => comment.postId === postId);
  const shareLink = useShareLinks();
  const { theme } = useTheme();

  const likedLenght = likeState.filter(liked => liked.postId === postId).length;
  const desLikedLenght = deslikeState.filter(
    desliked => desliked.postId === postId,
  ).length;
  const favoritedLenght = favoritesState.filter(
    favorites => favorites.postId === postId,
  ).length;

  return (
    <div
      className={`Container ${
        theme === 'light' ? 'reactIcons-white' : 'reactIcons-dark'
      }`}
    >
      <Tooltip id='my-tooltip' style={{ zIndex: '9999' }} />
      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Like!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <LikedButton
          liked={likeState}
          postId={postId}
          currentUser={currentUserState}
        />
        <span>{likedLenght}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Deslike!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <DeslikedButton
          desLiked={deslikeState}
          postId={postId}
          currentUser={currentUserState}
        />
        <span>{desLikedLenght}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Comentarios!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <FaRegComments size={30} onClick={commentAction} />
        <span>{comments.length}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Salvar!'
        data-tooltip-place='right'
        className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
      >
        <FavoritedButton
          favorited={favoritesState}
          postId={postId}
          currentUser={currentUserState}
        />
        <span>{favoritedLenght}</span>
      </a>

      <a
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Compartilhar!'
        data-tooltip-place='right'
        className='z-20 flex flex-col'
      >
        <BiDotsHorizontalRounded size={30} onClick={shareLink.onOpen} />
      </a>
    </div>
  );
};
