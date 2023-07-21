import { useGlobalContext } from '@/app/context/store';
import { Category, Post } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useCreatePosts = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const { setCategoriesState } = useGlobalContext();

  const createCategory = async () => {
    const categoryName = watch('category_name');

    try {
      const response: AxiosResponse<Category> = await axios.post(
        '/api/category',
        { category_name: categoryName },
      );
      setCategoriesState(prevCategoryArr => [
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
      setCategoriesState(prevCategoryArr =>
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

    console.log(category_id);
    try {
      const response: AxiosResponse<Category> = await axios.patch(
        `/api/category/${category_id}`,
        { category_name },
      );
      const updatedCategory = response.data;
      setCategoriesState(prevCategoryArr => {
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
      const response: AxiosResponse<Post> = await axios.post(
        '/api/post',
        object,
      );

      const categoryRequests = data.selectedCategories.map(
        (category: string) => {
          const id = category.split(',')[1];
          return axios.post('/api/categoryPost', {
            post_id: response.data.id,
            category_id: id,
          });
        },
      );

      await Promise.all(categoryRequests);
      toast.success('Post criado!');
      reset();
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FieldValues>({
      defaultValues: {
        title: '',
        content: '',
        resume: '',
        photo_background: '',
        featured: false,
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

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('content', ev.target.value);
  };

  const handleChangeResume = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('resume', ev.target.value);
  };

  return {
    setCurrentCategory,
    register,
    handleSubmit,
    setValue,
    photo_background,
    featured,
    setCustomValue,
    handleChange,
    handleChangeResume,
    createCategory,
    removeCategory,
    editCategory,
    currentCategory,
    onSubmit,
  };
};
