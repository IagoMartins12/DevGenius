import { getAllUsers, getUserPerId } from '@/app/actions/getUser';
import { UserPage } from '@/app/components/UserPage/UserPage';

interface Iparams {
  userid: string;
}

export default async function User({ params }: { params: Iparams }) {
  const user = await getUserPerId(params.userid);
  const allUsers = await getAllUsers();

  if (!user) return <div>Usuario não encontrado</div>;

  return (
    <>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <UserPage userAccount={user} allUsers={allUsers} />
      </div>
    </>
  );
}
