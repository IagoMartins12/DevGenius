import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from './modals/useLoginModal';
import { Favorite, User } from '@prisma/client';

interface IUseFavorited {
  postId: string;
  currentUser?: User | null;
  favorited: Favorite[];
}

const useFavorited = ({ postId, currentUser, favorited }: IUseFavorited) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const userFavorites = favorited.map(favorite => {
      favorite.userId === currentUser?.id;
    });

    return userFavorites;
  }, [currentUser, favorited]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      const userFavorited = favorited.some(favorited => {
        return favorited.postId === postId;
      });

      try {
        let request;

        if (userFavorited) {
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

export default useFavorited;
