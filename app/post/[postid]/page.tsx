import {
  getDeslikedPost,
  getFavoritedPosts,
  getLikedPosts,
} from '@/app/actions/getActionsOnPosts';
import getAuthor from '@/app/actions/getAuthor';
import getCategories, { getPostCategories } from '@/app/actions/getCategories';
import getComments, { getCommentsPerID } from '@/app/actions/getComments';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPosts, { getPostsPerId } from '@/app/actions/getPosts';
import { getRelatedPosts } from '@/app/actions/getRelatedPosts';
import { getAllUsers } from '@/app/actions/getUser';
import { PostPage } from '@/app/components/PostPage/PostPage';
import { Footer } from '@/app/components/footer/Footer';
import { CategoryRelationsPosts, Comment, Post } from '@prisma/client';

interface Iparams {
  postid: string;
}

export default async function Post({ params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();
  const post = await getPostsPerId(params.postid);
  const author = await getAuthor();
  const comments: Comment[] = await getCommentsPerID(params.postid);
  const allUsers = await getAllUsers();
  const categories = await getCategories();
  const categoryPosts: CategoryRelationsPosts[] = await getRelatedPosts(
    params.postid,
  );
  const favorites = await getFavoritedPosts();
  const deslikes = await getDeslikedPost();
  const liked = await getLikedPosts();

  return (
    <>
      <PostPage
        post={post}
        posts={posts}
        user={currentUser}
        author={author}
        comments={comments}
        allUsers={allUsers}
        categories={categories}
        categoryPosts={categoryPosts}
        liked={liked}
      />
      <Footer />
    </>
  );
}
