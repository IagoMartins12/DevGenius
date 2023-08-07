import { useGlobalContext } from '@/app/context/store';
import useDeleteCommentModal from '@/app/hooks/modals/useDeleteCommentModal';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { toast } from 'react-hot-toast';

export const DeleteCommentModal = ({}: {}) => {
  const deleteModal = useDeleteCommentModal();
  const { setCommentsState } = useGlobalContext();

  const isOpen: boolean = deleteModal.isOpen;
  const { theme } = useTheme();
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
      className={`deleteModalPosition flex-col z-50 px-5 py-3
        ${isOpen ? 'flex' : 'hidden'} bg-color`}
    >
      <div className='w-full h-1/2 '></div>
      <div className='w-full sm:h-1/2 items-center flex justify-center flex-col gap-y-4'>
        <div className='flex mt-4'>
          <h3 className='text-2xl font-bold'>Deletar Comentario? </h3>
        </div>
        <div className='flex gap-2 flex-col sm:flex-row'>
          <div>
            <button
              className='modalButton bg-red-500'
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
              className={`modalButton ${
                theme === 'light' ? 'bg-transparent' : 'bg-slate-100'
              }`}
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
