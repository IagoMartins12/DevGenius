import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import getCurrentUser from './actions/getCurrentUser';
import { Header } from './components/header/Header';
import getCategories from './actions/getCategories';
import Head from 'next/head';
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

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'DevGenius | Iago martins',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias referente a MERN!',
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
        <link
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
      </Head>
      <body
        className={font.className}
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
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
