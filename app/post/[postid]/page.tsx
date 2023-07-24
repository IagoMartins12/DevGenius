import getAuthor from '@/app/actions/getAuthor';
import { getPostsPerId } from '@/app/actions/getPosts';
import { getRelatedPosts } from '@/app/actions/getRelatedPosts';
import { getAllUsers } from '@/app/actions/getUser';
import { PostPage } from '@/app/components/PostPage/PostPage';
import { RelatedPosts } from '@/app/components/RelatedPosts/RelatedPosts';
import { Footer } from '@/app/components/footer/Footer';
import { CategoryRelationsPosts, Post } from '@prisma/client';

interface Iparams {
  postid: string;
}

export default async function Post({ params }: { params: Iparams }) {
  const post = await getPostsPerId(params.postid);
  const author = await getAuthor();
  const allUsers = await getAllUsers();
  const categoryPosts: CategoryRelationsPosts[] = await getRelatedPosts(
    params.postid,
  );

  return (
    <>
      <PostPage
        post={post}
        author={author}
        allUsers={allUsers}
        categoryPosts={categoryPosts}
      />
    </>
  );
}
