import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../features/userStore';

function ProtectedRoutes({ children }) {
  const { role } = useUserStore((state) => state);

  if (role === 'MHS') {
    return <Navigate to="/" />;
  }

  return children;
}
export default ProtectedRoutes;
