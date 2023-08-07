'use client';

import Image from 'next/image';
import useLoginModal from '../hooks/modals/useLoginModal';
import useRegisterModal from '../hooks/modals/useRegisterModal';

const UserNotAuth: React.FC = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className='h-[90vh] flex flex-col gap-2 items-center '>
      <div className='flex flex-col gap-5 w-full mx-auto relative h-3/6 lg:h-4/6'>
        <Image alt='403' src='/403.svg' fill />
      </div>
      <div className='flex flex-col gap-5 w-full lg:w-6/12 mx-auto h-3/6 lg:h-2/6'>
        <span className='text-4xl font-bold text-center'> Ooops...</span>
        <div className='flex flex-col gap-1'>
          <span className='text-xl font-semibold text-center'>
            Desculpe, para acessar está pagina, é necessario estar logado.
          </span>
          <span className='text-xl font-semibold text-center'>
            Faça o login ou se registre para acessar.
          </span>
        </div>

        <div className='flex gap-3 justify-center'>
          <button
            className='bg-violet-500 px-2 py-1 w-4/12 lg:w-2/12 rounded-2xl text-slate-100 cursor-pointer flex self-center justify-center'
            onClick={loginModal.onOpen}
          >
            Login
          </button>
          <button
            className='bg-violet-500 px-2 py-1 w-4/12 lg:w-2/12 rounded-2xl text-slate-100 cursor-pointer flex self-center justify-center'
            onClick={registerModal.onOpen}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNotAuth;
