import getAuthor from '@/app/actions/getAuthor';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostsPerId } from '@/app/actions/getPosts';
import { getRelatedPosts } from '@/app/actions/getRelatedPosts';
import { getAllUsers } from '@/app/actions/getUser';
import { PostPage } from '@/app/components/PostPage/PostPage';
import { Footer } from '@/app/components/Footer/Footer';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import ClientOnly from '@/app/components/ClientOnly';
import Head from 'next/head';

interface Iparams {
  postid: string;
}

export const metadata = {
  title: 'DevGenius | Post',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
};

export default async function Post({ params }: { params: Iparams }) {
  const post = await getPostsPerId(params.postid);
  const author = await getAuthor();
  const allUsers = await getAllUsers();
  const categoryPosts: CategoryRelationsPosts[] = await getRelatedPosts(
    params.postid,
  );
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <Head>
        <title>{post?.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='keywords' content='some contents' />
        <meta name='description' content={post?.resume ?? 'Post do blog'} />
      </Head>
      <PostPage
        post={post}
        author={author}
        allUsers={allUsers}
        categoryPosts={categoryPosts}
        currentUser={currentUser}
      />
      <Footer />
    </ClientOnly>
  );
}
