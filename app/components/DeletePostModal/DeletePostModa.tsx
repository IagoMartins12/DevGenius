import { useGlobalContext } from '@/app/context/store';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import useDeletePostModal from '@/app/hooks/modals/useDeletePostModal';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { toast } from 'react-hot-toast';

export const DeletePostModal: React.FC = () => {
  const deleteModal = useDeletePostModal();

  const { setPostsState } = useGlobalContext();
  const { theme } = useTheme();
  const { navigateToHome } = useNavigate();

  const deletePost = () => {
    const postid = deleteModal.currentPost?.id;
    axios
      .delete(`/api/post/${postid}`)
      .then(() => {
        toast.success('Post Excluido');
        setPostsState(prevPosts =>
          prevPosts.filter(post => post.id !== postid),
        );
        deleteModal.onClose();
        navigateToHome();
      })
      .catch(error => {
        console.log(error);
        toast.error('Algo deu errado! Tente novamente');
      });
  };

  return (
    <div
      className={`deleteModalPosition flex-col z-50 px-5 py-3 bg-color
        ${deleteModal.isOpen ? 'flex' : 'hidden'}`}
    >
      <div className='w-full sm:h-1/2 items-center flex justify-center flex-col gap-y-4'>
        <div className='flex mt-4'>
          <h3 className='text-2xl font-bold'>Deletar post? </h3>
        </div>
        <div className='flex gap-2 flex-col sm:flex-row'>
          <div>
            <button
              className='modalButton bg-red-500'
              onClick={() => {
                deletePost();
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
