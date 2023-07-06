import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from './modals/useLoginModal';
import { Favorite, User } from '@prisma/client';

interface IUseFavorite {
  postId: string;
  currentUser?: User | null;
  favorites: Favorite[];
}

const useFavorite = ({ postId, currentUser, favorites }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const userId = currentUser?.id || null;

  const hasFavorited = useMemo(() => {
    const userFavorites = favorites.map(favorite => {
      favorite.userId === currentUser?.id;
    });

    return userFavorites;
  }, [currentUser, favorites]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      const userFavorites = favorites.some(favorite => {
        return favorite.postId === postId;
      });

      try {
        let request;

        if (userFavorites) {
          request = () => axios.delete(`/api/favorite/${postId}`);
        } else {
          request = () => axios.post(`/api/favorite/${postId}`);
        }

        await request();
        router.refresh();
        toast.success('Sucesso');
      } catch (error) {
        toast.error('Algo deu errado, tente novamente');
      }
    },
    [currentUser, hasFavorited, postId, loginModal, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
