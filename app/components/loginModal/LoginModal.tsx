'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useState } from 'react';
import useThemes from '@/app/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { useRouter as useParams } from 'next/router';
import { toast } from 'react-hot-toast';
import styles from './style.module.scss';

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const theme = useThemes();
  const themes: any = theme.theme;
  const isOpen: any = loginModal.isOpen;

  const tooglePassword = () => {
    setRevealPassword(!revealPassword);
  };

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
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false);

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
      className={`
      ${styles.container}
      ${isOpen ? 'flex' : 'hidden'}
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
    >
      <div className='flex w-1/2 items-center justify-between ml-7 my-4'>
        <GrClose
          size={20}
          onClick={() => loginModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
        <h4>Login</h4>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className={`${styles.InputWrapper}`}>
          <label htmlFor='Email'>Email</label>
          <input
            type='email'
            id='Email'
            placeholder='Digite o seu email'
            required
            {...register('email', { required: true })}
          />
        </div>
        <div className={`${styles.InputWrapper}`}>
          <label htmlFor='Email'>Senha</label>
          <input
            type={revealPassword ? 'text' : 'password'}
            id='Password'
            placeholder='Digite a sua senha'
            {...register('password', { required: true })}
          />
          {revealPassword ? (
            <BsEyeSlashFill
              size={20}
              style={{
                position: 'absolute',
                right: '10px',
                top: 'calc(5vh)',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => tooglePassword()}
            />
          ) : (
            <BsEyeFill
              size={20}
              style={{
                position: 'absolute',
                right: '10px',
                top: 'calc(5vh)',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => tooglePassword()}
            />
          )}
        </div>
        <div className='w-5/6 mt-8 mx-auto'>
          <button
            className='my-0 mx-auto w-40 h-12 flex items-center justify-center cursor-pointer rounded-2xl border border-black'
            onClick={handleSubmit(onSubmit)}
          >
            Entrar
          </button>
        </div>
      </div>
      <p style={{ textAlign: 'center', margin: '15px 0' }}>Ou entre com: </p>
      <div className='flex flex-col justify-between items-center'>
        <div
          className={`${styles.SocialBtn}`}
          style={{
            backgroundColor: '#5383EC',
          }}
          onClick={() => {
            signIn('google');
          }}
        >
          <FcGoogle size={28} />
          Google
        </div>
        <div
          className={`${styles.SocialBtn}`}
          style={{
            backgroundColor: 'gray',
          }}
          onClick={() => {
            signIn('github');
          }}
        >
          <AiFillGithub size={28} />
          Github
        </div>
      </div>
      <div className='my-4 mx-0 '>
        <p className='text-center'>
          Não possui conta?{' '}
          <span
            className='underline	cursor-pointer'
            onClick={() => openRegisterModal()}
          >
            Se cadastre!
          </span>
        </p>
      </div>
    </div>
  );
};
