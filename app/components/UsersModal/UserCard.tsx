import { useGlobalContext } from '@/app/context/store';
import { useNavigate } from '@/app/hooks/customHooks/useNavigate';
import useUsersModal from '@/app/hooks/modals/useUsersModal';
import { UnfollowerUserFunction } from '@/app/utils/HelpersFunctions';
import { User } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface UserCardProp {
  user: User;
}
export const UserCard: React.FC<UserCardProp> = ({ user }) => {
  const { followersState, currentUserState, setFollowersState } =
    useGlobalContext();
  const { navigateToUrl } = useNavigate();
  const userModal = useUsersModal();

  const unFollowUser = async () => {
    await axios.delete(`/api/follower/${user.id}`);
    UnfollowerUserFunction(
      followersState,
      currentUserState?.id ?? '',
      user.id,
      setFollowersState,
    );

    toast.success('Usuario removido');
  };

  return (
    <div
      className={`flex p-2 rounded-md cursor-pointer`}
      onClick={() => {
        userModal.onClose();
        navigateToUrl('user', user.id);
      }}
    >
      <div className='w-2/12 flex items-center justify-center'>
        <div className='aspect-video w-10 h-10 relative'>
          <Image
            fill
            className='object-cover rounded-full h-1 w-full '
            src={user?.image ?? '/user.png'}
            alt='Post'
          />
        </div>
      </div>
      <div className='flex w-6/12 flex-col'>
        <span className='font-semibold text-base'>@{user.username}</span>
        <span className='font-medium text-sm'>
          {user.firstName && user.secondName ? (
            <>
              {user.firstName} {user.secondName}
            </>
          ) : (
            'Usuario'
          )}
        </span>
      </div>
      <div className='w-4/12 flex justify-center items-center'>
        {userModal.isCurrentUser ? (
          userModal.removeFollowers ? (
            <button
              className='text-center self-center px-3 py-1 bg-gray-300 rounded-md'
              onClick={ev => {
                ev.stopPropagation();
                unFollowUser();
              }}
            >
              Remover
            </button>
          ) : null
        ) : null}
      </div>
    </div>
  );
};
