interface InfoProps {
  title: string;
  info: string | null;
}
export const UserInfoTexts: React.FC<InfoProps> = ({ title, info }) => {
  return (
    <>
      <div className='flex gap-x-3 items-center'>
        <span className='text-xl font-extraligh text-violet-600'>{title}</span>
        {info ? (
          <span className='text-lg font-semibold'>{info}</span>
        ) : (
          <span className='text-lg font-semibold'>-</span>
        )}
      </div>
    </>
  );
};
