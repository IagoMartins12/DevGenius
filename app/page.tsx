import { Footer } from './components/footer/Footer';
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { getPostCategories } from './actions/getCategories';
import { getAllUsers } from './actions/getUser';

export default async function Home() {
  const categoryPosts = await getPostCategories();
  const allUsers = await getAllUsers();
  return (
    <>
      <HomeComponent categoriesPost={categoryPosts} allUsers={allUsers} />
      <Footer />
    </>
  );
}
