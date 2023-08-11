'use client';

import { useEffect } from 'react';
import useChangePasswordModal from '@/app/hooks/modals/useChangePassword';
import useDeleteCommentModal from '@/app/hooks/modals/useDeleteCommentModal';
import useDeletePostModal from '@/app/hooks/modals/useDeletePostModal';
import useForgetPasswordModal from '@/app/hooks/modals/useForgetPassword';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';

export const ModalsBackground = () => {
  const modals = [
    useLoginModal(),
    useRegisterModal(),
    useDeletePostModal(),
    useDeleteCommentModal(),
    useForgetPasswordModal(),
    useChangePasswordModal(),
  ];

  useEffect(() => {
    const isOpen = modals.some(modal => modal.isOpen);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modals]);

  return (
    <div
      className='modalBackground'
      style={{
        display: modals.some(modal => modal.isOpen) ? 'flex' : 'none',
      }}
      onClick={() => {
        modals.forEach(modal => {
          if (modal.isOpen) {
            modal.onClose();
          }
        });
      }}
    />
  );
};
