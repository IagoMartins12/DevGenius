'use client';

import ImageUpload from '@/app/components/ImageUpload';
import { Category, Post } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { CategorysForm } from './CategorysForm';
import { Form } from 'react-bootstrap';
import { ToogleButton } from './ToogleButton';
import useThemes from '@/app/hooks/useTheme';
import { useRouter } from 'next/navigation';

type categories = Category;
type post = Post;
export default async function CreatePost({
  categories,
}: {
  categories: categories[];
}) {
  const [editCategoryInput, setEditCategoryInput] = useState(false);
  const [categoryArr, setCategoryArr] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const theme = useThemes();
  const themes: any = theme.theme;

  const createCategory = async () => {
    const categoryName = watch('category_name');

    try {
      const response: AxiosResponse<Category> = await axios.post(
        '/api/category',
        { category_name: categoryName },
      );
      console.log('response', response);
      await setCategoryArr(prevCategoryArr => [
        ...prevCategoryArr,
        response.data,
      ]);
      console.log('categoryArr', categoryArr);

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
          console.log('category', category);
          console.log('updatedCategory', updatedCategory);

          if (category.id === updatedCategory.id) {
            return updatedCategory;
          } else {
            return category;
          }
        });
        return updatedArr;
      });
      setValue('category_edit_name', '');
      setEditCategoryInput(false);
      toast.success('Categoria atualizada');
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      title: data.title,
      featured: data.featured === true ? 1 : 0,
      photo_background: data.photo_background,
      content: data.content,
    };

    try {
      const response: AxiosResponse<post> = await axios.post(
        '/api/post',
        object,
      );
      data.selectedCategories.forEach(async (category: any) => {
        try {
          const id = category.split(',');
          await axios.post('/api/categoryPost', {
            post_id: response.data.id,
            category_id: id[1],
          });
        } catch (err) {
          console.log('erro 2' + err);
        }
      });
      toast.success('Post criado!');
      router.refresh();
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
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      content: '',
      photo_background: '',
      featured: false,
      selectedCategories: [],
    },
  });

  const photo_background = watch('photo_background');

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

  useEffect(() => {
    setCategoryArr(categories);
  }, []);

  console.log(categoryArr);

  return (
    <>
      <div
        className={`flex flex-col sm:px-24 sm:py-12
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
      >
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
                  className='w-full px-2 py-2 border-2'
                  {...register('title')}
                />
              </div>
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <CategorysForm
                categories={categoryArr}
                createCategory={createCategory}
                editCategory={editCategory}
                removeCategory={removeCategory}
                setValue={setValue}
                register={register}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
              />
            </div>
            <div className='flex flex-col gap-y-2 mx-6 mt-3'>
              <h3 className=' font-bold text-1xl sm:text-2xl  '>Contéudo: </h3>
              <textarea
                id=''
                cols={30}
                rows={10}
                className='border-2  px-2 py-2'
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
                  checked={isChecked}
                  id='custom-switch'
                  onClick={() => {
                    setIsChecked(!isChecked);
                    setValue('featured', !isChecked);
                  }}
                  {...register('featured')}
                />
                {isChecked ? <p> Post em destaque </p> : <p>Post normal</p>}
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
}
