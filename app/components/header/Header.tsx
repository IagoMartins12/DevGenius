'use client';

import useThemes from '@/app/hooks/useTheme';
import * as C from './Style';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export const Header = () => {
  const theme = useThemes();

  const handleThemeToggle = () => {
    theme.setTheme(theme.theme === 'light' ? 'dark' : 'light');
  };

  return (
    <C.Header>
      DevBlog
      <C.categoryDiv className={theme.theme}>
        <p>React</p>
        <p>Nextjs</p>
        <p>Node</p>
      </C.categoryDiv>
      <C.iconsDiv>
        <AiOutlineSearch size={28} />
        <AiOutlineUser size={28} />
        {theme.theme === 'light' ? (
          <MdDarkMode size={28} onClick={handleThemeToggle} />
        ) : (
          <MdLightMode size={28} onClick={handleThemeToggle} />
        )}
      </C.iconsDiv>
    </C.Header>
  );
};
