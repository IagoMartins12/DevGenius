import { Comment, Post } from '@prisma/client';
import { create } from 'zustand';

interface deleteCommentProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentComment: Comment | null;
  setCurrentComment: (comment: Comment) => void;
}

const useDeleteCommentModal = create<deleteCommentProps>(set => ({
  currentComment: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCurrentComment: (comment: Comment) => set({ currentComment: comment }),
}));

export default useDeleteCommentModal;
