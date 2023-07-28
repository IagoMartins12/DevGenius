import React from 'react';
import { useTheme } from 'next-themes';
import useShareLinks from '@/app/hooks/modals/useShareLinks';
import { Post } from '@prisma/client';
import styles from './style.module.scss';
import { BiCopyAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';

interface ShareLinkProps {
  post: Post | null;
}

export const ShareLink: React.FC<ShareLinkProps> = ({ post }) => {
  const shareLink = useShareLinks();

  const { theme } = useTheme();

  const handleCopyLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    toast.success('Copiado!');
    shareLink.onClose();
  };

  const handleShareLinkedIn = () => {
    const currentURL = window.location.href;
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentURL,
    )}`;
    window.open(linkedInShareURL, '_blank');
    shareLink.onClose();
  };

  const handleShareFacebook = () => {
    const currentURL = window.location.href;
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL,
    )}`;
    window.open(facebookShareURL, '_blank');
    shareLink.onClose();
  };

  return (
    <div
      className={`${shareLink.isOpen ? 'flex' : 'hidden'} ${styles.Container} ${
        theme === 'light' ? 'reactIcons-white' : 'reactIcons-dark'
      } `}
    >
      <div
        className='flex items-center justify-between cursor-pointer  w-7/12 sm:w-full'
        onClick={handleCopyLink}
      >
        <span className='font-semibold text-lg text-center'>Copiar link</span>
        <BiCopyAlt size={22} />
      </div>
      <hr />
      <span
        className='font-medium text-base cursor-pointer w-7/12 sm:w-full mx-auto text-start'
        onClick={handleShareLinkedIn}
      >
        Compartilhar no linkedin
      </span>
      <span
        className='font-medium text-base cursor-pointer w-7/12 sm:w-full mx-auto text-start'
        onClick={handleShareFacebook}
      >
        Compartilhar no Facebook
      </span>
    </div>
  );
};
