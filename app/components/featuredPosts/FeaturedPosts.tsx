'use client';

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import useThemes, { Themes } from '@/app/hooks/useTheme';
import { Post } from '@prisma/client';

export const FeaturedPosts = ({ posts }: { posts: Post[] }) => {
  const [index, setIndex] = useState(0);
  const themes: Themes = useThemes().theme;

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const hasFeaturedPost = posts.some((post: Post) => post.featured === 1);

  return (
    <div
      className={`
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
            px-10 lg:px-32 pt-6 pb-4`}
    >
      {hasFeaturedPost ? (
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
