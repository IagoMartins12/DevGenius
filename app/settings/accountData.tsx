export const AccountData = (themes?: any) => {
  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* Name */}
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className=' font-bold  text-1xl sm:text-2xl '>Nome: </h3>
          <input
            type='text'
            className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
          />
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

      <div className='flex flex-col gap-y-2 mx-6 mt-3'>
        <h3 className=' font-bold text-1xl sm:text-2xl  '>Bio:</h3>
        <textarea
          id=''
          cols={10}
          rows={6}
          className={`border-2 px-2 py-2 resize-none
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
        />
      </div>

      <div className='flex flex-col gap-y-2 mx-6 my-6 justify-center items-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'>
          Editar informações
        </button>
      </div>
    </>
  );
};
