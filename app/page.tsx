import {
  Category,
  CategoryRelationsPosts,
  Favorite,
  Post,
  User,
} from '@prisma/client';
import getPosts from './actions/getPosts';
import { Footer } from './components/footer/Footer';
import { PostCard } from './components/postCard/PostCard';
import getCategories, { getPostCategories } from './actions/getCategories';
import { getFavoritedPosts } from './actions/getActionsOnPosts';
import getCurrentUser from './actions/getCurrentUser';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';

export default async function Home() {
  const posts: Post[] = await getPosts();
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const categories: Category[] = await getCategories();
  const favorites: Favorite[] = await getFavoritedPosts();
  const currentUser: User | null = await getCurrentUser();

  return (
    <>
      <FeaturedPosts posts={posts} />
      <PostCard
        posts={posts}
        categoriesPost={categoryPosts}
        categories={categories}
        currentUser={currentUser}
        favorites={favorites}
      />
      <Footer />
    </>
  );
}
