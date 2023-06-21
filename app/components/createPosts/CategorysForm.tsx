'use client';

import useThemes from '@/app/hooks/useTheme';
import { Category } from '@prisma/client';
import { useState } from 'react';
import {
  IoMdAddCircle,
  IoMdAddCircleOutline,
  IoMdCloseCircleOutline,
  IoMdCloseCircle,
} from 'react-icons/io';
import { MdEdit, MdOutlineEdit } from 'react-icons/md';

interface CategorysProps {
  categories: Category[];
  createCategory: () => void;
  removeCategory: (category_id: string) => void;
  editCategory: () => void;
  register: any;
  setValue: any;
  currentCategory: any;
  setCurrentCategory: (category: Category) => void;
}
export const CategorysForm: React.FC<CategorysProps> = ({
  categories,
  createCategory,
  editCategory,
  removeCategory,
  register,
  setValue,
  currentCategory,
  setCurrentCategory,
}) => {
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [editCategoryInput, setEditCategoryInput] = useState(false);

  const toogleCategoryInputOpen = () => {
    setCategoryInputOpen(prevCategoryInputOpen => !prevCategoryInputOpen);
  };

  const handleChange = (ev: { target: { value: any } }) => {
    const [category_name, category_id] = ev.target.value.split(',');
    setValue('category_name', category_name);
    setValue('category_id', category_id);
  };
  const handleChangeEdit = (ev: { target: { value: any } }) => {
    setValue('category_edit_name', ev.target.value);
  };

  const theme = useThemes();
  const themes: any = theme.theme;

  return (
    <>
      {/* Categorias */}
      <h3 className=' font-bold text-1xl sm:text-2xl'>
        Selecione as categorias:{' '}
      </h3>
      <div className='flex px-2 py-2 border-2 items-center justify-between '>
        <div className='flex px-2 py-2 gap-x-5 flex-wrap '>
          {categories.map((category: Category) => (
            <div className='flex gap-x-1 items-center gap-2' key={category.id}>
              <label className='flex gap-1'>
                <input
                  type='checkbox'
                  name='categoryRadio'
                  value={`${category.category_name},${category.id}`}
                  {...register('selectedCategories')}
                />
                {category.category_name}
              </label>

              <div className='flex '>
                <MdEdit
                  size={15}
                  className='cursor-pointer'
                  onClick={() => {
                    setCurrentCategory(category);
                    categoryInputOpen ? setCategoryInputOpen(false) : null;
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
              editCategoryInput ? setEditCategoryInput(false) : null;
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
            className={`sm:w-11/12 w-10/12 px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
            {...register('category_name')}
            onChange={ev => {
              handleChange(ev);
            }}
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
            className={`sm:w-11/12 w-10/12 px-2 py-2 border-2
                  ${themes === 'light' ? 'input-light' : 'input-dark'}`}
            placeholder={currentCategory?.category_name}
            {...register('category_edit_name')}
            onChange={ev => {
              handleChangeEdit(ev);
            }}
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
    </>
  );
};
