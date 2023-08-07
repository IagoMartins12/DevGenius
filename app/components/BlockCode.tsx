import { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import { IoCheckmarkOutline } from 'react-icons/io5';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface BlockCodeProps {
  code: string;
}
export const BlockCode: React.FC<BlockCodeProps> = ({ code }) => {
  const codeString = `return (
    <div className='bg-gray-500 grid place-items-center h=screen'>
      <SyntaxHighlighter language='javascript' style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}; `;

  const [copy, setCopy] = useState(false);
  return (
    <div className='bg-gray-500'>
      <div className='max-w-2x1 min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
        <div className='flex justify-between px-4 text-white text-xs items-center'>
          <p className='text-sm'> Codigo de exemplo</p>
          {copy ? (
            <button className='py-1 inline-flex items-center gap-1'>
              <span className='text-base mt-1'>
                <IoCheckmarkOutline size={20} color='white' fill='white' />
              </span>
              Copiado
            </button>
          ) : (
            <button
              className='py-1 inline-flex items-center gap-1'
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            >
              <span className='text-base mt-1'>
                <AiOutlineCopy size={20} />
              </span>
              Copiar codigo
            </button>
          )}
        </div>
        <SyntaxHighlighter
          language='javascript'
          style={atomOneDark}
          customStyle={{
            padding: '25px',
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
