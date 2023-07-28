interface InfoProps {
  title: string;
  info: string | null;
}
export const UserInfoTexts: React.FC<InfoProps> = ({ title, info }) => {
  return (
    <>
      <div className='flex gap-x-3 items-center'>
        <span className='text-xl font-extralight text-violet-600'>{title}</span>
        <span className='text-lg font-semibold'>{info}</span>
      </div>
    </>
  );
};
