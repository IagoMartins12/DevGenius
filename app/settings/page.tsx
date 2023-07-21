import { User } from '@prisma/client';
import getCurrentUser from '../actions/getCurrentUser';
import { SettingsForm } from '../components/settingsForm/SettingsForm';

export default async function Settings() {
  const user: User | null = await getCurrentUser();

  if (!user) {
    return <>NÃO AUTORIZADO!</>;
  }

  return (
    <>
      <SettingsForm />
    </>
  );
}
