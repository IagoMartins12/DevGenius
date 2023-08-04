import { Footer } from '@/app/components/Footer/Footer';
import { SkeletonCreatePost } from '@/app/components/Skeletons/SkeletonCreatePost/SkeletonCreatePost';

const Loading = async () => {
  return (
    <>
      <SkeletonCreatePost />
      <Footer />
    </>
  );
};

export default Loading;
