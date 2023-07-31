import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Card } from './Card';
import { CategoryRelationsPosts, Post } from '@prisma/client';
import { useRef } from 'react';

export interface CarouselProps {
  posts: Post[];
  categoriesPosts: CategoryRelationsPosts[];
}

export const FeaturedCarrousel: React.FC<CarouselProps> = ({
  posts,
  categoriesPosts,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount =
        window.innerWidth < 680
          ? window.innerWidth / 1.06
          : window.innerWidth / 3;
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
      const scrollAmount =
        window.innerWidth < 680
          ? window.innerWidth / 1.06
          : window.innerWidth / 3;
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
    <div className='relative'>
      <div className='pt-1'>
        <h2 className='font-bold'>Artigos relacionados: </h2>
      </div>
      <div className='absolute right-0 top-0 '>
        <button onClick={scrollLeft} className='p-2 m-2 rounded-full'>
          <FiChevronLeft size={25} />
        </button>
        <button onClick={scrollRight} className='p-2 m-2 rounded-full'>
          <FiChevronRight size={25} />
        </button>
      </div>
      <div
        id='content'
        className='carousel my-4 flex items-center justify-start overflow-x-hidden'
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth', // Add this style for smooth scrolling effect on arrow click
        }}
        ref={carouselRef}
      >
        {posts.map(post => (
          <Card key={post.id} post={post} categoriesPosts={categoriesPosts} />
        ))}
      </div>
    </div>
  );
};
