import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import { Header } from './components/header/Header';
import ModalsProvider from './providers/ModalsProvider';
import ToasterProvider from './providers/ToasterProvider';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const currentPosts = await getPosts();

  return (
    <div style={{ minHeight: '100vh', margin: '0', padding: '0' }}>
      <Header currentUser={currentUser} />
      <ToasterProvider />
      <ModalsProvider />
      <div>Hello world</div>
    </div>
  );
}
