import { Post } from '@prisma/client';

interface PostProps {
  posts?: Post | null;
}
export const PostCard: React.FC<PostProps> = ({ posts }) => {
  console.log('posts', posts);
  return <div>hello world</div>;
};
