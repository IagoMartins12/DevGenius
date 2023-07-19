import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from './modals/useLoginModal';
import { Like, User } from '@prisma/client';

interface IUseLiked {
  postId: string;
  currentUser?: User | null;
  liked: Like[];
}

const useLiked = ({ postId, currentUser, liked }: IUseLiked) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const userId = currentUser?.id || null;

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

      const userFavorites = liked.some(liked => {
        return liked.postId === postId;
      });

      console.log(userFavorites);
      try {
        let request;

        if (userFavorites) {
          request = () => axios.delete(`/api/like/${postId}`);
        } else {
          request = () => axios.post(`/api/like/${postId}`);
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

export default useLiked;
