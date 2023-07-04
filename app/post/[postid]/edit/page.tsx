import getCategories, {
  getCategoriesPerId,
  getPostCategories,
} from '@/app/actions/getCategories';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { getPostsPerId } from '@/app/actions/getPosts';
import { EditPosts } from '@/app/components/editPosts/EditPosts';
import { Category, CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  postid: string;
}

export default async function EditPost({ params }: { params: Iparams }) {
  const post = await getPostsPerId(params.postid);
  const postCategories: CategoryRelationsPosts[] | null =
    await getCategoriesPerId(params.postid);

  const categories: Category[] = await getCategories();

  return (
    <EditPosts
      post={post}
      categories={categories}
      postCategories={postCategories}
    />
  );
}
