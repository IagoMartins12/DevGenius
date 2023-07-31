'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Like, User } from '@prisma/client';
import useLiked from '../hooks/useLiked';

interface HeartButtonProps {
  postId: string;
  currentUser?: User | null;
  liked: Like[];
}

const HeartButton: React.FC<HeartButtonProps> = ({
  postId,
  currentUser,
  liked,
}) => {
  const { toggleFavorite } = useLiked({
    postId,
    currentUser,
    liked,
  });

  const userFavorites = liked.some(liked => {
    return liked.postId === postId;
  });

  return (
    <div
      onClick={e => {
        toggleFavorite(e);
      }}
      className='relative hover:opacity-80
        transition
        cursor-pointer
      '
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillHeart
        size={24}
        className={userFavorites ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
