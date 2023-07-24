import { getAllUsers } from '../actions/getUser';
import Example from '../components/PanelUsers/TS';

export default async function SearchPage() {
  const allUser = await getAllUsers();
  return (
    <div>
      <Example allUsers={allUser} />
    </div>
  );
}
