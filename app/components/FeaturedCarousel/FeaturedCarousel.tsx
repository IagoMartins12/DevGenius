'use client';

import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useRef } from 'react';
import { Card } from './Card';
import { useGlobalContext } from '@/app/context/store';

export const FeaturedCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { postsState } = useGlobalContext();
  const featuredPosts = postsState.filter(post => post.featured !== 0);
  console.log(postsState);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth / 1.03;
      const scrollLeftPos = carouselRef.current.scrollLeft;
      let currentTime = 0;

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const animateScroll = (timestamp: number) => {
        if (!currentTime) currentTime = timestamp;
        const progress = timestamp - currentTime;
        const scroll =
          Math.max(0, easeInOutQuad(Math.min(progress / 500, 1))) *
          scrollAmount;
        carouselRef.current!.scrollLeft = scrollLeftPos - scroll;

        if (progress < 500) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth / 1.03;
      const scrollLeftPos = carouselRef.current.scrollLeft;
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      let currentTime = 0;

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const animateScroll = (timestamp: number) => {
        if (!currentTime) currentTime = timestamp;
        const progress = timestamp - currentTime;
        const scroll =
          Math.max(0, easeInOutQuad(Math.min(progress / 500, 1))) *
          scrollAmount;
        carouselRef.current!.scrollLeft = Math.min(
          scrollLeftPos + scroll,
          maxScrollLeft,
        );

        if (progress < 500) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className='relative carousel-height'>
      <div className='absolute right-0 bottom-0 z-30 '>
        <button onClick={scrollLeft} className='p-2 m-2 rounded-full'>
          <FiChevronLeft size={25} color='white' />
        </button>
        <button onClick={scrollRight} className='p-2 m-2 rounded-full'>
          <FiChevronRight size={25} color='white' />
        </button>
      </div>
      <div
        id='content'
        className='carousel flex items-center justify-start overflow-x-hidden h-full '
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
        ref={carouselRef}
      >
        {featuredPosts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
