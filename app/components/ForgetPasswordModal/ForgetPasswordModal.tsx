'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledInput } from '../Common/StyledInput';
import { useTheme } from 'next-themes';
import useForgetPasswordModal from '@/app/hooks/modals/useForgetPassword';
import axios from 'axios';
import { useState } from 'react';
import useLoginModal from '@/app/hooks/modals/useLoginModal';

enum STEPS {
  RECEIVE_EMAIL = 0,
  SENDED_EMAIL = 1,
}
export const ForgetPasswordModal = () => {
  const [step, setStep] = useState(STEPS.RECEIVE_EMAIL);

  const forgetPasswordModal = useForgetPasswordModal();
  const loginModal = useLoginModal();
  const isOpen = forgetPasswordModal.isOpen;
  const { theme } = useTheme();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const response = await axios.get('/api/forgetPassword', {
        params: {
          email: data.email,
        },
      });

      if (!response.data) {
        toast.error('Email não encontrado!');
        return;
      }

      const myToken = Math.random().toString(32);

      const object = {
        to: data.email as string,
        subject: 'DevGenius teste',
        text: `
            Olá ${response.data.username}, este é um email de redefinição de senha. 
            Clique no link abaixo para redefinir sua senha: 
            <a href="http://localhost:3000/?&token=${myToken}&useremail=${response.data.email}">www.Devgenius-blog.vercel.app</a>
          `,
      };

      const objectToken = {
        token: myToken,
        email: response.data.email,
      };

      await axios.post('/api/forgetPassword', objectToken);

      const sendEmailResponse = await axios.post('/api/sendEmail', object);

      if (sendEmailResponse.status === 200) {
        reset();
        setStep(STEPS.SENDED_EMAIL);
      } else {
        toast.error('Erro ao enviar o email!');
      }
    } catch (error) {
      toast.error('Erro ao buscar o email');
    }
  };

  const handleOpenLoginModal = () => {
    console.log('clucou');
    setStep(STEPS.RECEIVE_EMAIL);
    forgetPasswordModal.onClose();
    loginModal.onOpen();
  };

  let bodyContent = (
    <div className='flex flex-col w-11/12 mx-auto p-4  h-[50%] sm:h-auto'>
      <div className='flex flex-col py-4 gap-y-3'>
        <h1 className='font-bold text-3xl'>Esqueceu sua senha?</h1>
        <p className='font-semibold text-xl'>
          Não se preocupe, iremos enviar um email para você redefinir sua senha!
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

        <div className='flex flex-col w-full gap-y-4'>
          <button
            className='modalButton bg-violet-400 flex items-center justify-center'
            onClick={handleSubmit(onSubmit)}
          >
            Enviar email
          </button>
          <button
            className='modalButton bg-inherit flex items-center justify-center'
            onClick={handleOpenLoginModal}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.SENDED_EMAIL) {
    bodyContent = (
      <div className='flex flex-col w-11/12 mx-auto p-4 h-[50%] sm:h-auto'>
        <div className='flex flex-col py-4 gap-y-3'>
          <h1 className='font-bold text-3xl'>Email enviado! </h1>
          <p className='font-semibold text-xl'>
            Não se esqueça de verificar na sua caixa de span :)
          </p>
        </div>

        <div className='flex flex-col w-full gap-y-4'>
          <button
            className='modalButton bg-inherit flex items-center justify-center'
            onClick={handleOpenLoginModal}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`ForgetModalPosition justify-evenly flex-col z-50 ${
        isOpen ? 'flex' : 'hidden'
      }
${theme === 'light' ? 'modal-white' : 'modal-dark'}
      `}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={() => {
            forgetPasswordModal.onClose();
            setStep(STEPS.RECEIVE_EMAIL);
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col-reverse justify-center items-center h-[100%]'>
        {bodyContent}
        <div className='w-full sm:w-5/12 lg:w-6/12  h-[30%] sm:h-auto'>
          <div className='aspect-video w-full h-60 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
            <Image
              fill
              className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
              src='/forgetPassword.svg'
              alt='forgetPassword'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
