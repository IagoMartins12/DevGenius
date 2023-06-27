import { User } from '@prisma/client';
import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { FaGithubAlt } from 'react-icons/fa';
import { RiTwitterFill, RiTwitterLine } from 'react-icons/ri';

interface SettingsData {
  themes?: any;
  register: UseFormRegister<FieldValues>;
  user: User | null;
  onSubmit: () => void;
}

export const SocialNetworkData: React.FC<SettingsData> = ({
  themes,
  register,
  user,
  onSubmit,
}) => {
  const initialState = {
    website: user?.website ?? '',
    github: user?.github ?? '',
    instagram: user?.instagram ?? '',
    facebook: user?.facebook ?? '',
    twitter: user?.twitter ?? '',
    youtube: user?.youtube ?? '',
  };

  const [fields, setFields] = useState(initialState);

  const handleFieldsChange = (ev: any) =>
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });

  return (
    <>
      <div className='flex flex-col gap-y-4 mx-6 mt-3'>
        {/* Name */}
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Website'
              id='website'
              {...register('website')}
              value={fields.website}
              onChange={handleFieldsChange}
            />
            <CgWebsite className='absolute top-3 left-3' size={18} />
          </div>
        </div>

        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Github'
              id='github'
              {...register('github')}
              value={fields.github}
              onChange={handleFieldsChange}
            />
            <FaGithubAlt className='absolute top-3 left-3' size={18} />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Instagram'
              {...register('instagram')}
              id='instagram'
              value={fields.instagram}
              onChange={handleFieldsChange}
            />
            <AiOutlineInstagram className='absolute top-3 left-3' size={18} />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Facebook'
              {...register('facebook')}
              id='facebook'
              value={fields.facebook}
              onChange={handleFieldsChange}
            />
            <AiOutlineFacebook className='absolute top-3 left-3' size={18} />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Twitter'
              {...register('twitter')}
              id='twitter'
              value={fields.twitter}
              onChange={handleFieldsChange}
            />
            <RiTwitterFill className='absolute top-3 left-3' size={18} />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 w-full'>
          <div className='relative'>
            <input
              type='text'
              className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
              placeholder='Youtube'
              {...register('youtube')}
              id='youtube'
              value={fields.youtube}
              onChange={handleFieldsChange}
            />
            <AiOutlineYoutube className='absolute top-3 left-3' size={18} />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mx-6 my-6 justify-center items-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-10/12 sm:w-4/12'
          onClick={onSubmit}
        >
          Editar informações
        </button>
      </div>
    </>
  );
};
