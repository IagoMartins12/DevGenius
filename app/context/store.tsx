'use client';

import { Category, Deslike, Favorite, Like, Post, User } from '@prisma/client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextProps {
  categoriesState: Category[];
  setCategoriesState: React.Dispatch<React.SetStateAction<Category[]>>;
  likeState: Like[];
  setLikesState: React.Dispatch<React.SetStateAction<Like[]>>;
  deslikeState: Deslike[];
  setDeslikesState: React.Dispatch<React.SetStateAction<Deslike[]>>;
  favoritesState: Favorite[];
  setFavoritesState: React.Dispatch<React.SetStateAction<Favorite[]>>;
  postsState: Post[];
  setPostsState: React.Dispatch<React.SetStateAction<Post[]>>;
  currentUserState: User | null;
  setCurrentUserState: React.Dispatch<React.SetStateAction<User | null>>;
}

const GlobalContext = createContext<ContextProps>({
  categoriesState: [],
  setCategoriesState: () => {},
  likeState: [],
  setLikesState: () => {},
  deslikeState: [],
  setDeslikesState: () => {},
  favoritesState: [],
  setFavoritesState: () => {},
  postsState: [],
  setPostsState: () => {},
  currentUserState: null,
  setCurrentUserState: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoriesState, setCategoriesState] = useState<Category[]>([]);
  const [likeState, setLikesState] = useState<Like[]>([]);
  const [deslikeState, setDeslikesState] = useState<Deslike[]>([]);
  const [favoritesState, setFavoritesState] = useState<Favorite[]>([]);
  const [postsState, setPostsState] = useState<Post[]>([]);
  const [currentUserState, setCurrentUserState] = useState<User | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        categoriesState,
        setCategoriesState,
        likeState,
        setLikesState,
        deslikeState,
        setDeslikesState,
        favoritesState,
        setFavoritesState,
        postsState,
        setPostsState,
        currentUserState,
        setCurrentUserState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
