import { Deslike, Favorite, Like, User } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

export const RemoveItem = (
  item: Like[] | Deslike[] | Favorite[],
  updateItemArray: Dispatch<SetStateAction<Like[] | Deslike[] | Favorite[]>>,
  currentUser: User,
  postId: string,
) => {
  const updatedItems = item.filter(
    item => !(item.userId === currentUser.id && item.postId === postId),
  );
  updateItemArray(updatedItems);
};

export const AddItem = (
  itens: Like[] | Deslike[] | Favorite[],
  newItem: any,
  updateItemArray: Dispatch<SetStateAction<Like[] | Deslike[] | Favorite[]>>,
) => {
  const updatedItems = [...itens, newItem];
  updateItemArray(updatedItems);
};
