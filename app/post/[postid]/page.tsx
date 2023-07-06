import getAuthor from '@/app/actions/getAuthor';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostsPerId } from '@/app/actions/getPosts';
import { PostPage } from '@/app/components/PostPage/PostPage';

interface Iparams {
  postid: string;
}

export default async function Post({ params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  const post = await getPostsPerId(params.postid);
  const author = await getAuthor();

  return (
    <>
      <PostPage post={post} user={currentUser} author={author} />
    </>
  );
}
