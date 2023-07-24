'use client';

import useThemes from '@/app/hooks/useTheme';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { Category } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { NavBarUser } from '../navBarUser/NavBarUser';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/context/store';

interface NavbarProps {}

export const Header: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [blackHeader, setBlackHeader] = useState(false);

  const { currentUserState, categoriesState } = useGlobalContext();
  const theme = useThemes();
  const themes = theme.theme;
  const loginModal = useLoginModal();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeToggle = () => {
    theme.setTheme(theme.theme === 'light' ? 'dark' : 'light');
  };

  const navigate = (category: Category) => {
    router.push(`/category/${category.id}`);
  };

  const navigateToSearch = (search: string) => {
    router.push(`/search/${search}`);
  };

  const handleFocus = () => {
    setSearchFocus(true);
  };

  const handleBlur = () => {
    setSearchFocus(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchFocus) {
      const searchValue = event.currentTarget.value;
      navigateToSearch(searchValue);
    }
  };

  const handleOnClick = (value: string | undefined) => {
    if (!value) return;
    navigateToSearch(value);
  };

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const wrapDiv = document.getElementById('wrap');
      if (wrapDiv && !wrapDiv.contains(event.target as Node)) {
        setSearchFocus(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  console.log(searchFocus);
  return (
    <header
      className={`
      ${themes === 'light' ? 'bg-footer-color-white' : 'bg-color-dark'}
        items-center
        justify-between
        gap-0
        sm:gap-10
        flex
        sticky
        top-0
        w-full
        z-10
        md:px-12
        px-6
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
        height: '9vh',
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
        <div className='w-1/2 gap-10 hidden md:flex pointer cursor-pointer'>
          {categoriesState?.map(category => (
            <p key={category.id} onClick={() => navigate(category)}>
              {category.category_name}
            </p>
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
                placeholder='Pesquisar?'
                autoComplete='off'
                className='specific-input'
                onFocus={handleFocus}
                onKeyDown={handleKeyDown} // Adicionando o evento onKeyDown para capturar o Enter
                ref={inputRef}
              />
              <input id='search_submit' value='Rechercher' type='submit' />
              <AiOutlineSearch
                size={28}
                onClick={() => {
                  setSearchFocus(true);
                  inputRef.current?.focus();
                  if (searchFocus) {
                    handleOnClick(inputRef.current?.value);
                  }
                }}
                style={{ zIndex: '99999', position: 'absolute', right: '2px' }}
              />
            </div>
          </div>
        </div>
        {currentUserState ? (
          <>
            <AiOutlineUser size={28} onClick={() => toggleOpen()} />
            <NavBarUser user={currentUserState} display={isOpen} />
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
