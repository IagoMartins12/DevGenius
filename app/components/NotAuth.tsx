'use client';

import Image from 'next/image';
import { useNavigate } from '../hooks/customHooks/useNavigate';

const NotAuth: React.FC = () => {
  const { navigateToHome } = useNavigate();
  return (
    <div className='h-[90vh] flex flex-col gap-2 items-center '>
      <div className='flex flex-col gap-5 w-full mx-auto relative h-3/6 lg:h-4/6'>
        <Image alt='403' src='/403.svg' fill />
      </div>
      <div className='flex flex-col gap-5 w-full lg:w-6/12 mx-auto h-3/6 lg:h-2/6'>
        <span className='text-4xl font-bold text-center'> Ooops...</span>
        <div className='flex flex-col gap-1'>
          <span className='text-xl font-semibold text-center'>
            Desculpe, a pagina que você está tentando acessar tem acesso
            restrito
          </span>
          <span className='text-xl font-semibold text-center'>
            Clique no botão abaixo para voltar para a pagina principal
          </span>
        </div>

        <button
          className='bg-violet-500 px-2 py-1 w-4/12 lg:w-2/12 rounded-2xl text-slate-100 cursor-pointer flex self-center justify-center'
          onClick={navigateToHome}
        >
          Retornar
        </button>
      </div>
    </div>
  );
};

export default NotAuth;
