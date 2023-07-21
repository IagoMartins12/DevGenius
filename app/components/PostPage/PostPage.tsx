'use client';

import useDeletePostModal from '@/app/hooks/modals/useDeletePostModal';
import { CategoryRelationsPosts, Comment, Post, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { AuthorCard } from '../authorCard/AuthorCard';
import { DeleteCommentModal } from '../deleteCommentModal/deleteCommentModal';
import { CommentsSection } from '../CommentsSection/CommentsSection';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import { ReactionsComponent } from '../ReactionsComponent/ReactionsComponent';
import { useGlobalContext } from '@/app/context/store';

export const PostPage = ({
  post,
  author,
  allUsers,
  categoryPosts,
}: {
  post: Post | null;
  author: User | null;
  allUsers: User[];
  categoryPosts: CategoryRelationsPosts[];
}) => {
  const { currentUserState, setCommentsState, postState, setPostState } =
    useGlobalContext();

  setPostState(post);

  if (!postState) {
    return <div>Post não encontrado</div>;
  }

  const router = useRouter();
  const deleteModal = useDeletePostModal();
  const themes: Themes = useThemes().theme;
  const commentsSectionRef = useRef<HTMLDivElement>(null);

  const renderPostContent = () => {
    return { __html: postState.content };
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.commentContent === '')
      return toast.error('Insira algo no comentario!');

    const object = {
      content: data.commentContent,
      postId: postState.id,
    };

    try {
      const response: AxiosResponse<Comment> = await axios.post(
        `/api/comment`,
        object,
      );

      const newComment = {
        id: response.data.id,
        content: response.data.content,
        postId: response.data.postId,
        userId: response.data.userId,
        createdAt: response.data.createdAt,
      };

      setCommentsState(prevState => [...prevState, newComment]);
      toast.success('Obrigado pelo comentario!');
      reset();
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      commentContent: '',
    },
  });

  const commentAction = () => {
    commentsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className={`w-full flex gap-x-4 px-10
      lg:px-32
      py-7
      pb-16'
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
      style={{
        minHeight: '100vh',
      }}
    >
      <ReactionsComponent commentAction={commentAction} postId={postState.id} />

      <div className='w-9/12 shadow-lg flex-col h-full border-2'>
        {currentUserState?.role === 1 && (
          <div className='w-11/12 mx-auto h-auto my-6 flex items-center justify-end gap-1'>
            <IoMdCloseCircle
              size={28}
              className='cursor-pointer'
              onClick={() => {
                deleteModal.setCurrentPost(postState);
                deleteModal.onOpen();
              }}
            />
            <MdEdit
              size={28}
              className='cursor-pointer'
              onClick={() => router.push(`${postState.id}/edit`)}
            />
          </div>
        )}

        <div className='w-11/12 mx-auto h-3/6 my-6'>
          <div className='aspect-video w-full overflow-hidden rounded-xl relative'>
            <Image
              fill
              className='object-cover h-1 w-full group-hover:scale-110 transition '
              src={postState.photo_background ?? ''}
              alt='Post'
            />
          </div>
        </div>

        <div className='w-11/12 mx-auto h-auto my-6'>
          <h1 className='font-bold text-2xl'>{postState.title}</h1>
        </div>
        <div
          className='w-11/12 mx-auto h-auto my-6'
          dangerouslySetInnerHTML={renderPostContent()}
        />

        <hr className='w-11/12 mx-auto' />
        <div className='w-11/12 mx-auto h-3/6 my-6'>
          <CommentsSection
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            allUsers={allUsers}
            commentsSectionRef={commentsSectionRef}
            postId={postState.id}
          />
        </div>
      </div>
      <div className='w-4/12 shadow-lg h-fit border-2'>
        <div className='w-11/12 mx-auto h-2/3 my-6'>
          <AuthorCard author={author} />
        </div>
      </div>
      <DeleteCommentModal />
    </div>
  );
};
