import getAuthor from '@/app/actions/getAuthor';
import getComments, { getCommentsPerID } from '@/app/actions/getComments';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostsPerId } from '@/app/actions/getPosts';
import { getAllUsers } from '@/app/actions/getUser';
import { PostPage } from '@/app/components/PostPage/PostPage';
import { Comment, Post } from '@prisma/client';

interface Iparams {
  postid: string;
}

export default async function Post({ params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  const post = await getPostsPerId(params.postid);
  const author = await getAuthor();
  const comments: Comment[] = await getCommentsPerID(params.postid);
  const allUsers = await getAllUsers();

  return (
    <>
      <PostPage
        post={post}
        user={currentUser}
        author={author}
        comments={comments}
        allUsers={allUsers}
      />
    </>
  );
}
