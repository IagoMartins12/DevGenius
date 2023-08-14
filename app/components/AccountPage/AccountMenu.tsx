import { Dispatch, SetStateAction } from 'react';
import { BiComment } from 'react-icons/bi';
import { BsBookmarkStar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { TbFileLike } from 'react-icons/tb';

interface AccountMenuProps {
  isActive: number;
  setIsActive: Dispatch<SetStateAction<number>>;
}
export const AccountMenu: React.FC<AccountMenuProps> = ({
  isActive,
  setIsActive,
}) => {
  return (
    <>
      <div
        className='flex flex-col sm:flex-row items-center gap-1 sm:gap-0 justify-center sm:justify-between cursor-pointer'
        onClick={() => setIsActive(0)}
      >
        <span
          className={`text-sm sm:text-xl ${
            isActive === 0 ? 'font-extrabold' : 'font-medium '
          }`}
        >
          Perfil
        </span>
        <CgProfile size={22} />
      </div>
      <div
        className='flex flex-col sm:flex-row items-center gap-1 sm:gap-0 justify-center sm:justify-between cursor-pointer'
        onClick={() => setIsActive(1)}
      >
        <span
          className={`text-sm sm:text-xl ${
            isActive === 1 ? 'font-extrabold' : 'font-medium '
          }`}
        >
          Curtidas
        </span>
        <TbFileLike size={22} />
      </div>

      <div
        className='flex flex-col sm:flex-row items-center gap-1 sm:gap-0 justify-center sm:justify-between cursor-pointer'
        onClick={() => setIsActive(3)}
      >
        <span
          className={`text-sm sm:text-xl ${
            isActive === 3 ? 'font-extrabold' : 'font-medium '
          }`}
        >
          Salvos
        </span>
        <BsBookmarkStar size={22} />
      </div>
      <div
        className='flex flex-col sm:flex-row items-center gap-1 sm:gap-0 justify-center sm:justify-between cursor-pointer'
        onClick={() => setIsActive(4)}
      >
        <span
          className={`text-sm sm:text-xl ${
            isActive === 4 ? 'font-extrabold' : 'font-medium '
          }`}
        >
          Comentarios
        </span>
        <BiComment size={22} />
      </div>
    </>
  );
};
