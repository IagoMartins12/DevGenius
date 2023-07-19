import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import getCurrentUser from './actions/getCurrentUser';
import { Header } from './components/header/Header';
import getCategories from './actions/getCategories';
import Head from 'next/head';
import { GlobalContextProvider } from './context/store';

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
        <GlobalContextProvider>
          <Header currentUser={currentUser} categories={categories} />
          <ToasterProvider />
          <ModalsProvider />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
