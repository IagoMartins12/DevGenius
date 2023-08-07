import {
  getPostCategories,
  getPostsByCategory,
} from '@/app/actions/getCategories';
import { getAllUsers } from '@/app/actions/getUser';
import { CategoryPageComponent } from '@/app/components/CategoryPageComponent/CategoryPageComponent';
import ClientOnly from '@/app/components/ClientOnly';
import { Footer } from '@/app/components/Footer/Footer';
import { CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  categoryid: string;
}

export const metadata = {
  title: 'DevGenius | Categorias',
  description:
    'Blog criado para lhe manter atualizado das mais novas tecnologias do mercado!',
};

export default async function CategoryPage({ params }: { params: Iparams }) {
  const { categoryid } = params;

  const posts = await getPostsByCategory(categoryid);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <ClientOnly>
      <CategoryPageComponent
        posts={posts}
        categoriesPost={categoryPosts}
        categoryId={categoryid}
        allUsers={allUsers}
      />
      <Footer />
    </ClientOnly>
  );
}
