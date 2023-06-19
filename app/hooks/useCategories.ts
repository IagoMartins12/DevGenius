import { create } from 'zustand';
import getCategories from '../actions/getCategories';
import { Category } from '@prisma/client';

type ActionProps = {
  getCategories?: () => void;
  addCategories?: (category: Category) => void;
  removeCategories?: (category_id: number) => void;
};

type StoreProps = {
  state: {
    categories: Category[];
  };
  actions: ActionProps;
};

const useCategoriesStore = create<StoreProps>(set => ({
  state: {
    categories: [],
  },
  actions: {
    getCategories: async () => {
      try {
        const categoriesData = await getCategories();
        const categories = categoriesData;
        set(prevState => ({ ...prevState, state: { categories } }));
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    },
  },
}));

export default useCategoriesStore;
