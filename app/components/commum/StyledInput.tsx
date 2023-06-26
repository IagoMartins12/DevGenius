import { FieldValues, UseFormRegister } from 'react-hook-form';

interface StyledInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  errors?: any;
  required: boolean;
}
export const StyledInput: React.FC<StyledInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  errors,
  placeholder,
  required,
}) => {
  return (
    <div className='form__group field'>
      <input
        type={type}
        className='form__field'
        placeholder={placeholder}
        {...register(id, { required })}
      />
      <label className='form__label'>{label}</label>
    </div>
  );
};
