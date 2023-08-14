import { lightSocialIcons } from '@/app/utils/SocialIcons';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full pt-12 pb-20 sm:pb-0 shadow-lg flex flex-col justify-center items-center gap-4'>
      <div className='flex gap-3'>
        {lightSocialIcons.map(element => element)}
      </div>
      <div className='flex flex-col gap-1'>
        <div className=' w-full text-center'>
          <span className='font-bold text-xl'>Dev</span>
          <span className=' text-violet-500	text-xl'>Genius </span>
          <span>&copy; {year}</span>
        </div>
        <div className=' w-full text-center pb-4'>
          <span className='font-semibold text-lg'>
            Criado por{' '}
            <span className='font-bold text-lg'> @Iago Martins </span>
          </span>
        </div>
      </div>
    </footer>
  );
};
