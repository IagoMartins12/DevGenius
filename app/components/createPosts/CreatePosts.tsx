'use client';

import ImageUpload from '@/app/components/ImageUpload';
import { Category } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  IoMdAddCircle,
  IoMdAddCircleOutline,
  IoMdCloseCircleOutline,
  IoMdCloseCircle,
} from 'react-icons/io';
import { MdEdit, MdOutlineEdit } from 'react-icons/md';

type categories = Category;
export default async function CreatePosts({
  categories,
}: {
  categories: categories[];
}) {
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [editCategoryInput, setEditCategoryInput] = useState(false);
  const [categoryArr, setCategoryArr] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>();

  const toogleCategoryInputOpen = () => {
    setCategoryInputOpen(prevCategoryInputOpen => !prevCategoryInputOpen);
  };

  const createCategory = async () => {
    const categoryName = watch('category_name');

    try {
      const response: AxiosResponse<Category> = await axios.post(
        '/api/category',
        { category_name: categoryName },
      );
      setCategoryArr(prevCategoryArr => [...prevCategoryArr, response.data]);
      setValue('category_name', '');
      toast.success('Categoria adicionada');
    } catch (err) {
      console.log(err);
    }
  };

  const removeCategory = async (category_id: string) => {
    console.log(category_id);
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
      console.log('updatedCategory', updatedCategory);
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      content: '',
      photo_background: '',
      featured: false,
      categoryName: '',
      category_edit_nam: '',
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

  useEffect(() => {
    if (categories) {
      setCategoryArr(categories);
    }
  }, [categories]);

  return (
    <>
      <div className='flex flex-col sm:px-24 sm: py-12'>
        <h3 className=' mt-6 ml-6 font-bold text-3xl '>Criar post</h3>
        <div className='flex  gap-x-8  mt-6 ml-6 '>
          <div className='flex flex-col w-4/12 '>
            <ImageUpload
              onChange={value => setCustomValue('photo_background', value)}
              value={photo_background}
            />
          </div>
          <div className='flex flex-col sm:w-8/12 border-2 pb-4'>
            <div className='flex sm:flex-col gap-y-4 mx-6 mt-3 '>
              {/* titulo */}
              <div className='flex flex-col gap-y-2'>
                <h3 className=' font-bold text-2xl '>Titulo</h3>
                <input
                  type='text'
                  className='w-full px-2 py-2 border-2'
                  {...register('title')}
                />
              </div>
              {/* Categorias */}
              <div className='flex flex-col gap-y-2'>
                <h3 className=' font-bold text-2xl '>
                  Selecione as categorias:{' '}
                </h3>
                <div className='flex px-2 py-2 border-2 items-center justify-between '>
                  <div className='flex px-2 py-2 gap-x-5 flex-wrap '>
                    {categoryArr.map((category: Category) => (
                      <div
                        className='flex gap-x-1 items-center gap-2'
                        key={category.id}
                      >
                        <label className='flex gap-1'>
                          <input
                            type='checkbox'
                            name='categoryRadio'
                            value={category.category_name}
                          />
                          {category.category_name}
                        </label>

                        <div className='flex '>
                          <MdEdit
                            size={15}
                            className='cursor-pointer'
                            onClick={() => {
                              setCurrentCategory(category);
                              setEditCategoryInput(true);
                            }}
                          />
                          <IoMdCloseCircle
                            size={15}
                            className='cursor-pointer'
                            onClick={() => {
                              removeCategory(category.id);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <IoMdAddCircle
                      size={23}
                      className='cursor-pointer'
                      onClick={() => {
                        toogleCategoryInputOpen();
                      }}
                    />
                  </div>
                </div>
                {/* Criar categoria */}
                <div
                  className=' flex flex-col gap-y-3 pt-3'
                  style={{
                    display: categoryInputOpen ? 'flex' : 'none',
                  }}
                >
                  <h3 className=' font-bold text-1xl '>Criar categoria:</h3>
                  <div className='flex items-center gap-x-4 justify-between'>
                    <input
                      type='text'
                      className='sm:w-11/12 px-2 py-2 border-2'
                      {...register('category_name')}
                    />

                    <div className='flex items-end'>
                      <IoMdAddCircle
                        size={23}
                        className='cursor-pointer'
                        onClick={() => {
                          createCategory();
                        }}
                      />
                      <IoMdCloseCircle
                        size={23}
                        className='cursor-pointer'
                        onClick={() => {
                          toogleCategoryInputOpen();
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Editar categoria */}
                <div
                  className=' flex flex-col gap-y-3 pt-3'
                  style={{
                    display: editCategoryInput ? 'flex' : 'none',
                  }}
                >
                  <h3 className=' font-bold text-1xl '>Editar categoria:</h3>
                  <div className='flex items-center gap-x-4 justify-between'>
                    <input
                      type='text'
                      className='sm:w-11/12 px-2 py-2 border-2'
                      placeholder={currentCategory?.category_name}
                      {...register('category_edit_name')}
                    />

                    <div className='flex items-end'>
                      <IoMdAddCircle
                        size={23}
                        className='cursor-pointer'
                        onClick={() => {
                          editCategory();
                        }}
                      />
                      <IoMdCloseCircle
                        size={23}
                        className='cursor-pointer'
                        onClick={() => {
                          setEditCategoryInput(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
