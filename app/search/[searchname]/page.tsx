import { getPostCategories } from '@/app/actions/getCategories';
import { getPostBySearch } from '@/app/actions/getPosts';
import { getAllUsers } from '@/app/actions/getUser';
import { SearchPageComponent } from '@/app/components/SearchPageComponent/SearchPageComponent';
import { CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  searchname: string;
}

export default async function SearchPage({ params }: { params: Iparams }) {
  const { searchname } = params;

  const posts = await getPostBySearch(searchname);
  const categoryPosts: CategoryRelationsPosts[] = await getPostCategories();
  const allUsers = await getAllUsers();

  return (
    <div>
      <SearchPageComponent
        posts={posts}
        categoriesPost={categoryPosts}
        allUsers={allUsers}
      />
    </div>
  );
}
