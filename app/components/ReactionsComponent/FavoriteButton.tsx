'use client';

import { Favorite, User } from '@prisma/client';
import useFavorited from '@/app/hooks/useFavorited';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

interface Props {
  postId: string;
  currentUser?: User | null;
  favorited: Favorite[];
}

const FavoritedButton: React.FC<Props> = ({
  postId,
  currentUser,
  favorited,
}) => {
  const { toggleFavorite } = useFavorited({
    postId,
    currentUser,
    favorited,
  });

  const userFavorited = favorited.some(
    favorited =>
      favorited.postId === postId && favorited.userId === currentUser?.id,
  );

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
      {userFavorited ? <BsBookmarkFill size={28} /> : <BsBookmark size={28} />}
    </div>
  );
};

export default FavoritedButton;
