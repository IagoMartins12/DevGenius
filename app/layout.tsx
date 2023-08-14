import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import getCurrentUser from './actions/getCurrentUser';
import { Header } from './components/Header/Header';
import getCategories from './actions/getCategories';
import { GlobalContextProvider } from './context/store';
import {
  getDeslikedPost,
  getFavoritedPosts,
  getLikedPosts,
} from './actions/getActionsOnPosts';
import getPosts from './actions/getPosts';
import { SetContexts } from './components/SetContexts/SetContexts';
import getComments from './actions/getComments';
import ThemeProv from './providers/ThemeProvider';
import { getAllFollowers } from './actions/getFollowers';
import { ModalsBackground } from './components/ModalsBackground/ModalsBackground';
import Head from 'next/head';

const font = Nunito({ subsets: ['latin'] });
export const metadata = {
  title: 'DevGenius | Iago Martins',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  const likes = await getLikedPosts();
  const deslikes = await getDeslikedPost();
  const favorites = await getFavoritedPosts();
  const posts = await getPosts();
  const comments = await getComments();
  const followers = await getAllFollowers();

  return (
    <html lang='pt-br'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
      <body className={`${font.className} m-o p-0 box-content`}>
        <ThemeProv>
          <GlobalContextProvider>
            <Header />
            <SetContexts
              categories={categories}
              deslikes={deslikes}
              favorites={favorites}
              likes={likes}
              posts={posts}
              user={currentUser}
              comments={comments}
              followers={followers}
            />
            <ToasterProvider />
            <ModalsProvider />
            <ModalsBackground />
            {children}
          </GlobalContextProvider>
        </ThemeProv>
      </body>
    </html>
  );
}
