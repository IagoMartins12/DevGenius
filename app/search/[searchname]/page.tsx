import { getFavoritedPosts } from '@/app/actions/getActionsOnPosts';
import getCategories, { getPostCategories } from '@/app/actions/getCategories';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostBySearch } from '@/app/actions/getPosts';
import { SearchCard } from '@/app/components/SearchCard/SearchCard';
import {
  Category,
  CategoryRelationsPosts,
  Favorite,
  User,
} from '@prisma/client';

interface Iparams {
  searchname: string;
}

export default async function SearchPage({ params }: { params: Iparams }) {
  const { searchname } = params;

  const posts = await getPostBySearch(searchname);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const categories: Category[] = await getCategories();
  const favorites: Favorite[] = await getFavoritedPosts();
  const currentUser: User | null = await getCurrentUser();

  return (
    <div>
      <SearchCard
        categories={categories}
        posts={posts}
        categoriesPost={categoryPosts}
        currentUser={currentUser}
        favorites={favorites}
      />
    </div>
  );
}
