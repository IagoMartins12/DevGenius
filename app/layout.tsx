import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import getCurrentUser from './actions/getCurrentUser';
import { Header } from './components/header/Header';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog | Iago martins',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias referente a MERN!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body
        className={font.className}
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Header currentUser={currentUser} />
        <ToasterProvider />
        <ModalsProvider />
        {children}
      </body>
    </html>
  );
}
