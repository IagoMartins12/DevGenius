// 'use client';

// import { RiDislikeLine } from 'react-icons/ri';
// import { FcDislike } from 'react-icons/fc';
// import { Deslike, User } from '@prisma/client';
// import useDesliked from '@/app/hooks/useDesliked';

// interface DeslikedButtonProps {
//   postId: string;
//   currentUser?: User | null;
//   desLiked: Deslike[];
// }

// const DeslikedButton: React.FC<DeslikedButtonProps> = ({
//   postId,
//   currentUser,
//   desLiked,
// }) => {
//   const { toggleFavorite } = useDesliked({
//     postId,
//     currentUser,
//     desLiked,
//   });

//   const userDisliked = desLiked.some(
//     liked => liked.postId === postId && liked.userId === currentUser?.id,
//   );

//   return (
//     <div
//       onClick={e => {
//         toggleFavorite(e);
//       }}
//       className='
//         relative
//         hover:opacity-80
//         transition
//         cursor-pointer
//       '
//     >
//       {userDisliked ? <FcDislike size={28} /> : <RiDislikeLine size={28} />}
//     </div>
//   );
// };

// export default DeslikedButton;
