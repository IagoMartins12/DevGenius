import './globals.css';
import { Nunito } from 'next/font/google';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog | Iago martins',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias referente a MERN!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body
        className={font.className}
        style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}
      >
        {children}
      </body>
    </html>
  );
}
