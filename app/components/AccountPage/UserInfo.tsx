import { AiFillEdit, AiOutlineFlag } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { GrDocumentUser } from 'react-icons/gr';

export const UserInfo = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-6 h-full  w-7/12'>
      <div className='flex items-start justify-start flex-col gap-y-1 w-full'>
        <h1>Iago martins</h1>

        <div className='flex gap-x-2 items-center justify-center'>
          <AiFillEdit size={20} />
          <span> Editar perfil </span>
        </div>
        {/* <div className='flex gap-x-2 items-center justify-center'>
                    <IoLocationSharp size={20} />
                    <span> São paulo, sp</span>
                  </div> */}
      </div>
      <div className='flex gap-x-3 profileBtn'>
        <AiOutlineFlag size={17} />
        <span className='text-sm'>Adicionar endereço</span>
      </div>
      <div className='flex gap-x-3 profileBtn'>
        <BsPeople size={17} />
        <span className='text-sm'>Adicionar Redes</span>
      </div>
      {/* <div className='flex self-start gap-x-1'>
                  <AiOutlineInstagram size={28} className='cursor-pointer' />
                  <AiOutlineGithub size={28} className='cursor-pointer' />
                  <AiOutlineFacebook size={28} className='cursor-pointer' />
                  <AiOutlineLinkedin size={28} className='cursor-pointer' />
                </div> */}
      <div className='flex gap-x-3 profileBtn'>
        <GrDocumentUser size={17} />
        <span className='text-sm'>Adicionar bio</span>
      </div>
      {/* <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  magni saepe nisi incidunt, earum, beatae assumenda odit cum
                  illo
                </div> */}
      <div className='flex gap-x-8 self-start'>
        <div className='flex flex-col items-center'>
          <span>1000</span>
          <span>Seguidores</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>1000</span>
          <span>Seguindo</span>
        </div>
        <div className='flex flex-col items-center'>
          <span>1000</span>
          <span>Comentarios</span>
        </div>
      </div>
    </div>
  );
};
