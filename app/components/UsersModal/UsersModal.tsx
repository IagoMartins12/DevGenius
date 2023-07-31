import useUsersModal from '@/app/hooks/modals/useUsersModal';
import { UserCard } from './UserCard';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from '@/app/context/store';
import { UnfollowerUserFunction } from '@/app/utils/HelpersFunctions';
import { ChangeEvent, useState } from 'react';

export const UsersModal = ({}: {}) => {
  const [searchValue, setSearchValue] = useState('');

  const userModal = useUsersModal();

  const { followersState, currentUserState, setFollowersState } =
    useGlobalContext();

  const isOpen = userModal.isOpen;
  const userData = userModal.currentData;

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <div
      className={`usersModal flex-col z-10 px-4 py-3 h-96 relative gap-y-8 
        ${isOpen ? 'flex' : 'hidden'} bg-color`}
    >
      <div className=''>
        <IoCloseOutline
          className='absolute right-3 top-3 cursor-pointer'
          onClick={() => userModal.onClose()}
          size={30}
        />
        <div className='w-full flex items-center justify-center'>
          <span className='font-semibold text-base'>
            {userModal.removeFollowers ? 'Seguindo' : 'Seguidores'}
          </span>
        </div>
        <div className='container-input mt-8'>
          <input
            type='text'
            placeholder='Pesquisar usuarios'
            name='text'
            className='input'
            value={searchValue} // 2. Use o valor do estado para o valor do input.
            onChange={handleSearchInputChange} // 2. Adicione o evento de alteração do input.
          />
          <svg
            fill='#000000'
            width='20px'
            height='20px'
            viewBox='0 0 1920 1920'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z'
              fill-rule='evenodd'
            ></path>
          </svg>
        </div>
      </div>
      <div
        className={`h-3/4 flex flex-col gap-y-5 ${
          userData && userData.length > 4 ? 'overflow-y-scroll' : ''
        }`}
      >
        {userData !== undefined && userData?.length > 0 ? (
          userData
            ?.filter(
              user =>
                user.username
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                user.firstName
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                user.secondName
                  ?.toLowerCase()
                  .includes(searchValue.toLowerCase()),
            )
            .map(user => {
              return user ? (
                <UserCard user={user} />
              ) : (
                <div className='flex items-center justify-center'>
                  <span className='font-semibold text-xl text-center'>
                    Sem usuarios para exibir
                  </span>
                </div>
              );
            })
        ) : (
          <div className='flex items-center justify-center'>
            <span className='font-semibold text-xl text-center'>
              Sem usuarios para exibir
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
