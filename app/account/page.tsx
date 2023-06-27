import Image from 'next/image';
import {
  AiFillEdit,
  AiOutlineCamera,
  AiOutlineEdit,
  AiFillCamera,
  AiFillSetting,
  AiOutlineSetting,
  AiOutlineFlag,
  AiFillFlag,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { GrDocumentUser } from 'react-icons/gr';
import { IoLocationSharp, IoLocationOutline } from 'react-icons/io5';
import { UserInfo } from '../components/AccountPage/UserInfo';
import { UserButtons } from '../components/AccountPage/UserButtons';

export default async function Account() {
  return (
    <>
      <div
        className='flex min-h-full flex-col gap-2'
        style={{
          height: '100vh',
        }}
      >
        <div className='flex justify-start border-2 w-full h-1/3 items-center relative'>
          <div className='w-full h-full absolute -z-10 '>
            <Image
              fill
              className='sm:object-cover rounded-full '
              src='programing.svg'
              alt='Listing'
            />
          </div>
          <div className='w-full mx-auto flex gap-x-8 h-full justify-around'>
            <div className='flex gap-x-8 w-6/12'>
              <div className='flex w-3/12'>
                <div className='flex self-center justify-center rounded-full w-40 h-40'>
                  <div className='relative h-full w-full'>
                    <Image
                      fill
                      className='sm:object-cover rounded-full'
                      src='programing.svg'
                      alt='Listing'
                    />
                  </div>
                </div>
              </div>
              <UserInfo />
            </div>

            <div className='flex flex-col items-center w-2/12 ml-32 p-8 gap-y-4'>
              <UserButtons />
            </div>
          </div>
        </div>
        <div className='flex w-full h-4/6 gap-x-2'>
          <div className='flex w-3/12 border-2'></div>
          <div className='flex w-9/12 border-2'></div>
        </div>
      </div>
    </>
  );
}
