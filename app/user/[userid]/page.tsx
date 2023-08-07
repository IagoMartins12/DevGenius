import { getAllUsers, getUserPerId } from '@/app/actions/getUser';
import ClientOnly from '@/app/components/ClientOnly';
import { UserPage } from '@/app/components/UserPage/UserPage';

interface Iparams {
  userid: string;
}

// export const metadata = {
//   title: 'DevGenius | Usuário',
//   description:
//     'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
// };

export default async function User({ params }: { params: Iparams }) {
  const user = await getUserPerId(params.userid);
  const allUsers = await getAllUsers();

  if (!user) {
    return (
      <ClientOnly>
        <div className='text-center font-bold text-xl'>
          <span>Usuario não encontrado</span>
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <UserPage userAccount={user} allUsers={allUsers} />
      </div>
    </ClientOnly>
  );
}
