import { ChangeEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface SettingsInputProps {
  name: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  required?: boolean;
  icon?: any;
  value?: string;
  onChange?: (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
  id,
  name,
  type = 'text',
  register,
  required,
  placeholder,
  icon,
  value,
  onChange,
}) => {
  return (
    <>
      <h3 className='font-bold text-1xl sm:text-2xl text-violet-500'>{name}</h3>
      <div className='relative'>
        <input
          type={type}
          className={`w-full py-2 border-2 hover:border-slate-900 rounded-xl pl-10`}
          placeholder={placeholder}
          {...register(id, { required })}
          value={value}
          onChange={onChange}
        />
        {icon}
      </div>
    </>
  );
};
