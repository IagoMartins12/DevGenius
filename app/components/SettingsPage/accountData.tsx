import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { GrDocumentUser } from 'react-icons/gr';
import { SettingsInput } from '../commum/SettingsInput';
import { User } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { Themes } from '@/app/hooks/useTheme';

interface SettingsData {
  themes?: Themes;
  register: UseFormRegister<FieldValues>;
  user: User | null;
  onSubmit: () => void;
}

export const AccountData: React.FC<SettingsData> = ({
  themes,
  register,
  user,
  onSubmit,
}) => {
  const initialState = {
    username: user?.username ?? '',
    bio: user?.bio ?? '',
    email: user?.email ?? '',
  };

  const [fields, setFields] = useState(initialState);

  const handleFieldsChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) =>
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-4 mx-6 mt-3'>
        {/* Name */}
        <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
          <SettingsInput
            id='username'
            name='Nome de usuário'
            register={register}
            placeholder='Nome de usuário'
            type='username'
            key='username'
            icon={<AiOutlineEdit className='absolute top-3 left-3' size={18} />}
            value={fields.username}
            onChange={handleFieldsChange}
          />
        </div>
        {/* Email */}
        <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
          <SettingsInput
            id='email'
            name='E-mail'
            register={register}
            placeholder='E-mail'
            type='email'
            key='email'
            icon={<AiOutlineMail className='absolute top-3 left-3' size={18} />}
            value={fields.email}
            onChange={handleFieldsChange}
          />
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mx-6 mt-3'>
        <h3 className='font-bold text-1xl sm:text-2xl text-violet-500'>Bio:</h3>
        <div className='relative'>
          <textarea
            value={fields.bio}
            id='bio'
            cols={10}
            rows={6}
            className={`border-2 py-2 resize-none hover:border-slate-900 rounded-xl w-full pl-10`}
            placeholder='Biografia'
            {...register('bio')}
            onChange={handleFieldsChange}
          />
          <GrDocumentUser className='absolute top-16 left-3' size={18} />
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
