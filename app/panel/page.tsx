import { getAllUsers } from '../actions/getUser';
import PanelUsers from '../components/PanelUsers/PanelUsers';

export default async function SearchPage() {
  const allUser = await getAllUsers();
  return (
    <div>
      <PanelUsers allUsers={allUser} />
    </div>
  );
}
