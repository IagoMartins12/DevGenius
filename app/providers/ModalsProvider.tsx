'use client';

import { UsersModal } from '../components/UsersModal/UsersModal';
import { DeleteCommentModal } from '../components/DeleteCommentModal/deleteCommentModal';
import { DeletePostModal } from '../components/DeletePostModal/DeletePostModa';
import { LoginModal } from '../components/LoginModal/LoginModal';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <DeletePostModal />
      <DeleteCommentModal />
      <UsersModal />
    </>
  );
};

export default ModalsProvider;
