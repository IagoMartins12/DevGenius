'use client';

import useThemes from '@/app/hooks/useTheme';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Category, User } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { NavBarUser } from '../navBarUser/NavBarUser';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  currentUser?: User | null;
  categories?: Category[];
}

export const Header: React.FC<NavbarProps> = ({ currentUser, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [blackHeader, setBlackHeader] = useState(false);

  const theme = useThemes();
  const loginModal = useLoginModal();
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleThemeToggle = () => {
    theme.setTheme(theme.theme === 'light' ? 'dark' : 'light');
  };

  let themes: any = theme.theme;

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <header
      className={`
      ${themes === 'light' ? 'bg-footer-color-white' : 'bg-color-dark'}
        h-20
        items-center
        justify-between
        gap-0
        sm:gap-10
        flex
        fixed
        w-full
        z-10
        px-2
        sm:px-12
      `}
      style={{
        backgroundColor:
          themes === 'dark'
            ? blackHeader
              ? 'rgba(18,18,18, 1)'
              : 'rgb(18, 18, 18)'
            : blackHeader
            ? 'rgb(219, 218, 218, 1)'
            : 'rgb(219, 218, 218, 0.7)',
      }}
    >
      <div className='flex items-center gap-x-10 w-1/2 overflow-hidden'>
        <h1
          onClick={() => {
            router.push('/');
          }}
          className='cursor-pointer'
        >
          <span className='font-bold text-xl'>Dev</span>
          <span className=' text-violet-500	text-xl'>Genius</span>
        </h1>
        <div className='w-1/2 flex gap-10 hidden md:flex pointer cursor-pointer'>
          {categories?.map(category => (
            <p>{category.category_name}</p>
          ))}
        </div>
      </div>

      <div className='flex gap-2 sm:gap-9 items-center cursor-pointer w-1/2 justify-end'>
        <div className='flex items-center justify-center'>
          <div id='wrap'>
            <div className=''>
              <input
                id='search'
                name='search'
                type='text'
                placeholder='Pesquisar ?'
                className='specific-input'
              />
              <input id='search_submit' value='Rechercher' type='submit' />
              <AiOutlineSearch size={28} />
            </div>
          </div>
        </div>
        {currentUser ? (
          <>
            <AiOutlineUser size={28} onClick={() => toggleOpen()} />
            <NavBarUser user={currentUser} display={isOpen} />
          </>
        ) : (
          <AiOutlineUser size={28} onClick={() => loginModal.onOpen()} />
        )}
        {theme.theme === 'light' ? (
          <MdDarkMode size={28} onClick={handleThemeToggle} />
        ) : (
          <MdLightMode size={28} onClick={handleThemeToggle} />
        )}
      </div>
    </header>
  );
};
