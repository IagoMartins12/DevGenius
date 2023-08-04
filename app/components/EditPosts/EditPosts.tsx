'use client';

import ImageUpload from '@/app/components/ImageUpload';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { CategorysForm } from './CategorysForm';
import { Form } from 'react-bootstrap';
import { useEditPosts } from '@/app/hooks/customHooks/useEditPosts';

interface EditPosts {
  post: Post | null;
  postCategories: CategoryRelationsPosts[] | null;
}

export const EditPosts: React.FC<EditPosts> = ({ post, postCategories }) => {
  if (!post) return;

  const {
    checkedCategorys,
    featured,
    handleChange,
    handleChangeResume,
    handleSubmit,
    photo_background,
    register,
    setCheckedCategorys,
    setCustomValue,
    setValue,
    onSubmit,
    watch,
  } = useEditPosts({ post, postCategories });

  const contentPost = watch('content');
  const renderPostContent = () => {
    return { __html: contentPost };
  };
  return (
    <>
      <div className={`flex flex-col sm:px-24 sm:py-6`}>
        <h3 className='sm:mx-6 mt-6 mx-6 font-bold text-3xl '>Editar post</h3>
        <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-8  mx-6 my-6 '>
          <div className='flex flex-col w-full lg:w-4/12 gap-5'>
            <div>
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
            <div className=' hidden sm:flex flex-col gap-3'>
              <span className='text-center text-xl font-bold'>
                Previa do conteudo:
              </span>
              <div
                className='w-full border-2 min-h-[300px] px-4 py-2'
                dangerouslySetInnerHTML={renderPostContent()}
              />
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
                checkedCategorys={checkedCategorys}
                setCheckedCategorys={setCheckedCategorys}
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
                Editar post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
