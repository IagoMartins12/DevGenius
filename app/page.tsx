import { Footer } from './components/footer/Footer';
import { PostCard } from './components/postCard/PostCard';
import { getPostCategories } from './actions/getCategories';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';
import { getAllUsers } from './actions/getUser';

export default async function Home() {
  const categoryPosts = await getPostCategories();
  const allUsers = await getAllUsers();
  return (
    <>
      <FeaturedPosts />
      <PostCard categoriesPost={categoryPosts} allUsers={allUsers} />
      <Footer />
    </>
  );
}
