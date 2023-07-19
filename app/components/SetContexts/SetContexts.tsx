'use client';
import { useGlobalContext } from '@/app/context/store';
import { Category, Deslike, Favorite, Like, Post, User } from '@prisma/client';
import { useEffect } from 'react';

interface IProps {
  categories: Category[];
  likes: Like[];
  deslikes: Deslike[];
  favorites: Favorite[];
  posts: Post[];
  user: User | null;
}
export const SetContexts: React.FC<IProps> = ({
  categories,
  likes,
  deslikes,
  favorites,
  posts,
  user,
}) => {
  const {
    setCategoriesState,
    setDeslikesState,
    setFavoritesState,
    setPostsState,
    setLikesState,
    setCurrentUserState,
  } = useGlobalContext();

  useEffect(() => {
    setCategoriesState(categories);
    setDeslikesState(deslikes);
    setLikesState(likes);
    setFavoritesState(favorites);
    setPostsState(posts);
    setCurrentUserState(user);
  }, []);

  return <div></div>;
};
