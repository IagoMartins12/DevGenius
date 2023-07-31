'use client';

import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import useLoginModal from '@/app/hooks/modals/useLoginModal';
import { useEffect, useRef, useState } from 'react';
import { NavBarUser } from '../navBarUser/NavBarUser';
import { useGlobalContext } from '@/app/context/store';
import { useTheme } from 'next-themes';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

interface NavbarProps {}

export const Header: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [blackHeader, setBlackHeader] = useState(false);
  const { currentUserState, categoriesState } = useGlobalContext();

  const { theme } = useTheme();
  const { navigateToUrl, navigateToHome } = useNavigate();

  const loginModal = useLoginModal();

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFocus = () => {
    setSearchFocus(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchFocus) {
      const searchValue = event.currentTarget.value;
      navigateToUrl('search', searchValue);
    }
  };

  const handleOnClick = (value: string | undefined) => {
    if (!value) return;
    navigateToUrl('search', value);
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

  return (
    <header
      className='items-center justify-between gap-0 sm:gap-10 flex sticky top-0 w-full z-10 md:!px-12 !px-4'
      style={{
        backgroundColor:
          theme === 'dark'
            ? blackHeader
              ? 'rgba(18,18,18, 1)'
              : 'rgb(18, 18, 18)'
            : blackHeader
            ? 'rgb(253 253 253)'
            : 'rgb(253 251 251 / 70%)',
        height: '9vh',
      }}
    >
      <div className='flex items-center gap-x-10 w-1/2 overflow-hidden'>
        <h1
          onClick={() => {
            navigateToHome();
          }}
          className='cursor-pointer'
        >
          <span className='font-bold text-xl'>Dev</span>
          <span className=' text-violet-500	text-xl'>Genius</span>
        </h1>
        <div className='w-1/2 gap-10 hidden md:flex pointer cursor-pointer'>
          {categoriesState?.map(category => (
            <p
              key={category.id}
              onClick={() => navigateToUrl('category', category.id)}
            >
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

        <ThemeSwitch />
      </div>
    </header>
  );
};
