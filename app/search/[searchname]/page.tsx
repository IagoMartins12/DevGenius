import { getPostCategories } from '@/app/actions/getCategories';
import { getPostBySearch } from '@/app/actions/getPosts';
import { getAllUsers } from '@/app/actions/getUser';
import ClientOnly from '@/app/components/ClientOnly';
import { Footer } from '@/app/components/Footer/Footer';
import { SearchPageComponent } from '@/app/components/SearchPageComponent/SearchPageComponent';
import { CategoryRelationsPosts } from '@prisma/client';
import Head from 'next/head';

interface Iparams {
  searchname: string;
}

// export const metadata = {
//   title: 'DevGenius | Pesquisar',
//   description:
//     'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
// };

export default async function SearchPage({ params }: { params: Iparams }) {
  const { searchname } = params;

  const posts = await getPostBySearch(searchname.toLowerCase());
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <ClientOnly>
      <SearchPageComponent
        posts={posts}
        categoriesPost={categoryPosts}
        allUsers={allUsers}
      />
      <Footer />
    </ClientOnly>
  );
}
