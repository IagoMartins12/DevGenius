import { getCategoriesPerId } from '@/app/actions/getCategories';
import { getPostsPerId } from '@/app/actions/getPosts';
import { EditPosts } from '@/app/components/editPosts/EditPosts';
import { CategoryRelationsPosts } from '@prisma/client';

interface Iparams {
  postid: string;
}

export default async function EditPost({ params }: { params: Iparams }) {
  const post = await getPostsPerId(params.postid);
  const postCategories: CategoryRelationsPosts[] | null =
    await getCategoriesPerId(params.postid);

  return <EditPosts post={post} postCategories={postCategories} />;
}
