import { Loading } from '../components';
import useUserStore from '../features/userStore';

function Dashboard() {
  const { isLoading } = useUserStore((state) => state);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Dashboard </h1>
    </div>
  );
}

export default Dashboard;
