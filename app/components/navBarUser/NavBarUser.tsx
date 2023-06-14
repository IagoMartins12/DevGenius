import React from 'react';
import { signOut } from 'next-auth/react';
import useThemes from '@/app/hooks/useTheme';

export const NavBarUser = ({ display }: { display: boolean }) => {
  const menus = [
    {
      name: 'Perfil',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Configuração',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Sair',
      action: () => {
        signOut();
      },
    },
  ];
  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <div
      className={`
      ${display ? 'flex' : 'hidden'}
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      absolute 
      z-999 
      w-52
      right-0 
      top-20
      flex-col 
      border-radius-16 
      hover: ${themes === 'light' ? 'bg-neutral-100' : 'bg-stone-900'}      
      `}
    >
      {menus.map((menu: any, index) => {
        return (
          <div
            key={index}
            onClick={menu.action}
            className={`w-full flex flex-col ${
              themes === 'light' ? 'bg-color-white' : 'bg-color-dark'
            }`}
          >
            <p className='m-0 px-5 py-2'>{menu.name}</p>
          </div>
        );
      })}
    </div>
  );
};
