import getCurrentUser from '../actions/getCurrentUser';
import { SettingsForm } from '../components/SettingsForm/SettingsForm';
import ClientOnly from '../components/ClientOnly';
import NotAuth from '../components/NotAuth';

export default async function Settings() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <NotAuth />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SettingsForm currentUser={currentUser} />
    </ClientOnly>
  );
}
