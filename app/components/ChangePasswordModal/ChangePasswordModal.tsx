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

export const ChangePasswordModal = () => {
  const changePasswordModal = useChangePasswordModal();
  const loginModal = useLoginModal();
  const isOpen = changePasswordModal.isOpen;
  const { theme } = useTheme();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.newPassword !== data.confirmNewPassword)
      return toast.error('As senhas não conferem!');

    const object = {
      newPassword: data.newPassword,
    };

    // try {
    //   await axios.put('/api/password', object);
    //   toast.success('Dados atualizados!');
    // } catch (err) {
    //   toast.error('Algo deu errado, tente novamente :(');
    //   console.log(err);
    // }
  };

  const handleOpenLoginModal = () => {
    changePasswordModal.onClose();
    loginModal.onOpen();
  };

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

      <div className='flex flex-col-reverse justify-around items-center'>
        <div className='flex flex-col w-11/12 mx-auto  p-4'>
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
        <div className='w-full sm:w-5/12 lg:w-6/12'>
          <div className='aspect-video w-full h-48 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
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
