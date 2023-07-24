import { getPostCategories } from '@/app/actions/getCategories';
import { getPostBySearch } from '@/app/actions/getPosts';
import { SearchCard } from '@/app/components/SearchCard/SearchCard';
import { CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  searchname: string;
}

export default async function SearchPage({ params }: { params: Iparams }) {
  const { searchname } = params;

  const posts = await getPostBySearch(searchname);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();

  return (
    <div>
      <SearchCard posts={posts} categoriesPost={categoryPosts} />
    </div>
  );
}
