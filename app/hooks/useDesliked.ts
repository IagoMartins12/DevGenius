import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from './modals/useLoginModal';
import { Like, User } from '@prisma/client';

interface IUseDesliked {
  postId: string;
  currentUser?: User | null;
  desLiked: Like[];
}

const useDesliked = ({ postId, currentUser, desLiked }: IUseDesliked) => {
  const router = useRouter();

  const loginModal = useLoginModal();

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

      const userDesliked = desLiked.some(desliked => {
        return desliked.postId === postId;
      });

      try {
        let request;

        if (userDesliked) {
          request = () => axios.delete(`/api/deslike/${postId}`);
        } else {
          request = () => axios.post(`/api/deslike/${postId}`);
        }

        await request();
        router.refresh();
        toast.success('Sucesso');
      } catch (error) {
        toast.error('Algo deu errado, tente novamente');
      }
    },
    [currentUser, hasDesliked, postId, loginModal, router],
  );

  return {
    hasDesliked,
    toggleFavorite,
  };
};

export default useDesliked;
