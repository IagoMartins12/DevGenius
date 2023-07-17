'use client';

import useDeletePostModal from '@/app/hooks/modals/useDeletePostModal';
import {
  Category,
  CategoryRelationsPosts,
  Comment,
  Post,
  User,
} from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { AuthorCard } from '../authorCard/AuthorCard';
import { DeleteCommentModal } from '../deleteCommentModal/deleteCommentModal';
import { CommentsSection } from '../CommentsSection/CommentsSection';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import { RelatedPosts } from '../RelatedPosts/RelatedPosts';
import { PostCard } from '../postCard/PostCard';

export const PostPage = ({
  user,
  post,
  posts,
  author,
  comments,
  allUsers,
  categories,
  categoryPosts,
}: {
  user: User | null;
  post: Post | null;
  posts: Post[];
  author: User | null;
  comments: Comment[];
  allUsers: User[];
  categories: Category[];
  categoryPosts: CategoryRelationsPosts[];
}) => {
  if (!post) {
    return <div>Post não encontrado</div>;
  }

  const [commentState, setCommentsState] = useState(comments);
  const [postState, setPostState] = useState(post);

  const router = useRouter();
  const deleteModal = useDeletePostModal();
  const themes: Themes = useThemes().theme;

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
      <div className='w-9/12 shadow-lg flex-col h-full border-2'>
        {user?.role === 1 && (
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
              onClick={() => router.push(`${post.id}/edit`)}
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
        <div>
          {/* <RelatedPosts
            posts={posts}
            categories={categories}
            categoriesPost={categoryPosts}
            currentUser={user}
          /> */}
        </div>
        <hr className='w-11/12 mx-auto' />
        <div className='w-11/12 mx-auto h-3/6 my-6'>
          <CommentsSection
            comments={commentState}
            currentUser={user}
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            allUsers={allUsers}
          />
        </div>
      </div>
      <div className='w-4/12 shadow-lg h-fit border-2'>
        <div className='w-11/12 mx-auto h-2/3 my-6'>
          <AuthorCard author={author} />
        </div>
      </div>
      <DeleteCommentModal
        comments={commentState}
        setComments={setCommentsState}
      />
    </div>
  );
};
