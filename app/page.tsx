import { Footer } from './components/Footer/Footer';
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { getPostCategories } from './actions/getCategories';
import { getAllUsers } from './actions/getUser';
import { Banner } from './components/Banner';
import ClientOnly from './components/ClientOnly';

export default async function Home() {
  const categoryPosts = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <ClientOnly>
      <Banner />
      <HomeComponent categoriesPost={categoryPosts} allUsers={allUsers} />
      <Footer />
    </ClientOnly>
  );
}
