import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './modals/useLoginModal';
import { Favorite, User } from '@prisma/client';
import { useGlobalContext } from '../context/store';
import { AddItem, RemoveItem } from '../utils/HelpersFunctions';

interface IUseFavorited {
  postId: string;
  currentUser?: User | null;
  favorited: Favorite[];
}

const useFavorited = ({ postId, currentUser, favorited }: IUseFavorited) => {
  const loginModal = useLoginModal();
  const { setFavoritesState } = useGlobalContext();

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

      const isFavorited = favorited.some(favorite => {
        return favorite.postId === postId && favorite.userId === currentUser.id;
      });

      try {
        if (isFavorited) {
          await axios.delete(`/api/favorite/${postId}`);
          RemoveItem(favorited, setFavoritesState, currentUser, postId);
        } else {
          const response = await axios.post(`/api/favorite/${postId}`);
          AddItem(favorited, response.data, setFavoritesState);
        }

        toast.success('Sucesso');
      } catch (error) {
        toast.error('Algo deu errado, tente novamente');
      }
    },
    [currentUser, hasFavorited, postId, loginModal],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorited;
