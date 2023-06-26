import { FieldValues, UseFormRegister } from 'react-hook-form';
import { MdPassword } from 'react-icons/md';
import { SettingsInput } from '../commum/SettingsInput';
import { User } from '@prisma/client';

interface SettingsData {
  themes?: any;
  register: UseFormRegister<FieldValues>;
  user: User;
  onSubmit: () => void;
}

export const PasswordData: React.FC<SettingsData> = ({
  themes,
  register,
  user,
  onSubmit,
}) => {
  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='flex flex-col gap-y-2 w-full'>
            <SettingsInput
              id='password'
              name='Senha atual:'
              register={register}
              placeholder='Senha atual'
              type='password'
              key='password'
              icon={<MdPassword className='absolute top-3 left-3' size={18} />}
            />
          </div>
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* new password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <SettingsInput
            id='newPassword'
            name='Nova senha:'
            register={register}
            placeholder='Nova senha'
            type='newPassword'
            key='newPassword'
            icon={<MdPassword className='absolute top-3 left-3' size={18} />}
          />
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* confirm new password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <SettingsInput
            id='confirmNewPassword'
            name='Confirme a nova senha:'
            register={register}
            placeholder='Confirme a nova senha'
            type='confirmNewPassword'
            key='confirmNewPassword'
            icon={<MdPassword className='absolute top-3 left-3' size={18} />}
          />
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mx-6 my-6 justify-center items-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'
          onClick={onSubmit}
        >
          Editar informações
        </button>
      </div>
    </>
  );
};
