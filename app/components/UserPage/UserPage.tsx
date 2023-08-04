'use client';

import { Post, User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';
import axios from 'axios';
import { useGlobalContext } from '@/app/context/store';
import { toast } from 'react-hot-toast';
import {
  FollowUserFunction,
  UnfollowerUserFunction,
} from '@/app/utils/HelpersFunctions';
import { AccountMenu } from '../AccountPage/AccountMenu';
import { Profile } from '../AccountPage/Profile';
import { LikedPosts } from '../AccountPage/LikedPosts';
import { DeslikedPosts } from '../AccountPage/DeslikedPosts';
import { SavedPosts } from '../AccountPage/SavedPosts';
import { Comments } from '../AccountPage/Comments';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import useUsersModal from '@/app/hooks/modals/useUsersModal';
export interface UserProps {
  userAccount: User;
  allUsers?: User[];
  post?: Post;
  userId?: string;
}
export const UserPage: React.FC<UserProps> = ({ userAccount, allUsers }) => {
  const [isActive, setIsActive] = useState<number>(0);

  const { followersState, currentUserState, setFollowersState } =
    useGlobalContext();

  const { navigateToUrl } = useNavigate();
  const usersModal = useUsersModal();

  const followUser = async () => {
    const response = await axios.post(`/api/follower/${userAccount.id}`);
    FollowUserFunction(followersState, response.data, setFollowersState);
    toast.success('Seguindo');
  };

  const unFollowUser = async () => {
    await axios.delete(`/api/follower/${userAccount.id}`);
    UnfollowerUserFunction(
      followersState,
      currentUserState?.id ?? '',
      userAccount.id,
      setFollowersState,
    );
    toast.success('Usuario removido');
  };

  const IFollow = followersState.some(
    followers =>
      followers.followingId === userAccount?.id &&
      followers.followerId === currentUserState?.id,
  );

  const userFollowing = followersState.filter(
    follow => follow.followerId === userAccount.id,
  );

  const userFollowingIds = userFollowing.map(follower => follower.followingId);

  const usersFollowingUsers = allUsers?.filter(user =>
    userFollowingIds.includes(user.id),
  );

  //Users followers
  const userFollowers = followersState.filter(
    follow => follow.followingId === userAccount.id,
  );

  //Get Users followers
  const userFollowerIds = userFollowers.map(follower => follower.followerId);

  //Get Users from follewers
  const usersFollowersUsers = allUsers?.filter(user =>
    userFollowerIds.includes(user.id),
  );

  if (currentUserState?.id === userAccount.id) {
    navigateToUrl('account');
  }

  return (
    <>
      <div className='flex flex-col w-full sm:w-2/6 lg:w-2/12 items-center justify-start gap-y-12'>
        <div className='flex flex-col gap-y-3 items-center justify-center'>
          <div className='aspect-video w-36 h-36 relative flex cursor-pointer'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={userAccount.image ?? '/user.png'}
              alt='Post'
            />
          </div>
          <div className='flex flex-col'>
            {userAccount.firstName && userAccount.secondName ? (
              <span className='text-xl font-bold'>
                {userAccount.firstName} {userAccount.secondName}
              </span>
            ) : (
              <span className='text-base font-bold'>
                Informação não disponivel
              </span>
            )}
            <span className='text-sm font-semibold text-center'>
              @{userAccount.username}
            </span>
          </div>
          <div className='flex gap-x-2'>
            <span
              className='cursor-pointer'
              onClick={() => {
                usersModal.setNotIsCurrentUser();
                usersModal.setCurrentData(usersFollowersUsers);
                usersModal.onOpen();
              }}
            >
              {userFollowers.length} Seguidores
            </span>
            <span
              className='cursor-pointer'
              onClick={() => {
                usersModal.setNotIsCurrentUser();
                usersModal.setCurrentData(usersFollowingUsers);
                usersModal.onOpen();
              }}
            >
              {userFollowing.length} Seguindo{' '}
            </span>
            {IFollow ? (
              <SlUserUnfollow
                size={22}
                className='cursor-pointer'
                onClick={unFollowUser}
              />
            ) : (
              <SlUserFollow
                size={22}
                className='cursor-pointer'
                onClick={followUser}
              />
            )}
          </div>
        </div>
        <div className='hidden flex-row sm:flex sm:!flex-col w-full sm:w-4/5 gap-3 sm:gap-4 justify-center sm:justify-normal'>
          <AccountMenu isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
      <div className='flex flex-col-reverse justify-start gap-y-12 lg:flex-row w-11/12 mx-auto sm:w-4/6 lg:w-9/12 sm:gap-x-2'>
        <div className='w-full lg:w-9/12 '>
          {isActive === 0 && (
            <Profile currentUser={userAccount} isMyAccount={false} />
          )}
          {isActive === 1 && (
            <LikedPosts currentUser={userAccount} isMyAccount={false} />
          )}
          {isActive === 2 && (
            <DeslikedPosts currentUser={userAccount} isMyAccount={false} />
          )}
          {isActive === 3 && (
            <SavedPosts currentUser={userAccount} isMyAccount={false} />
          )}
          {isActive === 4 && (
            <Comments currentUser={userAccount} isMyAccount={false} />
          )}
        </div>
        <div className='flex flex-col w-full sm:w-11/12 lg:w-3/12 gap-8 sm:gap-0'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col justify-start items-start'>
              <span className='text-lg font-extraligh text-violet-600'>
                Biografia:
              </span>
              {userAccount.bio ? (
                <span className='text-sm sm:text-base font-bold'>
                  {userAccount.bio}
                </span>
              ) : (
                <span className='text-sm sm:text-base font-bold'>
                  Informação não disponivel
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <span className='text-lg font-extraligh text-violet-600'>
                Localização:
              </span>
              {userAccount.city && userAccount.state ? (
                <span className='text-base font-bold'>
                  {userAccount.city}, {userAccount.state}
                </span>
              ) : (
                <span className='text-sm sm:text-base font-bold'>
                  Informação não disponivel
                </span>
              )}
            </div>
          </div>
          <div className='sm:hidden flex flex-row sm:!flex-col w-full sm:w-4/5 gap-3 sm:gap-4 justify-center sm:justify-normal'>
            <AccountMenu isActive={isActive} setIsActive={setIsActive} />
          </div>
        </div>
      </div>
    </>
  );
};
