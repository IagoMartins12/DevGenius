import getCurrentUser from '../actions/getCurrentUser';
import { SettingsForm } from '../components/SettingsForm/SettingsForm';
import ClientOnly from '../components/ClientOnly';
import UserNotAuth from '../components/UserNotAuth';
import { Footer } from '../components/Footer/Footer';

export default async function Settings() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <UserNotAuth />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SettingsForm />
      <Footer />
    </ClientOnly>
  );
}
