import { Post } from '@prisma/client';
import React from 'react';

interface relatedPostProps {
  posts: Post[];
}
export const RelatedPosts: React.FC<relatedPostProps> = ({ posts }) => {
  return <div>hello world</div>;
};
