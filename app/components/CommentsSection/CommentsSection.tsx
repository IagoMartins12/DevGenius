import { CommentCard } from './CommentCard';

export const CommentsSection = () => {
  return (
    <div className='w-full flex flex-col gap-y-4'>
      <div className='flex items-center justify-start '>
        <h1 className='font-bold text-xl'>
          Commentarios: <span className='font-semibold text-lg'>14</span>
        </h1>
      </div>
      <div className='flex h-44'>
        <div className='w-1/12 flex items-start justify-center'>
          <div className='w-14 h-14 rounded-full bg-slate-500'></div>
        </div>
        <div className='w-11/12 flex items-center border-black  flex-col gap-y-3'>
          <textarea
            className='w-full h-3/4 p-2 resize-none border-2 border-black'
            name=''
            id=''
            placeholder='Adicionar comentario...'
          />
          <input
            type='button'
            value='Comentar'
            className='w-full h-1/4 border-2 border-black'
          />
        </div>
      </div>
      <hr />
      <div className='my-8 flex flex-col gap-y-4'>
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
    </div>
  );
};
