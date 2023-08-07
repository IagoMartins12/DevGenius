import { Footer } from './components/Footer/Footer';
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { getPostCategories } from './actions/getCategories';
import { getAllUsers } from './actions/getUser';
import { Banner } from './components/Banner';
import ClientOnly from './components/ClientOnly';
import Head from 'next/head';

export const metadata = {
  title: 'DevGenius | Iago Martins',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
};

export default async function Home() {
  const categoryPosts = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <>
      <Head>
        <title>DevGenius | Iago Martins</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ClientOnly>
        <Banner />
        <HomeComponent categoriesPost={categoryPosts} allUsers={allUsers} />
        <Footer />
      </ClientOnly>
    </>
  );
}
