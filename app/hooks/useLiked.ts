import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from './modals/useLoginModal';
import { Like, User } from '@prisma/client';
import { useGlobalContext } from '../context/store';
import { AddItem, RemoveItem } from '../utils/HelpersFunctions';

interface IUseLiked {
  postId: string;
  currentUser?: User | null;
  liked: Like[];
}

const useLiked = ({ postId, currentUser, liked }: IUseLiked) => {
  const loginModal = useLoginModal();
  const { setLikesState } = useGlobalContext();

  const hasFavorited = useMemo(() => {
    const userFavorites = liked.map(liked => {
      liked.userId === currentUser?.id;
    });

    return userFavorites;
  }, [currentUser, liked]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      const isLiked = liked.some(
        like => like.userId === currentUser.id && like.postId === postId,
      );

      try {
        if (isLiked) {
          await axios.delete(`/api/like/${postId}`);
          RemoveItem(liked, setLikesState, currentUser, postId);
        } else {
          const response = await axios.post(`/api/like/${postId}`);
          AddItem(liked, response.data, setLikesState);
        }
        toast.success('Sucesso');
      } catch (error) {
        toast.error('Algo deu errado, tente novamente');
      }
    },
    [currentUser, liked, postId, loginModal],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useLiked;
