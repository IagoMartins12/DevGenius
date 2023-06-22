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
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signup } from './signUp';
import { zodResolver } from '@hookform/resolvers/zod';

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const theme = useThemes();
  const themes: any = theme.theme;
  const isOpen: any = registerModal.isOpen;

  const tooglePassword = () => {
    setRevealPassword(!revealPassword);
  };

  const openRegisterModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(signup),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Cadastro feito com sucesso');
        reset();
        loginModal.onOpen();
        registerModal.onClose();
      })
      .catch(error => {
        if (error.response.status === 400)
          return toast.error('Email ja cadastrado');
        if (error.response.status === 401)
          return toast.error('Nome de usuario já existe');

        toast.error('Algo deu errado! Tente novamente');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={`
      ${isOpen ? 'flex' : 'hidden'}
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
    >
      <div className='flex w-1/2 items-center justify-between ml-7 my-4'>
        <GrClose
          size={20}
          onClick={() => registerModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
        <h4>Registro</h4>
      </div>
      <form action=''>
        <div className='flex flex-col justify-center items-center'>
          <div>
            <label htmlFor='username'>Nome de usuario: </label>
            <input
              type='text'
              id='username'
              placeholder='Digite o seu nome de usuario'
              required={true}
              disabled={isLoading}
              {...register('username')}
            />
            {errors.username && (
              <p className='error'>
                O nome deve possuir no minimo 6 caracteres
              </p>
            )}
          </div>
          <div>
            <label htmlFor='Email'>Email</label>
            <input
              type='email'
              id='Email'
              placeholder='Digite o seu email'
              required={true}
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && <p className='error'>Insira um email valido</p>}
          </div>
          <div>
            <label htmlFor='password'>Senha</label>
            <input
              type={revealPassword ? 'text' : 'password'}
              id='Password'
              {...register('password')}
              required={true}
              disabled={isLoading}
              placeholder='Digite a sua senha'
            />
            {revealPassword ? (
              <BsEyeSlashFill
                size={20}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: 'calc(70%)',
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
                  top: 'calc(7vh)',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => tooglePassword()}
              />
            )}
            {errors.password && (
              <p className='error'>
                A senha deve possuir no minimo 6 caracteres
              </p>
            )}
          </div>
          <div className='w-5/6 mt-8 mx-auto'>
            <button
              className='my-0 mx-auto w-40 h-12 flex items-center justify-center cursor-pointer rounded-2xl border border-black'
              onClick={handleSubmit(onSubmit)}
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
      <p style={{ textAlign: 'center', margin: '20px 0' }}>
        Ou se registre com:{' '}
      </p>
      <div className='flex flex-col justify-between items-center'>
        <div
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
          style={{
            backgroundColor: '#5383EC',
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
          Já possui conta?{' '}
          <span
            className='underline	cursor-pointer'
            onClick={() => openRegisterModal()}
          >
            Faça o login!
          </span>
        </p>
      </div>
    </div>
  );
};
