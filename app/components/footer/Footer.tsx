'use client';

import useThemes from '@/app/hooks/useTheme';
import {
  AiOutlineInstagram,
  AiFillInstagram,
  AiFillGithub,
  AiOutlineGithub,
  AiOutlineFacebook,
  AiFillFacebook,
  AiOutlineLinkedin,
  AiFillLinkedin,
} from 'react-icons/ai';

interface Menu {
  name: string;
  action: () => void;
}
export const Footer = () => {
  const year = new Date().getFullYear();

  const quickLink = [
    {
      name: 'Home',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Sobre',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Autor',
      action: () => {},
    },
    {
      name: 'Posts',
      action: () => {},
    },
  ];

  const categorys = [
    {
      name: 'Home',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Sobre',
      action: () => {
        console.log('clicou');
      },
    },
    {
      name: 'Autor',
      action: () => {},
    },
    {
      name: 'Posts',
      action: () => {},
    },
  ];

  const lightIcons = [
    <>
      <AiFillInstagram size={28} className='cursor-pointer' />
      <AiFillGithub size={28} className='cursor-pointer' />
      <AiFillFacebook size={28} className='cursor-pointer' />
      <AiFillLinkedin size={28} className='cursor-pointer' />
    </>,
  ];
  const darkIcons = [
    <>
      <AiOutlineInstagram size={28} className='cursor-pointer' />
      <AiOutlineGithub size={28} className='cursor-pointer' />
      <AiOutlineFacebook size={28} className='cursor-pointer' />
      <AiOutlineLinkedin size={28} className='cursor-pointer' />
    </>,
  ];
  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <footer
      className={`
        w-full 
        ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
        pt-12`}
      style={{
        backgroundColor:
          themes === 'light' ? 'rgb(218, 218, 218, 0.7)' : 'rgba(18,18,18)',
      }}
    >
      {/* firstDiv */}
      <div
        className={`
        flex 
        flex-col
        sm:flex-row
        gap-x-6
        w-full 
        px-8
        lg:px-48
        justify-between
        `}
      >
        <div className='flex flex-col sm:flex-col gap-y-6 sm:w-3/12 w-full my-6'>
          <div className='flex flex-col w-full sm:w-auto sm:flex'>
            <span className='font-black'> Sobre: </span>
            <span className='w-full'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              est in doloremque enim? Magni omnis error iusto! Quisquam
              suscipit, mollitia incidunt laboriosam tenetur, consequatur odit
              nihil, eum quasi assumenda sit!
            </span>
          </div>

          <div className='flex flex-col sm:gap-2'>
            <p>
              <span className='font-black'> Email: </span>
              martinsiagosaraiva@gmail.com
            </p>
            <p>
              <span className='font-black'> Telefone: </span>
              (11) 988598530
            </p>
          </div>
        </div>

        <div className='flex gap-x-8 w-full sm:w-3/12 my-6 '>
          <div className='flex flex-col gap-y-2'>
            <h4> Acesse </h4>
            {quickLink.map((menu: Menu, index: number) => {
              return (
                <div key={index} onClick={menu.action}>
                  <p className='hover:underline cursor-pointer '>{menu.name}</p>
                </div>
              );
            })}
          </div>
          <div className='flex flex-col gap-y-2'>
            <h4> Categorias </h4>
            {categorys.map((menu: Menu, index: number) => {
              return (
                <div key={index} onClick={menu.action}>
                  <p className='hover:underline cursor-pointer '>{menu.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-3/12 items-center justify-center gap-3'>
          <h4 className='pt-4'>Siga nas redes sociais: </h4>
          {theme.theme === 'light' ? (
            <div className='flex gap-3'>
              {lightIcons.map(element => element)}
            </div>
          ) : (
            <div className='flex gap-3'>
              {darkIcons.map(element => element)}
            </div>
          )}
        </div>
      </div>
      {/* secondDiv */}
      <div className=' w-full text-center pt-4 pb-2'>
        <span className=''>Iago Martins &copy; {year}</span>
      </div>
    </footer>
  );
};
