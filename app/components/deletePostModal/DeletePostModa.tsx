// import useDeletePostModal from '@/app/hooks/useDeletePostModal';
// import useThemes from '@/app/hooks/useTheme';
// import axios from 'axios';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';

// export const DeletePostModal: React.FC = () => {
//   const deleteModal = useDeletePostModal();
//   const theme = useThemes();
//   const themes: any = theme.theme;
//   const isOpen: boolean = deleteModal.isOpen;
//   const router = useRouter();

//   const deletePost = () => {
//     const postid = deleteModal.currentPost?.id;
//     console.log(postid);
//     axios
//       .delete(`post/${postid}`)
//       .then(() => {
//         toast.success('Post Excluido');
//         deleteModal.onClose();
//         router.push('/');
//       })
//       .catch(error => {
//         console.log(error);
//         toast.error('Algo deu errado! Tente novamente');
//       });
//   };

//   return (
//     <div
//       className={`deleteModalPosition flex-col border-2 z-10 px-5 py-3
//         ${isOpen ? 'flex' : 'hidden'}
//         ${themes === 'light' ? 'bg-color-white' : 'bg-color-dark'}`}
//     >
//       <div className='w-full h-1/2 '>
//         <div className='aspect-video w-full h-32 sm:h-4/5 mt-4 sm:mt-10 relative overflow-hidden rounded-xl m-1'>
//           <Image
//             fill
//             className=' h-1 w-full group-hover:scale-110 transition'
//             src='/thinking.svg'
//             alt='Listing'
//           />
//         </div>
//       </div>
//       <div className='w-full h-1/2 items-center flex justify-center flex-col gap-y-4'>
//         <div className='flex mt-4'>
//           <h3 className='text-2xl font-bold'>Deletar post? </h3>
//         </div>
//         <div className='flex gap-2'>
//           <div>
//             <button
//               style={{
//                 backgroundColor: 'red',
//               }}
//               onClick={() => {
//                 deletePost();
//               }}
//             >
//               Deletar
//             </button>
//           </div>
//           <div>
//             <button
//               onClick={() => {
//                 deleteModal.onClose();
//               }}
//             >
//               Voltar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
