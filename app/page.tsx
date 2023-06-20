import { Category, CategoryRelationsPosts, Post } from '@prisma/client';
import getPosts from './actions/getPosts';
import { SkeletonHome } from './components/skeletons/SkeletonHome/SkeletonHome';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';
import { Footer } from './components/footer/Footer';
import { PostCard } from './components/postCard/PostCard';
import getCategories, { getPostCategories } from './actions/getCategories';

export default async function Home() {
  const posts: Post[] = await getPosts();
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const categories: Category[] = await getCategories();
  return (
    <>
      {/* <FeaturedPosts posts={posts} /> */}
      <SkeletonHome />
      <PostCard
        posts={posts}
        categoriesPost={categoryPosts}
        categories={categories}
      />
      <Footer />
    </>
  );
}
