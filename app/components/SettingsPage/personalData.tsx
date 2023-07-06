import { BsGenderAmbiguous } from 'react-icons/bs';
import { SettingsInput } from '../commum/SettingsInput';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { User } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { Themes } from '@/app/hooks/useTheme';
import { GrEdit, GrCalendar } from 'react-icons/gr';

interface SettingsData {
  themes?: Themes;
  register: UseFormRegister<FieldValues>;
  user: User | null;
  onSubmit: () => void;
}

export const PersonalData: React.FC<SettingsData> = ({
  themes,
  register,
  user,
  onSubmit,
}) => {
  const initialState = {
    firstName: user?.firstName ?? '',
    secondName: user?.secondName ?? '',
    birthday: user?.birthday ?? '',
    gender: user?.gender ?? '',
  };

  const [fields, setFields] = useState(initialState);

  const handleFieldsChange = (
    ev:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) =>
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });

  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* Name */}
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
            <SettingsInput
              id='firstName'
              name='Primeiro nome:'
              register={register}
              placeholder='Primeiro nome'
              type='firstName'
              key='firstName'
              icon={<GrEdit className='absolute top-3 left-3' size={18} />}
              value={fields.firstName}
              onChange={handleFieldsChange}
            />
          </div>
          <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
            <SettingsInput
              id='secondName'
              name='Segundo nome:'
              register={register}
              placeholder='Segundo nome'
              type='secondName'
              key='secondName'
              icon={<GrEdit className='absolute top-3 left-3' size={18} />}
              value={fields.secondName}
              onChange={handleFieldsChange}
            />
          </div>
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
            <h3 className=' font-bold  text-1xl sm:text-2xl text-violet-500 '>
              Data de nascimento:
            </h3>
            <div className='relative'>
              <input
                type='date'
                className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
                {...register('birthday')}
                value={fields.birthday}
                onChange={handleFieldsChange}
              />
              <GrCalendar className='absolute top-3 left-3' size={18} />
            </div>
          </div>
          <div className='flex flex-col gap-y-2 w-full sm:w-6/12'>
            <h3 className=' font-bold  text-1xl sm:text-2xl text-violet-500 '>
              Sexo:
            </h3>
            <div className='relative inline-flex'>
              <select
                className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10 bg-white`}
                {...register('gender')}
                value={fields.gender}
                onChange={handleFieldsChange}
              >
                <option> Escolha o sexo </option>
                <option>Masculino</option>
                <option>Feminio</option>
                <option>Prefiro não dizer</option>
              </select>
              <BsGenderAmbiguous className='absolute top-3 left-3' size={18} />
            </div>
          </div>
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
