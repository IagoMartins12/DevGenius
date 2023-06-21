export const PersonalData = (themes?: any) => {
  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* Name */}
        <div className='flex gap-x-4'>
          <div className='flex flex-col gap-y-2 w-6/12'>
            <h3 className=' font-bold  text-1xl sm:text-2xl '>
              Primeiro nome:{' '}
            </h3>
            <input
              type='text'
              className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
            />
          </div>
          <div className='flex flex-col gap-y-2 w-6/12'>
            <h3 className=' font-bold  text-1xl sm:text-2xl '>
              Segundo nome:{' '}
            </h3>
            <input
              type='text'
              className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
            />
          </div>
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* Username */}
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className=' font-bold  text-1xl sm:text-2xl '>
            Nome de usuario:{' '}
          </h3>
          <input
            type='text'
            className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
          />
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mx-6 my-6 justify-center items-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'>
          Editar informações
        </button>
      </div>
    </>
  );
};
