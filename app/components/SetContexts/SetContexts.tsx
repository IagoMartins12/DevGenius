'use client';

import { useGlobalContext } from '@/app/context/store';
import useStoreZustand from '@/app/context/zustandStore';
import {
  Category,
  Comment,
  Deslike,
  Favorite,
  Like,
  Post,
  User,
} from '@prisma/client';
import { useEffect } from 'react';

interface IProps {
  categories: Category[];
  likes: Like[];
  deslikes: Deslike[];
  favorites: Favorite[];
  posts: Post[];
  user: User | null;
  comments: Comment[];
}
export const SetContexts: React.FC<IProps> = ({
  categories,
  likes,
  deslikes,
  favorites,
  posts,
  user,
  comments,
}) => {
  const {
    setCategoriesState,
    setDeslikesState,
    setFavoritesState,
    setPostsState,
    setLikesState,
    setCurrentUserState,
    setCommentsState,
  } = useGlobalContext();

  useEffect(() => {
    setCategoriesState(categories);
    setDeslikesState(deslikes);
    setLikesState(likes);
    setFavoritesState(favorites);
    setPostsState(posts);
    setCurrentUserState(user);
    setCommentsState(comments);
  }, []);

  return <div></div>;
};
