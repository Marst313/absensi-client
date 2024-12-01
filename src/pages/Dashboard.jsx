import { LoadingSkeleton } from '../components';
import useUserStore from '../features/userStore';
import Activity from './Activity';
import GroupsPageUser from './Users/GroupsPageUser';

function Dashboard() {
  const { isLoading, role } = useUserStore((state) => state);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (role === 'DOSEN') {
    return <Activity />;
  }

  return <GroupsPageUser />;
}

export default Dashboard;
