import { Post } from '@prisma/client';
import { create } from 'zustand';

interface deletePostModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentPost: Post | null;
  setCurrentPost: (post: Post) => void;
}

const useDeletePostModal = create<deletePostModal>(set => ({
  currentPost: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCurrentPost: (post: Post) => set({ currentPost: post }),
}));

export default useDeletePostModal;
