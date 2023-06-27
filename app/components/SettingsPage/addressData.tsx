import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { GrDocumentUser } from 'react-icons/gr';
import { SettingsInput } from '../commum/SettingsInput';
import { User } from '@prisma/client';
import { useState } from 'react';
import { SelectState } from '../selects/SelectState';
import { SelectCity } from '../selects/SelectCity';

interface SettingsData {
  themes?: any;
  register: UseFormRegister<FieldValues>;
  user: User | null;
  onSubmit: () => void;
}

export const AddressData: React.FC<SettingsData> = ({
  themes,
  register,
  user,
  onSubmit,
}) => {
  const initialState = {
    username: user?.username ?? '',
    bio: user?.bio ?? '',
    email: user?.email ?? '',
  };

  const [fields, setFields] = useState(initialState);
  const [selectedUf, setSelectedUf] = useState('');

  console.log(selectedUf);

  const handleFieldsChange = (ev: any) =>
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-4 mx-6 mt-3'>
        <SelectState onChange={setSelectedUf} />

        <SelectCity uf={selectedUf} />
      </div>
    </>
  );
};
