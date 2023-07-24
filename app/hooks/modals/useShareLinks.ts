import { Post } from '@prisma/client';
import { create } from 'zustand';

interface ShareLinks {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentPost: Post | null;
  setCurrentPost: (post: Post) => void;
}

const useShareLinks = create<ShareLinks>(set => ({
  currentPost: null,
  isOpen: false,
  onOpen: () => set(state => ({ isOpen: !state.isOpen })), // Utilize set com uma função para acessar o estado anterior
  onClose: () => set({ isOpen: false }),
  setCurrentPost: (post: Post) => set({ currentPost: post }),
}));

export default useShareLinks;
