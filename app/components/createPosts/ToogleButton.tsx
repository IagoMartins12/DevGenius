import { Form } from 'react-bootstrap';

interface ToogleButtonProps {
  isChecked: boolean;
  setIsChecked: (isCheckd: boolean) => void;
  register: any;
  setValue: any;
}
export const ToogleButton: React.FC<ToogleButtonProps> = ({
  isChecked,
  setIsChecked,
  register,
  setValue,
}) => {
  return (
    <Form>
      <Form.Check
        type='switch'
        checked={isChecked}
        id='custom-switch'
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        {...register('featured')}
      />
    </Form>
  );
};
