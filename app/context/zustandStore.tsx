import { create } from 'zustand';
import { Category, Deslike, Favorite, Like, Post, User } from '@prisma/client';

interface State {
  categoriesState: Category[];
  likeState: Like[];
  deslikeState: Deslike[];
  favoritesState: Favorite[];
  postsState: Post[];
  currentUserState: User | null;
}

interface Actions {
  setCategoriesState: (categories: Category[]) => void;
  setLikesState: (likes: Like[]) => void;
  setDeslikesState: (deslikes: Deslike[]) => void;
  setFavoritesState: (favorites: Favorite[]) => void;
  setPostsState: (posts: Post[]) => void;
  setCurrentUserState: (user: User | null) => void;
}

const useStoreZustand = create<State & Actions>(set => ({
  categoriesState: [],
  likeState: [],
  deslikeState: [],
  favoritesState: [],
  postsState: [],
  currentUserState: null,
  setCategoriesState: categories => set({ categoriesState: categories }),
  setLikesState: likes => set({ likeState: likes }),
  setDeslikesState: deslikes => set({ deslikeState: deslikes }),
  setFavoritesState: favorites => set({ favoritesState: favorites }),
  setPostsState: posts => set({ postsState: posts }),
  setCurrentUserState: user => set({ currentUserState: user }),
}));

export default useStoreZustand;
