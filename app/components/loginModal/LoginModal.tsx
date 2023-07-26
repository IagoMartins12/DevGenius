'use client';

import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/modals/useRegisterModal';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { useState } from 'react';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledInput } from '../commum/StyledInput';

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const themes: Themes = useThemes().theme;
  const isOpen: boolean = loginModal.isOpen;

  const openRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      if (callback?.ok) {
        toast.success('Login feito com sucesso');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error('Login inválido');
      }
    });
  };

  return (
    <div
      className={`modalPosition flex-col border-2 z-10
      ${isOpen ? 'flex' : 'hidden'}
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => loginModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col-reverse sm:flex-row justify-around'>
        <div className='flex flex-col w-full sm:w-7/12 lg:w-5/12 p-4'>
          <div>
            <span className='font-bold text-2xl'>Dev</span>
            <span className=' text-violet-500	text-2xl'>Genius</span>
          </div>
          <div className='flex flex-col py-4'>
            <h1 className='font-bold text-xl'>Bem vindo de volta</h1>
            <p className='font-medium text-xl'>
              Não é inscrito? {''}
              <span
                className='text-violet-500 text-xl cursor-pointer underline'
                onClick={() => {
                  openRegisterModal();
                }}
              >
                Crie sua conta
              </span>
            </p>
          </div>

          <div className='flex flex-col gap-y-3 w-11/12'>
            <StyledInput
              id='email'
              required
              placeholder='Email'
              label='Email'
              register={register}
            />
            <StyledInput
              type='password'
              id='password'
              required
              placeholder='Senha'
              label='Senha'
              register={register}
            />
            <div className='flex justify-end'>
              <span className='text-violet-500 text-base cursor-pointer underline'>
                Esqueci minha senha
              </span>
            </div>
            <div className='flex flex-col w-full gap-y-4'>
              <button
                className='modalButton bg-violet-400 flex items-center justify-center'
                onClick={handleSubmit(onSubmit)}
              >
                Entrar
              </button>
              <div className='flex items-center justify-center'>
                <hr className='w-3/12 mr-2' />
                <span className='text-center'>Ou entre com: </span>
                <hr className='w-3/12 ml-2' />
              </div>
              {/* google button */}
              <button
                className='button actionButton'
                onClick={() => {
                  signIn('google');
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='xMidYMid'
                  viewBox='0 0 256 262'
                >
                  <path
                    fill='#4285F4'
                    d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
                  ></path>
                  <path
                    fill='#34A853'
                    d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
                  ></path>
                  <path
                    fill='#FBBC05'
                    d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
                  ></path>
                  <path
                    fill='#EB4335'
                    d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
                  ></path>
                </svg>
                Continuar com Google
              </button>
              {/* github button */}
              <button
                className='button2 actionButton'
                onClick={() => {
                  signIn('github');
                }}
              >
                <svg
                  fill='#ffffff'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <g strokeWidth='0' id='SVGRepo_bgCarrier'></g>
                  <g
                    strokeLinejoin='round'
                    strokeLinecap='round'
                    id='SVGRepo_tracerCarrier'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <title>github</title>{' '}
                    <rect fill='none' height='24' width='24'></rect>{' '}
                    <path d='M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z'></path>{' '}
                  </g>
                </svg>
                Continuar com Github
              </button>
            </div>
          </div>
        </div>
        <div className='w-full sm:w-5/12 lg:w-4/12'>
          <div className='aspect-video w-full h-48 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
            <Image
              fill
              className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
              src='/login.svg'
              alt='login'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
