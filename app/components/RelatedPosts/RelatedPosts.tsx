'use client';

import useThemes, { Themes } from '@/app/hooks/useTheme';
import { Category, CategoryRelationsPosts, Post, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

export const RelatedPosts = ({
  posts,
  categoriesPost,
  categories,
  currentUser,
}: {
  posts: Post[];
  categoriesPost: CategoryRelationsPosts[];
  categories: Category[];
  currentUser: User | null;
}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const themes: Themes = useThemes().theme;
  const router = useRouter();

  const navigate = (postId: string) => {
    router.push(`post/${postId}`);
  };

  return (
    <div
      className={`
      flex 
      flex-col 
      w-11/12
      mx-auto
      pt-8
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
    >
      <div className='pt-1'>
        <h2 className='font-bold'>Artigos relacionados: </h2>
      </div>
      {posts.length > 0 ? (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          slide={false}
          variant={themes === 'light' ? '' : 'dark'}
          className=''
        >
          {posts.map(
            (post: Post) =>
              post.featured === 1 && (
                <Carousel.Item key={post.id}>
                  <img
                    className='d-block w-100 imgCarousel'
                    src={post.photo_background}
                    alt='Post background'
                  />
                  <Carousel.Caption>
                    <h3>{post.title}</h3>
                    <p>{post.resume}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ),
          )}
        </Carousel>
      ) : (
        <h1 className='text-center'>No featured posts available.</h1>
      )}
    </div>
  );
};
