'use client';

import { UsersModal } from '../components/UsersModal/UsersModal';
import { DeleteCommentModal } from '../components/DeleteCommentModal/deleteCommentModal';
import { DeletePostModal } from '../components/DeletePostModal/DeletePostModa';
import { LoginModal } from '../components/LoginModal/LoginModal';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';
import { ForgetPasswordModal } from '../components/ForgetPasswordModal/ForgetPasswordModal';
import { ChangePasswordModal } from '../components/ChangePasswordModal/ChangePasswordModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <DeletePostModal />
      <DeleteCommentModal />
      <ForgetPasswordModal />
      <ChangePasswordModal />
      <UsersModal />
    </>
  );
};

export default ModalsProvider;
