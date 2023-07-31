import { UserInfoTexts } from './UserInfoTexts';
import { UserProps } from './UserPage';

export const Profile: React.FC<UserProps> = ({ currentUser }) => {
  return (
    <div className='flex flex-col w-full sm:w-11/12 gap-y-8 mx-auto items-center justify-center'>
      <div className='flex flex-col gap-y-8 w-full'>
        <h1 className='text-2xl font-bold text-center '>
          Informações do usuario:
        </h1>
        <div className='flex flex-col gap-y-3'>
          <UserInfoTexts title='Nome de usuario:' info={currentUser.username} />
          <UserInfoTexts title='Email:' info={currentUser.email} />
          <UserInfoTexts
            title='Data de aniversario:'
            info={currentUser.birthday}
          />
          <UserInfoTexts title='Gênero:' info={currentUser.gender} />
        </div>
      </div>

      <div className='flex flex-col gap-y-8 w-full '>
        <h1 className='text-2xl font-bold text-center '>Redes sociais:</h1>
        <div className='flex flex-col gap-y-3'>
          <UserInfoTexts title='Website:' info={currentUser.website} />
          <UserInfoTexts title='Github:' info={currentUser.github} />
          <UserInfoTexts title='Instagram:' info={currentUser.instagram} />
          <UserInfoTexts title='Facebook:' info={currentUser.facebook} />
          <UserInfoTexts title='Twitter:' info={currentUser.twitter} />
          <UserInfoTexts title='Youtube:' info={currentUser.youtube} />
        </div>
      </div>
    </div>
  );
};
