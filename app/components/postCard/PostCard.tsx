'use client';

import useThemes from '@/app/hooks/useTheme';
import { Post } from '@prisma/client';

interface PostProps {
  posts?: Post | null;
}
export const PostCard: React.FC<PostProps> = ({ posts }) => {
  const theme = useThemes();
  const themes: any = theme.theme;

  const post = [
    {
      post_id: 1,
      post_title: 'useQuerys no react',
      post_Category: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'node',
        },
      ],
      post_data: 'August 20, 2022',
      post_author: 'Iago martins',
    },
    {
      post_id: 2,
      post_title: 'useQuerys no react',
      post_Category: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'node',
        },
      ],
      post_data: 'August 20, 2022',
      post_author: 'Iago martins',
    },
    {
      post_id: 3,
      post_title: 'useQuerys no react',
      post_Category: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'node',
        },
      ],
      post_data: 'August 20, name',
      post_author: 'Iago martins',
    },
    {
      post_id: 3,
      post_title: 'useQuerys no react',
      post_Category: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'node',
        },
      ],
      post_data: 'August 20, 2022',
      post_author: 'Iago martins',
    },
    {
      post_id: 3,
      post_title: 'useQuerys no react',
      post_Category: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'node',
        },
      ],
      post_data: 'August 20, 2022',
      post_author: 'Iago martins',
    },
  ];

  return (
    <div
      className={`
      flex 
      flex-col 
      px-10 
      lg:px-32
      pt-7
      pb-16
      ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
    >
      <div className='pt-1'>
        <h2 className='font-bold'>Posts recentes: </h2>
      </div>
      <div className='flex gap-x-16 gap-y-8 flex-wrap py-4'>
        {post.map(post => (
          <div className='postWidth flex gap-3 flex-col px-3 py-3 border-2 rounded border-slate-400 cursor-pointer'>
            {/* img */}
            <div className='w-full h-56 rounded-md  border-2  border-slate-400'>
              <img
                className='d-block w-100 h-full'
                src='react.jpeg'
                alt='Third slide'
              />
            </div>
            {/* categorys */}
            <div className='flex gap-3 py-2 items-center justify-start max-w-full overflow-hidden'>
              {post.post_Category.map(category => (
                <div className='px-4 py-1 bg-indigo-100 rounded'>
                  <span className='text-indigo-500 font-bold'>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            {/* tittle */}
            <div className='max-w-full pb-1 overflow-hidden font-semibold'>
              <h3>{post.post_title}</h3>
            </div>
            {/* userInfo */}
            <div className='flex items-center pt-12 justify-start mx-6 gap-x-10'>
              <div className='flex items-center gap-2'>
                <div className='rounded'>
                  <img src='google-icon.png' alt='' />
                </div>
                <div className=''>
                  <span>{post.post_author} </span>
                </div>
              </div>
              <div className='rounded w-2/6'>
                <span>{post.post_data}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
