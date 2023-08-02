import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';

export const FeaturedIcon: React.FC = () => {
  return (
    <div className='absolute top-3 right-3 flex bg-slate-500 rounded-md p-1 items-center justify-center gap-1'>
      <AiOutlineStar />
      <span className='text-xs font-bold'> Em destaque</span>
    </div>
  );
};
