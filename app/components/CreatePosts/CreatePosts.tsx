'use client';

import ImageUpload from '@/app/components/ImageUpload';
import { CategorysForm } from './CategorysForm';
import { Form } from 'react-bootstrap';
import { useCreatePosts } from '@/app/hooks/customHooks/useCreatePosts';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';
import { Post } from '@prisma/client';
import { useGlobalContext } from '@/app/context/store';

export const CreatePosts: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    featured,
    handleChange,
    handleChangeResume,
    handleSubmit,
    photo_background,
    register,
    setCustomValue,
    setValue,
    reset,
  } = useCreatePosts();

  const { postsState, setPostsState } = useGlobalContext();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.title === '') return toast.error('Insira um titulo!');
    if (data.photo_background === '') return toast.error('Insira uma foto!');
    if (data.content === '') return toast.error('Insira o conteudo!');
    if (data.resume === '') return toast.error('Insira um resumo!');
    if (selectedCategories.length === 0)
      return toast.error('Marque pelo menos uma categoria!');

    const object = {
      title: data.title,
      featured: data.featured === true ? 1 : 0,
      photo_background: data.photo_background,
      content: data.content,
      resume: data.resume,
    };

    try {
      const response: AxiosResponse<Post> = await axios.post(
        '/api/post',
        object,
      );
      const categoryRequests = selectedCategories.map((category: string) => {
        return axios.post('/api/categoryPost', {
          post_id: response.data.id,
          category_id: category,
        });
      });
      await Promise.all(categoryRequests);
      const updatedPosts = [...postsState, response.data];
      setPostsState(updatedPosts);
      toast.success('Post criado!');
      reset();
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };
  return (
    <>
      <div className={`flex flex-col sm:px-24 sm:py-8`}>
        <h3 className='sm:mx-6 mt-6 mx-6 font-bold text-3xl '>Criar post</h3>
        <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-8  mx-6 my-6 '>
          <div className='flex flex-col w-full lg:w-4/12'>
            <div>
              <ImageUpload
                onChange={value => setCustomValue('photo_background', value)}
                value={photo_background}
              />
            </div>
            <div className='w-full pt-3'>
              <button
                className='bg-red-500	 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full'
                onClick={() => {
                  setCustomValue('photo_background', '');
                }}
              >
                Excluir foto
              </button>
            </div>
          </div>
          <div className='flex flex-col  w-full lg:w-8/12 border-2 pb-4'>
            <div className='flex sm:flex-col gap-y-4 mx-6 mt-3'>
              {/* titulo */}
              <div className='flex flex-col gap-y-2 w-full'>
                <h3 className=' font-bold  text-1xl sm:text-2xl '>Titulo</h3>
                <input
                  type='text'
                  className={`w-full px-2 py-2 border-2`}
                  {...register('title')}
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <CategorysForm
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <h3 className=' font-bold text-1xl sm:text-2xl  '>
                Resumo do artigo:{' '}
              </h3>
              <textarea
                cols={10}
                rows={3}
                className={`border-2 px-2 py-2 resize-none`}
                {...register('resume')}
                onChange={ev => {
                  handleChangeResume(ev);
                }}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <h3 className=' font-bold text-1xl sm:text-2xl  '>Contéudo: </h3>
              <textarea
                id=''
                cols={30}
                rows={10}
                className={`border-2 px-2 py-2 resize-none`}
                {...register('content')}
                onChange={ev => {
                  handleChange(ev);
                }}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3 h-14'>
              <Form className='flex justify-center'>
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  onClick={() => {
                    setValue('featured', !featured);
                  }}
                  {...register('featured')}
                />
                {featured ? <p> Post em destaque </p> : <p>Post normal</p>}
              </Form>
            </div>
            <div className='flex flex-col gap-y-2 mx-6 justify-center items-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'
                onClick={handleSubmit(onSubmit)}
              >
                Criar post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
