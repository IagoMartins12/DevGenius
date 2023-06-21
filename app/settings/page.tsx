'use client';

import { useState } from 'react';
import useThemes from '../hooks/useTheme';
import { AccountData } from './accountData';
import { PersonalData } from './personalData';
import { PasswordData } from './passwordData';

export default async function Settings() {
  const [isActive, setIsActive] = useState(0);

  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-8 mx-6 min-h-screen'>
      <div className='flex flex-col w-full lg:w-4/12 justify-center '>
        <div className='w-full flex items-center justify-center flex-col border-1'>
          <div className='rounded-full items-center justify-center w-32 h-32 border-2 mt-4'></div>
          <div className='flex items-center justify-center my-3 '>
            <span className='font-bold text-xl'>Iago martins</span>
          </div>
        </div>
        <div className='w-full flex items-center justify-center flex-col border-2'>
          <div
            className={`w-full py-2 mx-auto font-bold text-xl text-center border-b-2 cursor-pointer
            ${isActive === 0 ? 'active' : ''}`}
            onClick={() => setIsActive(0)}
          >
            Dados
          </div>
          <div
            className={`w-full py-2 mx-auto font-bold text-xl text-center border-b-2 cursor-pointer
            ${isActive === 1 ? 'active' : ''}`}
            onClick={() => setIsActive(1)}
          >
            Dados
          </div>
          <div
            className={`w-full py-2 mx-auto font-bold text-xl text-center border-b-2 cursor-pointer
            ${isActive === 2 ? 'active' : ''}`}
            onClick={() => setIsActive(2)}
          >
            Dados
          </div>
          <div
            className={`w-full py-2 mx-auto font-bold text-xl text-center cursor-pointer
            ${isActive === 3 ? 'active' : ''}`}
            onClick={() => setIsActive(3)}
          >
            Dados
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full lg:w-8/12 border-2 pb-4 self-center'>
        {isActive === 0 && <AccountData />}
        {isActive === 1 && <PersonalData />}
        {isActive === 2 && <PasswordData />}
      </div>
    </div>
  );
}
