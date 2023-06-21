export const PasswordData = (themes?: any) => {
  return (
    <>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className=' font-bold  text-1xl sm:text-2xl '>Senha atual: </h3>
          <input
            type='text'
            className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
          />
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* new password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className=' font-bold  text-1xl sm:text-2xl '>Nova senha: </h3>
          <input
            type='text'
            className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
          />
        </div>
      </div>
      <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
        {/* confirm new password */}
        <div className='flex flex-col gap-y-2 w-full'>
          <h3 className=' font-bold  text-1xl sm:text-2xl '>
            Confirme a nova senha:{' '}
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
