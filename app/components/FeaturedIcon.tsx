import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';

export const FeaturedIcon: React.FC = () => {
  return (
    <div className='absolute top-3 right-3 flex bg-slate-300 rounded-md p-1 items-center justify-center gap-1'>
      <AiOutlineStar color='black' fill='black' />
      <span className='text-xs font-bold text-gray-950 '> Em destaque</span>
    </div>
  );
};
