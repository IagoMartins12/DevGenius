'use client';

import useDeleteCommentModal from '@/app/hooks/modals/useDeleteCommentModal';
import useDeletePostModal from '@/app/hooks/modals/useDeletePostModal';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';
import { useEffect } from 'react';

export const ModalsBackground = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const deletePostModal = useDeletePostModal();
  const deleteCommentModal = useDeleteCommentModal();

  useEffect(() => {
    if (
      loginModal.isOpen ||
      registerModal.isOpen ||
      deletePostModal.isOpen ||
      deleteCommentModal.isOpen
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [
    loginModal.isOpen,
    registerModal.isOpen,
    deletePostModal.isOpen,
    deleteCommentModal.isOpen,
  ]);

  return (
    <div
      className='modalBackground'
      style={{
        display:
          loginModal.isOpen ||
          registerModal.isOpen ||
          deletePostModal.isOpen ||
          deleteCommentModal.isOpen
            ? 'flex'
            : 'none',
      }}
      onClick={() => {
        if (loginModal.isOpen) {
          loginModal.onClose();
        }
        if (registerModal.isOpen) {
          registerModal.onClose();
        }
        if (deletePostModal.isOpen) {
          deletePostModal.onClose();
        }
        if (deleteCommentModal.isOpen) {
          deleteCommentModal.onClose();
        }
      }}
    />
  );
};
