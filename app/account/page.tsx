import getCurrentUser from '../actions/getCurrentUser';
import { getAllUsers } from '../actions/getUser';
import { AccountPage } from '../components/AccountPage/AccountPage';
import ClientOnly from '../components/ClientOnly';
import UserNotAuth from '../components/UserNotAuth';

export default async function Account() {
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();

  if (!currentUser) {
    return (
      <ClientOnly>
        <UserNotAuth />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <AccountPage currentUser={currentUser} allUsers={allUsers} />
      </div>
    </ClientOnly>
  );
}
