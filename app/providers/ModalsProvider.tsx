'use client';

import { UsersModal } from '../components/UsersModal/UsersModal';
import { DeleteCommentModal } from '../components/deleteCommentModal/deleteCommentModal';
import { DeletePostModal } from '../components/deletePostModal/DeletePostModa';
import { LoginModal } from '../components/loginModal/LoginModal';
import { RegisterModal } from '../components/registerModal/RegisterModal';

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
