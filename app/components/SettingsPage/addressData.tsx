import { User } from '@prisma/client';
import { useState } from 'react';
import { SelectState } from '../selects/SelectState';
import { SelectCity } from '../selects/SelectCity';
import useUserInfo from '@/app/hooks/useUserInfo';
import { Themes } from '@/app/hooks/useTheme';

interface SettingsData {
  themes?: Themes;
  user: User | null;
  onSubmit: (uf: string, city: string) => void;
}

export const AddressData: React.FC<SettingsData> = ({
  themes,
  user,
  onSubmit,
}) => {
  const [selectedUf, setSelectedUf] = useState(user?.uf ? user.uf : '');
  const [selectedCity, setSelectedCity] = useState(user?.city ? user.city : '');

  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className='font-bold text-1xl sm:text-2xl text-violet-500'>
            Estado:
          </h3>
          <SelectState onChange={setSelectedUf} user={user} />
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        <h3 className='font-bold text-1xl sm:text-2xl text-violet-500'>
          Cidade:
        </h3>
        <div className='flex flex-col gap-y-2 w-full'>
          <SelectCity uf={selectedUf} onChange={setSelectedCity} user={user} />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 mx-6 my-6 justify-center items-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'
          onClick={async () => {
            onSubmit(selectedUf, selectedCity);
          }}
        >
          Editar informações
        </button>
      </div>
    </>
  );
};
