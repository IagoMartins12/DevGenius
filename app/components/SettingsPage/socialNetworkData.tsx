import { User } from '@prisma/client';
import { ChangeEvent, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { CgWebsite } from 'react-icons/cg';
import {
  GrFacebook,
  GrGithub,
  GrInstagram,
  GrTwitter,
  GrYoutube,
} from 'react-icons/gr';

interface SettingsData {
  register: UseFormRegister<FieldValues>;
  user: User | null;
  onSubmit: () => void;
}

export const SocialNetworkData: React.FC<SettingsData> = ({
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

  const handleFieldsChange = (ev: ChangeEvent<HTMLInputElement>) =>
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
            <GrGithub className='absolute top-3 left-3' size={18} />
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
            <GrInstagram className='absolute top-3 left-3' size={18} />
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
            <GrFacebook className='absolute top-3 left-3' size={18} />
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
            <GrTwitter className='absolute top-3 left-3' size={18} />
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
            <GrYoutube className='absolute top-3 left-3' size={18} />
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
