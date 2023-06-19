import { Footer } from './components/footer/Footer';
import getCurrentUser from './actions/getCurrentUser';
import { SkeletonHome } from './components/SkeletonHome/SkeletonHome';

const Loading = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <SkeletonHome />
      <Footer />
    </>
  );
};

export default Loading;
