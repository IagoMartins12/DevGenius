'use client';

import useThemes from '@/app/hooks/useTheme';
import * as C from './Style';
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
    <C.Header theme={themes}>
      DevBlog
      <C.CategoryDiv>
        <p>React</p>
        <p>Nextjs</p>
        <p>Node</p>
      </C.CategoryDiv>
      <C.IconsDiv>
        <C.SearchDiv theme={themes} display={isSearchOpen}>
          <input type='text' />
          <AiOutlineSearch size={28} onClick={() => toggleSearchOpen()} />
        </C.SearchDiv>
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
      </C.IconsDiv>
    </C.Header>
  );
};
