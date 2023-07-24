import {
  getPostCategories,
  getPostsByCategory,
} from '@/app/actions/getCategories';
import { CategoryCard } from '@/app/components/CategoryCard/CategoryCard';
import { CategoryRelationsPosts } from '@prisma/client';

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
