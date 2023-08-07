import { getCategoriesPerId } from '@/app/actions/getCategories';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostsPerId } from '@/app/actions/getPosts';
import ClientOnly from '@/app/components/ClientOnly';
import { EditPosts } from '@/app/components/EditPosts/EditPosts';
import { Footer } from '@/app/components/Footer/Footer';
import NotAuth from '@/app/components/NotAuth';

interface Iparams {
  postid: string;
}

// export const metadata = {
//   title: 'DevGenius | Editar',
//   description:
//     'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
// };

export default async function EditPost({ params }: { params: Iparams }) {
  const post = await getPostsPerId(params.postid);
  const postCategories = await getCategoriesPerId(params.postid);

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 1) {
    return (
      <ClientOnly>
        <NotAuth />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EditPosts post={post} postCategories={postCategories} />
      <Footer />
    </ClientOnly>
  );
}
