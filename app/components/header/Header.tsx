'use client';

import useThemes from '@/app/hooks/useTheme';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { NavBarUser } from '../navBarUser/NavBarUser';

interface NavbarProps {
  currentUser?: User | null;
}

export const Header: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [blackHeader, setBlackHeader] = useState(false);

  const theme = useThemes();
  const loginModal = useLoginModal();

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
        justify-around
        gap-0
        sm:gap-10
        flex
        sticky
        w-full
        z-10
      `}
      style={{
        backgroundColor:
          themes === 'dark'
            ? blackHeader
              ? 'rgba(18,18,18, 1)'
              : 'rgba(18,18,18, 0.7)'
            : blackHeader
            ? 'rgb(219, 218, 218, 1)'
            : 'rgb(219, 218, 218, 0.7)',
      }}
    >
      DevBlog
      <div className='w-1/2 flex gap-10 hidden md:flex pointer cursor-pointer'>
        <p>React</p>
        <p>Nextjs</p>
        <p>Node</p>
      </div>
      <div className='flex gap-2 sm:gap-9 items-center cursor-pointer'>
        <div className='flex items-center justify-center'>
          <input
            type='text'
            className={`
              ${isSearchOpen ? 'cursor-text' : 'cursor-auto'}
              ${isSearchOpen ? 'opacity-100' : 'opacity-0'}
              transition-opacity duration-500 ease-in-out
              bg-transparent
               ${
                 isSearchOpen && themes === 'light'
                   ? 'border-none'
                   : 'input-dark'
               }
              ${
                isSearchOpen && themes === 'dark'
                  ? 'border-none'
                  : 'input-white'
              }
              outline-none
            `}
          />
          <AiOutlineSearch size={28} onClick={() => toggleSearchOpen()} />
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
