import getCurrentUser from '../actions/getCurrentUser';
import { UserPage } from '../components/AccountPage/UserPage';

export default async function Account() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <div>Não autorizado</div>;

  return (
    <>
      <div className='flex w-11/12 mx-auto py-10'>
        <UserPage currentUser={currentUser} />
      </div>
    </>
  );
}
