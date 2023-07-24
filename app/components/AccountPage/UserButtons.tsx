import { AiOutlineCamera, AiOutlineSetting } from 'react-icons/ai';

export const UserButtons = () => {
  return (
    <>
      <button
        className='flex actionButton'
        style={{
          width: '150px',
          minWidth: 'inherit',
        }}
      >
        <AiOutlineCamera size={30} />
        <span>Capa</span>
      </button>
      <button
        className='flex actionButton'
        style={{
          width: '150px',
          minWidth: 'inherit',
        }}
      >
        <AiOutlineSetting size={30} />
        <span>Editar</span>
      </button>
    </>
  );
};
