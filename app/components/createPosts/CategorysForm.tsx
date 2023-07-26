import { useGlobalContext } from '@/app/context/store';
import { useCreatePosts } from '@/app/hooks/customHooks/useCreatePosts';
import { Category } from '@prisma/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IoMdAddCircle, IoMdCloseCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

interface props {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}
export const CategorysForm: React.FC<props> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categoryInputOpen, setCategoryInputOpen] = useState(false);
  const [editCategoryInput, setEditCategoryInput] = useState(false);

  const { categoriesState } = useGlobalContext();
  const {
    register,
    setValue,
    removeCategory,
    createCategory,
    editCategory,
    currentCategory,
    setCurrentCategory,
  } = useCreatePosts();

  const toogleCategoryInputOpen = () => {
    setCategoryInputOpen(prevCategoryInputOpen => !prevCategoryInputOpen);
  };
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const [category_name, category_id] = ev.target.value.split(',');
    const newSelectedCategories = [...selectedCategories];

    if (ev.target.checked) {
      newSelectedCategories.push(category_id);
    } else {
      const index = newSelectedCategories.indexOf(category_id);
      if (index !== -1) {
        newSelectedCategories.splice(index, 1);
      }
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handleChangeEdit = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue('category_edit_name', ev.target.value);
  };

  return (
    <>
      {/* Categorias */}
      <h3 className=' font-bold text-1xl sm:text-2xl'>
        Selecione as categorias:{' '}
      </h3>
      <div className='flex px-2 py-2 border-2 items-center justify-between'>
        <div className='flex px-2 py-2 gap-x-5 flex-wrap '>
          {categoriesState.map((category: Category) => (
            <div className='flex gap-x-1 items-center gap-2' key={category.id}>
              <label className='flex gap-1'>
                <input
                  type='checkbox'
                  value={`${category.category_name},${category.id}`}
                  {...register('selectedCategories')}
                  onChange={handleChange}
                  checked={selectedCategories.includes(category.id)}
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
            className={`sm:w-11/12 w-10/12 px-2 py-2 border-2`}
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
            className={`sm:w-11/12 w-10/12 px-2 py-2 border-2`}
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
