import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import useDeleteCommentModal from '@/app/hooks/modals/useDeleteCommentModal';
import { Comment, User } from '@prisma/client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { IoMdCloseCircle } from 'react-icons/io';

export const CommentCard = ({
  comment,
  user,
  currentUser,
}: {
  comment: Comment;
  user: User | undefined;
  currentUser: User | null;
}) => {
  const deleteModal = useDeleteCommentModal();
  const { theme } = useTheme();
  const { navigateToUrl } = useNavigate();

  const handleCloseClick = () => {
    deleteModal.setCurrentComment(comment);
    deleteModal.onOpen();
  };

  const formatDate = (date: any) => {
    if (isNaN(date)) {
      const match = date.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/,
      );
      if (match) {
        date = new Date(
          Date.UTC(
            parseInt(match[1]),
            parseInt(match[2]) - 1,
            parseInt(match[3]),
            parseInt(match[4]),
            parseInt(match[5]),
            parseInt(match[6]),
            parseInt(match[7]),
          ),
        );
      }
    }

    if (isNaN(date)) {
      return '';
    }

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`flex h-32 shadow-md px-2 py-2 ${
        theme === 'light' ? 'comment-white' : 'card-dark'
      }`}
    >
      <div className='lg:w-1/12 w-2/12 flex items-start justify-center'>
        <div className='aspect-video w-12 h-12 relative'>
          <Image
            fill
            className='object-cover rounded-full cursor-pointer w-full'
            src={user?.image ?? '/user.png'}
            alt='Post'
            onClick={() => {
              navigateToUrl('user', user?.id);
            }}
          />
        </div>
      </div>
      <div className='lg:w-11/12 w-10/12 flex items-center flex-col gap-y-3'>
        <div className='w-full h-full py-1 px-2 flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-3 justify-between'>
            <div className='flex items-center gap-x-3'>
              <span className='font-bold text-lg text-center'>
                {user?.username}
              </span>
              <span className='text-sm text-center'>
                {formatDate(comment.createdAt)}
              </span>
            </div>
            {user?.id === currentUser?.id && (
              <div className='flex'>
                <IoMdCloseCircle
                  size={20}
                  className='cursor-pointer'
                  onClick={ev => {
                    ev.stopPropagation();
                    handleCloseClick();
                  }} // Use a função de fechamento criada anteriormente
                />
              </div>
            )}
          </div>

          <span className='font-normal text-base'>{comment.content}</span>
        </div>
      </div>
    </div>
  );
};
