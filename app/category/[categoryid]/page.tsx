import {
  getPostCategories,
  getPostsByCategory,
} from '@/app/actions/getCategories';
import { getAllUsers } from '@/app/actions/getUser';
import { CategoryPageComponent } from '@/app/components/CategoryPageComponent/CategoryPageComponent';
import { CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  categoryid: string;
}

export default async function CategoryPage({ params }: { params: Iparams }) {
  const { categoryid } = params;

  const posts = await getPostsByCategory(categoryid);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <div>
      <CategoryPageComponent
        posts={posts}
        categoriesPost={categoryPosts}
        categoryId={categoryid}
        allUsers={allUsers}
      />
    </div>
  );
}
