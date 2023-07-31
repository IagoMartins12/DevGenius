import { Deslike, Favorite, Followers, Like, User } from '@prisma/client';
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

export const FollowUserFunction = (
  followers: Followers[],
  newFollow: any,
  updateFollowers: Dispatch<SetStateAction<Followers[]>>,
) => {
  const updatedItems = [...followers, newFollow];
  updateFollowers(updatedItems);
};

export const UnfollowerUserFunction = (
  followers: Followers[],
  currentUserId: string,
  unfollowUserId: string,
  updateFollowers: Dispatch<SetStateAction<Followers[]>>,
) => {
  console.log('seguidores', followers);
  console.log('id do user', unfollowUserId);
  console.log('meu id', currentUserId);

  const unfollowed = followers.find(
    followers =>
      followers.followerId === currentUserId &&
      followers.followingId === unfollowUserId,
  );
  const updatedItems = followers.filter(
    follower => follower.id !== unfollowed?.id,
  );

  updateFollowers(updatedItems);
};
