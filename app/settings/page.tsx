import getCurrentUser from '../actions/getCurrentUser';
import SettingsForm from '../components/settingsForm/SettingsForm';

export default async function Settings() {
  const user: any = await getCurrentUser();

  return <SettingsForm user={user} />;
}
