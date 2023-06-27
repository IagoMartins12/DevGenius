import getCurrentUser from '../actions/getCurrentUser';
import SettingsForm from '../components/settingsForm/SettingsForm';
import { SkeletonSettings } from '../components/skeletons/SkeletonSettings/SkeletonSettings';

export default async function Settings() {
  const user: any = await getCurrentUser();

  // return ;
  return (
    <>
      <SettingsForm user={user} />
      <SkeletonSettings />
    </>
  );
}
