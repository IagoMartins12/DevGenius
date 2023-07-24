'use client';

import Image from 'next/image';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import { AccountData } from '../SettingsPage/accountData';
import { PersonalData } from '../SettingsPage/personalData';
import { PasswordData } from '../SettingsPage/passwordData';
import { SocialNetworkData } from '../SettingsPage/socialNetworkData';
import { AddressData } from '../SettingsPage/addressData';
import { useSettingsForm } from '@/app/hooks/customHooks/useSettingsForm';
import { useGlobalContext } from '@/app/context/store';

export const SettingsForm: React.FC = () => {
  const themes: Themes = useThemes().theme;
  const { currentUserState } = useGlobalContext();

  const { isActive, setIsActive } = useSettingsForm();

  return (
    <div
      className={`flex gap-y-8 lg:gap-x-8 px-1 min-h-screen  pt-0 sm:pt-8 ${
        themes === 'light' ? 'bg-color-white' : 'bg-color-dark'
      }`}
    >
      <div className='w-4/12 hidden lg:flex'>
        <div className='aspect-video w-full h-48 sm:h-2/3 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
          {isActive === 0 && (
            <Image
              fill
              className='sm:object-cover h-1 imageSettings group-hover:scale-110 transition'
              src='teste1.svg'
              alt='Listing'
            />
          )}
          {isActive === 1 && (
            <Image
              fill
              className='sm:object-cover h-1 imageSettings group-hover:scale-110 transition'
              src='developer.svg'
              alt='Listing'
            />
          )}
          {isActive === 2 && (
            <Image
              fill
              className='sm:object-cover h-1 imageSettings group-hover:scale-110 transition'
              src='house1.svg'
              alt='Listing'
            />
          )}
          {isActive === 3 && (
            <Image
              fill
              className='sm:object-cover h-1 imageSettings group-hover:scale-110 transition'
              src='firmware.svg'
              alt='Listing'
            />
          )}
          {isActive === 4 && (
            <Image
              fill
              className='sm:object-cover h-1 imageSettings group-hover:scale-110 transition'
              src='social3.svg'
              alt='Listing'
            />
          )}
        </div>
      </div>
      <div className='flex flex-col w-full sh:w-8/12 gap-y-4'>
        <div
          className={`flex flex-col w-full lg:w-full justify-start   ${
            themes === 'light' ? 'comment-white' : 'comment-dark'
          } shadow-sm`}
        >
          <div className='w-full flex items-center justify-center flex-col my-3'>
            <div className='rounded-full items-center justify-center w-32 mt-4 flex flex-col py-3 gap-3'>
              <img
                src={currentUserState?.image ? currentUserState.image : ''}
                className='rounded-full'
                alt=''
              />
              <span className='font-bold text-2xl'>
                {currentUserState?.username}
              </span>
            </div>
          </div>
          <div className='w-full flex items-center justify-center  h-11'>
            <div
              className={`w-full flex items-center justify-center h-full font-bold text-xl text-center cursor-pointer
            ${isActive === 0 ? 'active' : ''}`}
              onClick={() => setIsActive(0)}
            >
              <span className='text-sm sm:text-lg'>Conta</span>
            </div>
            <div
              className={`w-full flex items-center justify-center h-full font-bold text-xl text-center cursor-pointer
            ${isActive === 1 ? 'active' : ''}`}
              onClick={() => setIsActive(1)}
            >
              <span className='text-sm sm:text-lg'>Pessoal</span>
            </div>
            <div
              className={`w-full flex items-center justify-center h-full font-bold text-xl text-center cursor-pointer
            ${isActive === 2 ? 'active' : ''}`}
              onClick={() => setIsActive(2)}
            >
              <span className='text-sm sm:text-lg'>Endereço</span>
            </div>
            <div
              className={`w-full flex items-center justify-center h-full font-bold text-xl text-center cursor-pointer
            ${isActive === 3 ? 'active' : ''}`}
              onClick={() => setIsActive(3)}
            >
              <span className='text-sm sm:text-lg'>Senha</span>
            </div>

            <div
              className={`w-full flex items-center justify-center h-full font-bold text-xl text-center cursor-pointer -sm
            ${isActive === 4 ? 'active' : ''}`}
              onClick={() => setIsActive(4)}
            >
              <span className='text-sm sm:text-lg'>Network</span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col w-full lg:w-full self-start shadow-sm ${
            themes === 'light' ? 'comment-white' : 'comment-dark'
          }`}
        >
          {isActive === 0 && <AccountData user={currentUserState} />}
          {isActive === 1 && <PersonalData user={currentUserState} />}
          {isActive === 2 && <AddressData user={currentUserState} />}
          {isActive === 3 && <PasswordData />}
          {isActive === 4 && <SocialNetworkData user={currentUserState} />}
        </div>
      </div>
    </div>
  );
};
