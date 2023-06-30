'use client';

import useDeletePostModal from '@/app/hooks/useDeletePostModal';
import { Post, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdCloseCircleOutline, IoMdCloseCircle } from 'react-icons/io';
import { MdEdit, MdOutlineEdit } from 'react-icons/md';

interface PostPage {
  user: User | null;
  post: Post | null;
}

export const PostPage = ({
  user,
  post,
}: {
  user: User | null;
  post: Post | null;
}) => {
  if (!post) {
    return <div>Post não encontrado</div>;
  }

  const router = useRouter();
  const deleteModal = useDeletePostModal();

  const renderPostContent = () => {
    return { __html: post.content };
  };

  return (
    <div
      className='w-full border-2 flex  gap-x-4 px-10 
      lg:px-32
      pt-7
      pb-16'
      style={{
        minHeight: '100vh',
      }}
    >
      <div className='w-9/12 shadow-lg flex-col h-full'>
        {user?.id === post.userId && (
          <div className='w-11/12 mx-auto h-auto my-6 flex items-center justify-end gap-1'>
            <IoMdCloseCircle
              size={28}
              className='cursor-pointer'
              onClick={() => {
                deleteModal.setCurrentPost(post);
                deleteModal.onOpen();
              }}
            />
            <MdEdit
              size={28}
              className='cursor-pointer'
              onClick={() => router.push(`${post.id}/edit`)}
            />
          </div>
        )}

        <div className='w-11/12 mx-auto h-3/6 my-6'>
          <div className='aspect-video w-full overflow-hidden rounded-xl relative'>
            <Image
              fill
              className='object-cover h-1 w-full group-hover:scale-110 transition '
              src={post.photo_background ?? ''}
              alt='Post'
            />
          </div>
        </div>

        <div className='w-11/12 mx-auto h-auto my-6'>
          <h1 className='font-bold text-2xl'>{post.title}</h1>
        </div>
        <div
          className='w-11/12 mx-auto h-auto my-6'
          dangerouslySetInnerHTML={renderPostContent()}
        ></div>
      </div>
      <div className='w-4/12 shadow-lg'>
        <div className='w-11/12 mx-auto border-2 h-2/3 my-6'></div>
      </div>
    </div>
  );
};
