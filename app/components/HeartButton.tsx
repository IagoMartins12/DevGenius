'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Favorite, User } from '@prisma/client';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  postId: string;
  currentUser?: User | null;
  favorites: Favorite[];
}

const HeartButton: React.FC<HeartButtonProps> = ({
  postId,
  currentUser,
  favorites,
}) => {
  const { toggleFavorite } = useFavorite({
    postId,
    favorites,
    currentUser,
  });

  const userFavorites = favorites.some(favorite => {
    return favorite.postId === postId;
  });

  return (
    <div
      onClick={e => {
        toggleFavorite(e);
      }}
      className='
        relative
        hover:opacity-80
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
