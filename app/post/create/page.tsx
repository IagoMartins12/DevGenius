import getCategories from '@/app/actions/getCategories';
import CreatePost from '@/app/components/createPosts/CreatePosts';
import { Category } from '@prisma/client';

export default async function Create() {
  const categories: Category[] = await getCategories();

  return (
    <>
      <CreatePost categories={categories} />
    </>
  );
}
