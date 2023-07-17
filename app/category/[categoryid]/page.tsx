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
  const categories: Category[] = await getCategories();
  const favorites: Favorite[] = await getFavoritedPosts();
  const currentUser: User | null = await getCurrentUser();

  const categoryName = categories.find(category => category.id === categoryid);

  return (
    <div>
      <CategoryCard
        posts={posts}
        categories={categories}
        favorites={favorites}
        categoriesPost={categoryPosts}
        currentUser={currentUser}
        categoryName={categoryName?.category_name}
      />
    </div>
  );
}
