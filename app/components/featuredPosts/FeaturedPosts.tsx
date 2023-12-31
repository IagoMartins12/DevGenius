'use client';

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Post } from '@prisma/client';
import { useGlobalContext } from '@/app/context/store';

export const FeaturedPosts = () => {
  const [index, setIndex] = useState(0);

  const { postsState } = useGlobalContext();
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const hasFeaturedPost = postsState.some((post: Post) => post.featured === 1);

  return (
    <div className={`px-0 lg:px-32`}>
      {hasFeaturedPost ? (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          slide={false}
          className=''
        >
          {postsState.map(
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
