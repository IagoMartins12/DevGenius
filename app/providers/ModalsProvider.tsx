'use client';

import { DeletePostModal } from '../components/deletePostModal/DeletePostModa';
import { LoginModal } from '../components/loginModal/LoginModal';
import { RegisterModal } from '../components/registerModal/RegisterModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <DeletePostModal />
    </>
  );
};

export default ModalsProvider;
