import { Footer } from '../components/footer/Footer';
import { SkeletonSettings } from '../components/skeletons/SkeletonSettings/SkeletonSettings';

const Loading = async () => {
  return (
    <>
      <SkeletonSettings />
      <Footer />
    </>
  );
};

export default Loading;
