'use client';

import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import * as C from './style';
import { useState } from 'react';
import { error } from 'console';
import useThemes from '@/app/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

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
    <C.Container display={isOpen ? 'flex' : 'none'} theme={themes}>
      <C.Header>
        <GrClose
          size={20}
          onClick={() => loginModal.onClose()}
          style={{ cursor: 'pointer' }}
        />
        <h4>Login</h4>
      </C.Header>

      <C.InputDiv>
        <C.InputWrapper theme={themes}>
          <label htmlFor='Email'>Email</label>
          <input
            type='email'
            id='Email'
            placeholder='Digite o seu email'
            required
            {...register('email', { required: true })}
          />
        </C.InputWrapper>
        <C.InputWrapper theme={themes}>
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
        </C.InputWrapper>
        <C.ButtonDiv>
          <button onClick={handleSubmit(onSubmit)}> Entrar </button>
        </C.ButtonDiv>
      </C.InputDiv>
      <p style={{ textAlign: 'center', margin: '15px 0' }}>Ou entre com: </p>
      <C.Social>
        <C.SocialButton
          background={'#5383EC'}
          onClick={() => {
            signIn('google');
          }}
        >
          <FcGoogle size={28} />
          Google
        </C.SocialButton>
        <C.SocialButton
          background={'gray'}
          onClick={() => {
            signIn('github');
          }}
        >
          <AiFillGithub size={28} />
          Github
        </C.SocialButton>
      </C.Social>
      <C.FooterDiv>
        <p>
          {' '}
          Não possui conta?{' '}
          <span onClick={() => openRegisterModal()}>Se cadastre!</span>
        </p>
      </C.FooterDiv>
    </C.Container>
  );
};
