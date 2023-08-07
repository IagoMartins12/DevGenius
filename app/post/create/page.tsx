import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import { CreatePosts } from '@/app/components/CreatePosts/CreatePosts';
import { Footer } from '@/app/components/Footer/Footer';
import NotAuth from '@/app/components/NotAuth';

export const metadata = {
  title: 'DevGenius | Criar post',
  description: 'Criar posts para o blog',
};

export default async function Create() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 1) {
    return (
      <ClientOnly>
        <NotAuth />
      </ClientOnly>
    );
  }

  return (
    <>
      <ClientOnly>
        <CreatePosts />
        <Footer />
      </ClientOnly>
    </>
  );
}
