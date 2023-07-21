import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './modals/useLoginModal';
import { Like, User } from '@prisma/client';
import { useGlobalContext } from '../context/store';
import { AddItem, RemoveItem } from '../utils/HelpersFunctions';

interface IUseDesliked {
  postId: string;
  currentUser?: User | null;
  desLiked: Like[];
}

const useDesliked = ({ postId, currentUser, desLiked }: IUseDesliked) => {
  const loginModal = useLoginModal();

  const { setDeslikesState } = useGlobalContext();

  const hasDesliked = useMemo(() => {
    const userFavorites = desLiked.map(desliked => {
      desliked.userId === currentUser?.id;
    });

    return userFavorites;
  }, [currentUser, desLiked]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      const isDesliked = desLiked.some(desliked => {
        return desliked.postId === postId && desliked.userId === currentUser.id;
      });

      try {
        if (isDesliked) {
          await axios.delete(`/api/deslike/${postId}`);
          RemoveItem(desLiked, setDeslikesState, currentUser, postId);
        } else {
          const response = await axios.post(`/api/deslike/${postId}`);
          AddItem(desLiked, response.data, setDeslikesState);
        }

        toast.success('Sucesso');
      } catch (error) {
        toast.error('Algo deu errado, tente novamente');
      }
    },
    [currentUser, hasDesliked, postId, loginModal],
  );

  return {
    hasDesliked,
    toggleFavorite,
  };
};

export default useDesliked;
