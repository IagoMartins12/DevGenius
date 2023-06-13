'use client';

import { LoginModal } from '../components/loginModal/LoginModal';
import { RegisterModal } from '../components/registerModal/RegisterModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default ModalsProvider;
