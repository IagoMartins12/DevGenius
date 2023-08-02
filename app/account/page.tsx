import getCurrentUser from '../actions/getCurrentUser';
import { getAllUsers } from '../actions/getUser';
import { AccountPage } from '../components/AccountPage/AccountPage';

export default async function Account() {
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();

  return (
    <>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <AccountPage currentUser={currentUser} allUsers={allUsers} />
      </div>
    </>
  );
}
