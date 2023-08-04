'use client';

import { Post, User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { Profile } from './Profile';
import { LikedPosts } from './LikedPosts';
import { DeslikedPosts } from './DeslikedPosts';
import { SavedPosts } from './SavedPosts';
import { Comments } from './Comments';
import { AccountMenu } from './AccountMenu';
import { useGlobalContext } from '@/app/context/store';
import useUsersModal from '@/app/hooks/modals/useUsersModal';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';

export interface UserProps {
  currentUser: User;
  allUsers?: User[];
  post?: Post;
  isMyAccount?: boolean;
}
export const AccountPage: React.FC<UserProps> = ({ allUsers }) => {
  const [isActive, setIsActive] = useState<number>(0);

  const { currentUserState } = useGlobalContext();
  const { followersState } = useGlobalContext();
  const { navigateToHome } = useNavigate();
  const usersModal = useUsersModal();

  if (!currentUserState) {
    {
      navigateToHome();
    }
    return;
  }
  //Who I follow
  const myFollowing = followersState.filter(
    follower => follower.followerId === currentUserState.id,
  );

  const myFollowingId = myFollowing.map(follower => follower.followingId);

  //Who I follow - Filtering users based on the myFollowingId
  const myFollowingUsers = allUsers?.filter(user =>
    myFollowingId.includes(user.id),
  );

  //Who Follows me
  const myFollowers = followersState.filter(
    follower => follower.followingId === currentUserState?.id,
  );

  const myFollowersId = myFollowers.map(follower => follower.followerId);

  //Who Follows me - Filtering users based on the myFollowersId
  const myFollowersgUsers = allUsers?.filter(user =>
    myFollowersId.includes(user.id),
  );

  return (
    <>
      <div className='flex flex-col w-full sm:w-2/6 lg:w-2/12 items-center justify-start gap-y-12'>
        <div className='flex flex-col gap-y-3 items-center justify-center'>
          <div className='aspect-video w-36 h-36 relative flex cursor-pointer'>
            <Image
              fill
              className='object-cover rounded-full h-1 w-full '
              src={currentUserState.image ?? '/user.png'}
              alt='Post'
            />
          </div>
          <div className='flex flex-col'>
            {currentUserState.firstName && currentUserState.secondName ? (
              <span className='text-xl font-bold'>
                {currentUserState.firstName} {currentUserState.secondName}
              </span>
            ) : (
              <span className='text-base font-bold'>
                Informação não disponivel
              </span>
            )}
            <span className='text-sm font-semibold text-center'>
              @{currentUserState.username}
            </span>
          </div>
          <div className='flex gap-x-2'>
            <span
              className='cursor-pointer'
              onClick={() => {
                usersModal.setIsCurrentUser();
                usersModal.setRemoveFollowers();
                usersModal.setCurrentData(myFollowersgUsers);
                usersModal.onOpen();
              }}
            >
              {myFollowers.length} Seguidores
            </span>
            <span
              className='cursor-pointer'
              onClick={() => {
                usersModal.setIsCurrentUser();
                usersModal.setNotRemoveFollowers();
                usersModal.setCurrentData(myFollowingUsers);
                usersModal.onOpen();
              }}
            >
              {myFollowing.length} Seguindo
            </span>
          </div>
        </div>
        <div className='hidden flex-row sm:flex sm:!flex-col w-full sm:w-4/5 gap-3 sm:gap-4 justify-center sm:justify-normal'>
          <AccountMenu isActive={isActive} setIsActive={setIsActive} />
        </div>
      </div>
      <div className='flex flex-col-reverse justify-start gap-y-12 lg:flex-row w-11/12 mx-auto sm:w-4/6 lg:w-9/12 sm:gap-x-2'>
        <div className='w-full lg:w-9/12 '>
          {isActive === 0 && <Profile currentUser={currentUserState} />}
          {isActive === 1 && <LikedPosts currentUser={currentUserState} />}
          {isActive === 2 && <DeslikedPosts currentUser={currentUserState} />}
          {isActive === 3 && <SavedPosts currentUser={currentUserState} />}
          {isActive === 4 && <Comments currentUser={currentUserState} />}
        </div>
        <div className='flex flex-col w-full sm:w-11/12 mx-auto lg:w-3/12 gap-8 sm:gap-0'>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col '>
              <span className='text-lg font-extraligh text-violet-600'>
                Biografia:
              </span>
              {currentUserState.bio ? (
                <span className='text-sm sm:text-base font-bold'>
                  {currentUserState.bio}
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
              {currentUserState.city && currentUserState.state ? (
                <span className='text-base font-bold'>
                  {currentUserState.city}, {currentUserState.state}
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
