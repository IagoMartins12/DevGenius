import Head from 'next/head';
import getCurrentUser from '../actions/getCurrentUser';
import { getAllUsers } from '../actions/getUser';
import { AccountPage } from '../components/AccountPage/AccountPage';
import ClientOnly from '../components/ClientOnly';
import { Footer } from '../components/Footer/Footer';
import UserNotAuth from '../components/UserNotAuth';

export const metadata = {
  title: 'DevGenius | Conta',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
};

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
      <Head>
        <title>Minha conta</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='keywords' content='some contents' />
      </Head>
      <div className='flex flex-col sm:flex-row w-full lg:w-11/12 mx-auto py-10 gap-8 sm:gap-0'>
        <AccountPage currentUser={currentUser} allUsers={allUsers} />
      </div>
      <Footer />
    </ClientOnly>
  );
}
