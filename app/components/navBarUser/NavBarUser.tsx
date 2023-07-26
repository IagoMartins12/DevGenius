import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface navBarProps {
  display?: boolean;
  user: User;
}

interface Menu {
  name: string;
  action: () => void;
}

export const NavBarUser: React.FC<navBarProps> = ({ display, user }) => {
  let menus: Menu[];
  const router = useRouter();
  const { theme } = useTheme();
  if (user.role === 1) {
    menus = [
      {
        name: 'Perfil',
        action: () => {
          router.push('/account');
        },
      },
      {
        name: 'Configuração',
        action: () => {
          router.push('/settings');
        },
      },
      {
        name: 'Criar post',
        action: () => {
          router.push('/post/create');
        },
      },
      {
        name: 'Painel',
        action: () => {
          router.push('/panel');
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
          router.push('/account');
        },
      },
      {
        name: 'Configuração',
        action: () => {
          router.push('/settings');
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
      z-999 
      w-52
      right-0 
      top-20
      flex-col 
      border-radius-16 
      hover: ${theme === 'light' ? 'bg-neutral-100' : 'bg-stone-900'}      
      `}
    >
      {menus.map((menu: Menu, index: number) => {
        return (
          <div
            key={index}
            onClick={menu?.action}
            className={`w-full flex flex-col ${
              theme === 'light' ? 'bg-color-white' : 'bg-color-dark'
            }`}
          >
            <p className='m-0 px-5 py-2'>{menu?.name}</p>
          </div>
        );
      })}
    </div>
  );
};
