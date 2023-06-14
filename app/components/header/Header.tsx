'use client';

import useThemes from '@/app/hooks/useTheme';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { useCallback, useState } from 'react';
import { NavBarUser } from '../navBarUser/NavBarUser';

interface NavbarProps {
  currentUser?: User | null;
}

export const Header: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <header
      className={`${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      h-20
      items-center
      justify-around
      gap-10
      flex
      `}
    >
      DevBlog
      <div className='w-1/2 flex gap-10 hidden md:flex pointer cursor-pointer'>
        <p>React</p>
        <p>Nextjs</p>
        <p>Node</p>
      </div>
      <div className='flex gap-9 items-center cursor-pointer'>
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
            <NavBarUser display={isOpen} />
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
