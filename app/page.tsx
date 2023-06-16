import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import { SkeletonHome } from './components/SkeletonHome/SkeletonHome';
import { FeaturedPost } from './components/featuredPost/FeaturedPost';
import { FeaturedPosts } from './components/featuredPosts/FeaturedPosts';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { PostCard } from './components/postCard/PostCard';

export default async function Home() {
  const posts = await getPosts();
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header currentUser={currentUser} />
      {/* <FeaturedPosts posts={posts} /> */}
      <SkeletonHome />
      {/* <PostCard /> */}
      <Footer />
    </>
  );
}
