import getCurrentUser from '../actions/getCurrentUser';
import { AccountPage } from '../components/AccountPage/AccountPage';

export default async function Account() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <div>Não autorizado</div>;

  return (
    <>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <AccountPage currentUser={currentUser} />
      </div>
    </>
  );
}
