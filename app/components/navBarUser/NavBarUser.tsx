import React from 'react';
import * as C from './style';
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

  console.log('themes', themes);

  return (
    <C.Container display={display ? true : false} theme={themes}>
      {menus.map((menu: any, index) => {
        return (
          <C.MenuOption key={index} onClick={menu.action} theme={themes}>
            <p>{menu.name}</p>
          </C.MenuOption>
        );
      })}
    </C.Container>
  );
};
