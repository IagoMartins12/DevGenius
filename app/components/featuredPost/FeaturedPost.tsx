'use client';

import useThemes from '@/app/hooks/useTheme';
import style from './style.module.scss';

export const FeaturedPost = () => {
  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <div
      className={` 
        ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
        w-full 
        px-auto 
        py-2 
        h-96
        relative
        `}
    >
      <div className='absolute w-full h-full'>
        <div
          className={`w-5/6 mx-auto my-auto bg-cyan-200 h-5/6 ${style.backgroundImage}`}
        >
          <div
            className='w-2/5 bg-cyan-400 h-3/5 absolute bottom-0 left-[calc(7rem + 4%)]'
            style={{
              left: 'calc(7rem + 4%)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
