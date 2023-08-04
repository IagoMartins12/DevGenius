import { useGlobalContext } from '@/app/context/store';
import useHorizontalMenu from '@/app/hooks/modals/useHorizontalMenu';
import { Category } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

interface HorizontalMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const HorizontalMenuModal: React.FC<HorizontalMenuProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { categoriesState } = useGlobalContext();
  return (
    <div
      className={`
      ${isOpen ? 'flex' : 'hidden'}
      absolute 
      z-20 
      w-52
      left-0 
      top-16
      flex-col 
      bg-color
      border-radius-16 `}
    >
      <span className='m-0 text-lg font-semibold px-5 py-2 '>
        {' '}
        Categorias:{' '}
      </span>
      <div className='flex flex-col'>
        {categoriesState.map((categories: Category) => {
          return (
            <span
              className='px-5 py-2 text-base font-medium '
              key={categories.id}
            >
              {categories.category_name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
