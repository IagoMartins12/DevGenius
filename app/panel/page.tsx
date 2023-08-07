import getCurrentUser from '../actions/getCurrentUser';
import { getAllUsers } from '../actions/getUser';
import ClientOnly from '../components/ClientOnly';
import NotAuth from '../components/NotAuth';
import PanelUsers from '../components/PanelUsers/PanelUsers';

// export const metadata = {
//   title: 'DevGenius | Painel',
//   description:
//     'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
// };

export default async function Panel() {
  const allUser = await getAllUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 1) {
    return (
      <ClientOnly>
        <NotAuth />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PanelUsers allUsers={allUser} />
    </ClientOnly>
  );
}
