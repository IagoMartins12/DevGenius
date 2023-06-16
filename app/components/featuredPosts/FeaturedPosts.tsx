'use client';

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import {} from '@/public/google-icon.png';
import useThemes from '@/app/hooks/useTheme';

export const FeaturedPosts = (posts: any) => {
  const [index, setIndex] = useState(0);
  const theme = useThemes();
  const themes: any = theme.theme;

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      className={`
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}
      `}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        slide={false}
        variant={themes === 'light' ? '' : 'dark'}
        className=''
      >
        <Carousel.Item>
          <img
            className='d-block w-100 imgCarousel'
            src='react.jpeg'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 imgCarousel'
            src='react.jpeg'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 imgCarousel'
            src='react.jpeg'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
