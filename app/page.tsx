import { CategoryRelationsPosts } from '@prisma/client';
import { Footer } from './components/footer/Footer';
import { PostCard } from './components/postCard/PostCard';
import { getPostCategories } from './actions/getCategories';
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
