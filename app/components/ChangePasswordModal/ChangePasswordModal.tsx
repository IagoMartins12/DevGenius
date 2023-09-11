'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledInput } from '../Common/StyledInput';
import { useTheme } from 'next-themes';
import axios from 'axios';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import useChangePasswordModal from '@/app/hooks/modals/useChangePassword';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

export const ChangePasswordModal = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  const changePasswordModal = useChangePasswordModal();
  const loginModal = useLoginModal();

  const isOpen = changePasswordModal.isOpen;
  const { theme } = useTheme();
  const { navigateToHome } = useNavigate();

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.newPassword !== data.confirmNewPassword)
      return toast.error('As senhas não conferem!');

    const object = {
      newPassword: data.newPassword,
      userId: currentUser?.id,
    };

    try {
      await axios.patch('/api/forgetPassword', object);
      toast.success('Dados atualizados!');

      const objectToken = {
        token: Math.random().toString(32),
        email: currentUser?.email,
      };

      await axios.post('/api/forgetPassword', objectToken);
      navigateToHome();
      changePasswordModal.onClose();
      loginModal.onOpen();
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const getUser = async (usermail: string) => {
    const response = await axios.get('/api/forgetPassword', {
      params: {
        email: usermail,
      },
    });

    return response.data;
  };
  const handleOpenLoginModal = () => {
    changePasswordModal.onClose();
    loginModal.onOpen();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(currentUrl);
      const token = urlParams.get('token');
      const usermail = urlParams.get('useremail');
      if (!usermail) return;

      getUser(usermail).then(user => {
        console.log(user);
        if (!user) return;

        if (token === user.token && usermail) {
          setCurrentUser(user);
          changePasswordModal.onOpen();
        }
      });
    }
  }, []);

  return (
    <div
      className={`ForgetModalPosition flex-col z-50 ${
        isOpen ? 'flex' : 'hidden'
      }
${theme === 'light' ? 'modal-white' : 'modal-dark'}
      `}
    >
      <div className='flex items-center justify-between ml-5 mt-2'>
        <IoCloseOutline
          size={30}
          onClick={handleOpenLoginModal}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className='flex flex-col-reverse justify-around items-center  h-[100%]'>
        <div className='flex flex-col w-11/12 mx-auto p-4 h-[50%]'>
          <div className='flex flex-col py-4 gap-y-3'>
            <h1 className='font-bold text-3xl'>Seja bem vindo de volta!</h1>
          </div>

          <div className='flex flex-col gap-y-3 w-11/12'>
            <StyledInput
              type='password'
              id='newPassword'
              required
              placeholder='Nova senha'
              label='Nova senha'
              register={register}
            />
            <StyledInput
              type='password'
              id='confirmNewPassword'
              required
              placeholder='Confirme a nova senha'
              label='Confirme a nova senha'
              register={register}
            />
            <div className='flex flex-col w-full gap-y-4'>
              <button
                className='modalButton bg-violet-400 flex items-center justify-center'
                onClick={handleSubmit(onSubmit)}
              >
                Redefinir
              </button>
            </div>
          </div>
        </div>
        <div className='w-full sm:w-5/12 lg:w-6/12 h-[40%]'>
          <div className='aspect-video w-full h-60 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
            <Image
              fill
              className='sm:object-cover h-1 w-full group-hover:scale-110 transition'
              src='/changePassword.svg'
              alt='changePassword'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
