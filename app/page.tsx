import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import { SkeletonHome } from './components/SkeletonHome/SkeletonHome';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { PostCard } from './components/postCard/PostCard';

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {/* <FeaturedPosts posts={posts} /> */}
      <SkeletonHome />
      {/* <PostCard /> */}
      <Footer />
    </>
  );
}
