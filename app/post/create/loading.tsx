import { Footer } from '@/app/components/footer/Footer';
import { SkeletonCreatePost } from '@/app/components/skeletons/SkeletonCreatePost/SkeletonCreatePost';

const Loading = async () => {
  return (
    <>
      <SkeletonCreatePost />
      <Footer />
    </>
  );
};

export default Loading;
