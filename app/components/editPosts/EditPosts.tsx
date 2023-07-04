'use client';

import ImageUpload from '@/app/components/ImageUpload';
import { Category, CategoryRelationsPosts, Post, User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { CategorysForm } from './CategorysForm';
import { Form } from 'react-bootstrap';
import useThemes from '@/app/hooks/useTheme';
import { useRouter } from 'next/navigation';

interface EditPosts {
  categories: Category[];
  post: Post | null;
  postCategories: CategoryRelationsPosts[] | null;
}

export const EditPosts: React.FC<EditPosts> = ({
  categories,
  post,
  postCategories,
}) => {
  if (!post) return;

  const [categoryArr, setCategoryArr] = useState<Category[]>(categories);
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [checkedCategorys, setCheckedCategorys] = useState<
    CategoryRelationsPosts[] | null
  >(postCategories);

  const theme = useThemes();
  const themes: any = theme.theme;
  const router = useRouter();

  const createCategory = async () => {
    const categoryName = watch('category_name');

    try {
      const response: AxiosResponse<Category> = await axios.post(
        '/api/category',
        { category_name: categoryName },
      );
      await setCategoryArr(prevCategoryArr => [
        ...prevCategoryArr,
        response.data,
      ]);

      setValue('category_name', '');
      toast.success('Categoria adicionada');
    } catch (err) {
      console.log(err);
    }
  };

  const removeCategory = async (category_id: string) => {
    try {
      const response: AxiosResponse<Category> = await axios.delete(
        `/api/category/${category_id}`,
      );
      setCategoryArr(prevCategoryArr =>
        prevCategoryArr.filter(category => category.id !== category_id),
      );
      toast.success('Categoria removida');
    } catch (err) {
      console.log(err);
    }
  };

  const editCategory = async () => {
    const category_id = currentCategory?.id;
    const category_name = watch('category_edit_name');

    try {
      const response: AxiosResponse<Category> = await axios.patch(
        `/api/category/${category_id}`,
        { category_name },
      );
      const updatedCategory = response.data;
      setCategoryArr(prevCategoryArr => {
        const updatedArr = prevCategoryArr.map(category => {
          if (category.id === updatedCategory.id) {
            return updatedCategory;
          } else {
            return category;
          }
        });
        return updatedArr;
      });
      setValue('category_edit_name', '');
      toast.success('Categoria atualizada');
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.title === '') return toast.error('Insira um titulo!');
    if (data.photo_background === '') return toast.error('Insira uma foto!');
    if (data.content === '') return toast.error('Insira o conteudo!');
    if (data.resume === '') return toast.error('Insira um resumo!');
    if (data.selectedCategories.length === 0)
      return toast.error('Marque ao menos uma categoria!');

    const object = {
      title: data.title,
      featured: data.featured === true ? 1 : 0,
      photo_background: data.photo_background,
      content: data.content,
      resume: data.resume,
    };

    try {
      const response: AxiosResponse<Post> = await axios.patch(
        `/api/post/${post.id}`,
        object,
      );

      toast.success('Post editado!');
      router.push(`/post/${post.id}`);
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: post.title,
      content: post.content,
      resume: post.resume,
      photo_background: post.photo_background,
      featured: post.featured,
      selectedCategories: [],
    },
  });

  const photo_background = watch('photo_background');
  const featured = watch('featured');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleChange = (ev: { target: { value: any } }) => {
    setValue('content', ev.target.value);
  };

  const handleChangeResume = (ev: { target: { value: any } }) => {
    setValue('resume', ev.target.value);
  };

  return (
    <>
      <div
        className={`flex flex-col sm:px-24 sm:py-6
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
      >
        <h3 className='sm:mx-6 mt-6 mx-6 font-bold text-3xl '>Editar post</h3>
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
                  className={`w-full px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
                  {...register('title')}
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <CategorysForm
                categories={categoryArr}
                checkedCategorys={checkedCategorys}
                setCheckedCategorys={setCheckedCategorys}
                createCategory={createCategory}
                editCategory={editCategory}
                removeCategory={removeCategory}
                setValue={setValue}
                register={register}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                post={post}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <h3 className=' font-bold text-1xl sm:text-2xl  '>
                Resumo do artigo:
              </h3>
              <textarea
                id=''
                cols={10}
                rows={3}
                className={`border-2 px-2 py-2 resize-none
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
                {...register('resume')}
                onChange={ev => {
                  handleChangeResume(ev);
                }}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <h3 className=' font-bold text-1xl sm:text-2xl  '>Contéudo: </h3>
              <textarea
                cols={30}
                rows={10}
                className={`border-2 px-2 py-2 resize-none
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
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
                Editar post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
