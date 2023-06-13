'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      style={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PuffLoader size={100} color='red' />
    </div>
  );
};

export default Loader;
