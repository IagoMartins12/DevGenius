import { useGlobalContext } from '@/app/context/store';
import useDeleteCommentModal from '@/app/hooks/modals/useDeleteCommentModal';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export const DeleteCommentModal = ({}: {}) => {
  const deleteModal = useDeleteCommentModal();
  const { setCommentsState } = useGlobalContext();

  const themes: Themes = useThemes().theme;
  const isOpen: boolean = deleteModal.isOpen;

  const deleteComment = () => {
    const commentId = deleteModal.currentComment?.id;
    axios
      .delete(`/api/comment/${commentId}`)
      .then(() => {
        toast.success('Comentário Excluido');
        deleteModal.onClose();
        setCommentsState(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(error => {
        console.log(error);
        toast.error('Algo deu errado! Tente novamente');
      });
  };

  return (
    <div
      className={`deleteModalPosition flex-col border-2 z-10 px-5 py-3
        ${isOpen ? 'flex' : 'hidden'}
        ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
    >
      <div className='w-full h-1/2 '>
        <div className='aspect-video w-full h-32 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
          <Image
            fill
            className=' h-1 w-full group-hover:scale-110 transition'
            src='/thinking.svg'
            alt='Listing'
          />
        </div>
      </div>
      <div className='w-full h-1/2 items-center flex justify-center flex-col gap-y-4'>
        <div className='flex mt-4'>
          <h3 className='text-2xl font-bold'>Deletar Comentario? </h3>
        </div>
        <div className='flex gap-2'>
          <div>
            <button
              style={{
                backgroundColor: 'red',
              }}
              onClick={() => {
                deleteComment();
                document.body.style.overflow = 'auto';
              }}
            >
              Deletar
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                deleteModal.onClose();
                document.body.style.overflow = 'auto';
              }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
