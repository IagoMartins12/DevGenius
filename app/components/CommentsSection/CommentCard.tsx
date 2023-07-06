export const CommentCard = () => {
  return (
    <div className='flex h-32 border-2 border-black p-2'>
      <div className='w-1/12 flex items-start justify-center'>
        <div className='w-14 h-14 rounded-full bg-slate-500'></div>
      </div>
      <div className='w-11/12 flex items-center border-black  flex-col gap-y-3'>
        <div className='w-full h-full py-1 px-2 flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-3'>
            <span className='font-bold text-lg'>Iago martins</span>
            <span className='text-sm'>06/Julho/2023</span>
          </div>

          <span className='font-normal text-base'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            dicta labore odit qui, quidem nulla eos, et cumque nisi veniam dolor
            molestiae voluptate assumenda! Dolores aspernatur excepturi at ab
            facere.
          </span>
        </div>
      </div>
    </div>
  );
};
