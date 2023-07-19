'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Like, User } from '@prisma/client';
import useLiked from '@/app/hooks/useLiked';

interface LikedButtonProps {
  postId: string;
  currentUser?: User | null;
  liked: Like[];
}

const LikedButton: React.FC<LikedButtonProps> = ({
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
    return liked.postId === postId && liked.userId === currentUser?.id;
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
      {userFavorites ? (
        <AiFillHeart size={28} className='fill-rose-500' />
      ) : (
        <AiOutlineHeart size={28} />
      )}
    </div>
  );
};

export default LikedButton;
