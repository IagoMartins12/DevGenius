import { Category, CategoryRelationsPosts, Post } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useEditPosts = ({
  post,
  postCategories,
}: {
  post: Post;
  postCategories: CategoryRelationsPosts[] | null;
}) => {
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [checkedCategorys, setCheckedCategorys] = useState<
    CategoryRelationsPosts[] | null
  >(postCategories);

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log(data);
    if (data.title === '') return toast.error('Insira um titulo!');
    if (data.photo_background === '') return toast.error('Insira uma foto!');
    if (data.content === '') return toast.error('Insira o conteudo!');
    if (data.resume === '') return toast.error('Insira um resumo!');

    const object = {
      title: data.title,
      featured: data.featured === true ? 1 : 0,
      photo_background: data.photo_background,
      content: data.content,
      resume: data.resume,
    };

    try {
      await axios.patch(`/api/post/${post.id}`, object);

      toast.success('Post editado!');
      router.push(`/post/${post.id}`);
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      title: post.title,
      content: post.content,
      resume: post.resume,
      photo_background: post.photo_background,
      featured: post.featured,
      selectedCategories: [],
    },
  });

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

  const photo_background = watch('photo_background');
  const featured = watch('featured');

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
    currentCategory,
    checkedCategorys,
    setCheckedCategorys,
    onSubmit,
  };
};
