'use client';

import { Category } from '@prisma/client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextProps {
  categoriesState: Category[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const GlobalContext = createContext<ContextProps>({
  categoriesState: [],
  setCategories: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoriesState, setCategories] = useState<Category[]>([]);

  return (
    <GlobalContext.Provider value={{ categoriesState, setCategories }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
