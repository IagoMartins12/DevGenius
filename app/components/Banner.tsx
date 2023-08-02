'use client';

export const Banner: React.FC = () => {
  return (
    <div className='w-full mx-auto h-64 sm:h-72 flex self-center bg-gradient-to-tl from-blue-900 via-teal-700 to-indigo-800"'>
      <div className='flex flex-col gap-y-3 items-center justify-center mx-auto w-10/12 sm:w-6/12 my-auto'>
        <span className='text-xl sm:text-2xl font-extrabold text-center text-white'>
          SEJAM BEM VINDO AOS DEVGENIUS
        </span>
        <span className='text-sm sm:text-lg font-semibold text-center text-white'>
          Seu hub tech! Explore tecnologias, linguagens de programação e dicas
          para a área tech. Mantenha-se atualizado com nossos artigos e posts!
          #DevGenius #TechBlog #Programação #Tecnologia
        </span>
      </div>
    </div>
  );
};
