import { Footer } from '../components/footer/Footer';
import { SkeletonHome } from '../components/skeletons/SkeletonHome/SkeletonHome';

const Loading = async () => {
  return (
    <>
      <SkeletonHome />
      <Footer />
    </>
  );
};

export default Loading;
