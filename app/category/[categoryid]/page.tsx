import { getFavoritedPosts } from '@/app/actions/getActionsOnPosts';
import getCategories, {
  getPostCategories,
  getPostsByCategory,
} from '@/app/actions/getCategories';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { CategoryCard } from '@/app/components/CategoryCard/CategoryCard';
import {
  Category,
  CategoryRelationsPosts,
  Favorite,
  User,
} from '@prisma/client';

interface Iparams {
  categoryid: string;
}

export default async function CategoryPage({ params }: { params: Iparams }) {
  const { categoryid } = params;

  const posts = await getPostsByCategory(categoryid);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();

  return (
    <div>
      <CategoryCard
        posts={posts}
        categoriesPost={categoryPosts}
        categoryId={categoryid}
      />
    </div>
  );
}
