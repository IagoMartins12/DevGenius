import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import {} from 'next-themes';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import { Dispatch, SetStateAction } from 'react';

interface navBarProps {
  display?: boolean;
  user: User;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}

interface Menu {
  name: string;
  action: () => void;
}

export const NavBarUser: React.FC<navBarProps> = ({
  display,
  user,
  setDisplay,
}) => {
  let menus: Menu[];
  const { navigateToUrl } = useNavigate();
  if (user.role === 1) {
    menus = [
      {
        name: 'Perfil',
        action: () => {
          navigateToUrl('account');
        },
      },
      {
        name: 'Configuração',
        action: () => {
          navigateToUrl('settings');
        },
      },
      {
        name: 'Criar post',
        action: () => {
          navigateToUrl('post', 'create');
        },
      },
      {
        name: 'Painel',
        action: () => {
          navigateToUrl('panel');
        },
      },
      {
        name: 'Sair',
        action: () => {
          signOut();
        },
      },
    ];
  } else {
    menus = [
      {
        name: 'Perfil',
        action: () => {
          navigateToUrl('account');
        },
      },
      {
        name: 'Configuração',
        action: () => {
          navigateToUrl('settings');
        },
      },

      {
        name: 'Sair',
        action: () => {
          signOut();
        },
      },
    ];
  }

  return (
    <div
      className={`
      ${display ? 'flex' : 'hidden'}
      absolute 
      z-20 
      w-52
      right-0 
      top-16
      flex-col 
      bg-color
      border-radius-16 `}
    >
      {menus.map((menu: Menu, index: number) => {
        return (
          <div
            key={index}
            onClick={() => {
              menu?.action();
              setDisplay(false);
            }}
            className='w-full flex flex-col '
          >
            <p className='m-0 px-5 py-2 font-semibold'>{menu?.name}</p>
          </div>
        );
      })}
    </div>
  );
};
