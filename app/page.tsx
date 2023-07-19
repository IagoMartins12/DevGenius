import { CategoryRelationsPosts, Post, User } from '@prisma/client';
import getPosts from './actions/getPosts';
import { Footer } from './components/footer/Footer';
import { PostCard } from './components/postCard/PostCard';
import { getPostCategories } from './actions/getCategories';
import getCurrentUser from './actions/getCurrentUser';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';

export default async function Home() {
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();

  return (
    <>
      <FeaturedPosts />
      <PostCard categoriesPost={categoryPosts} />
      <Footer />
    </>
  );
}
